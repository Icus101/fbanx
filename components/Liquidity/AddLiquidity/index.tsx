import React, { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { utils } from "@project-serum/anchor";
import { BiCaretDown } from "react-icons/bi";
import { useProgram } from "../../../hooks/useProgram";
import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import * as tk from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import { token_pool_mint, token_pool_mint_ata, } from '../../../utils/constant';
import { useWallet } from "@solana/wallet-adapter-react"

import Image from "next/image";
import { tokens } from "./const";

import { createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress, getMint, mintTo, TOKEN_PROGRAM_ID } from "@solana/spl-token";
const TRADING_FEE_NUMERATOR = 25;
const TRADING_FEE_DENOMINATOR = 10000;

import { Switch } from "@headlessui/react";
import RemoveLiquidity from "../RemoveLiquidity/RemoveLiquidity";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import Token2 from "../../Token2";

const mint2Keypair = Keypair.fromSecretKey(
  bs58.decode(
    "F4F4BKBQYd4NYQijZPRocMySdC2dF7BF2cdgFNN7rnJiiCsEFWESEyLtHwjF58dBK4iZr3HgS3KczwQZXi88Jwt"
  )
)

const mint1Keypair = Keypair.fromSecretKey(
  bs58.decode(
    "5XehqoyEdqRYe6KU9qQrZ5ZNBB2RUjV31AsYaRPQaS5PmcNGtvyVrjwZtgUyWSmcbWub5BcAH5TSYkxM7tF4bueE"
  )
)

interface TokenProps {
  id: number;
  tokenName: string;
  icon?: any;
  name: string;
  tokenAddress: PublicKey;
}

const Liquidity = () => {
  const transaction = new anchor.web3.Transaction()
  const { program, wallet, connection } = useProgram();

  const [removeLiquidity, setRemoveLiquidity] = useState(false);

  // Selected pair state
  const [selectedTokens, setSelectedTokens] = useState(tokens[0]);

  // Selected pair subToken state (It's going to have three arrays)
  const [selectedSubTokens, setSelectedSubTokens] = useState(
    selectedTokens?.subToken
  );
  // Handle selected subtoken object
  const [token, setToken] = useState<TokenProps>(selectedSubTokens[0]);
  // Handles radio selection
  const [selectedRadio, setSelectedRadio] = useState(
    selectedSubTokens[0]?.tokenName
  );

  const [token2If, setToken2If] = useState(false);

  const showToken2If = () => {
    setToken2If(!token2If)
  }
  const { sendTransaction } = useWallet()

  const [mint0, setMint0] = useState<PublicKey>(selectedSubTokens[1].tokenAddress);
  const [mint1, setMint1] = useState<PublicKey>(selectedSubTokens[2].tokenAddress);
  const [userAmount, setUserAmount] = useState(0);

  const [estTokenBAmount, setEstTokenBAmount] = useState<number>(0)

  const handleValue = (e: React.FormEvent) => {
    setUserAmount(Number((e.target as HTMLInputElement).value));
  };

  const handleTokenName = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    id: number
  ) => {
    if (e) {
      setSelectedRadio((e?.target as HTMLInputElement).value!);
    }
    if (id == selectedSubTokens[0].id) {
      setToken2If(true)
    } else {
      setToken2If(false)
    }
    let newToken = [...selectedSubTokens];
    let token = newToken.find((token) => token.id === id) as TokenProps;

    setToken(token);
  };



  const handlePairChange = (value: any) => {
    setSelectedTokens(value);
    setSelectedSubTokens(value.subToken);
    setMint0(value.subToken[1].tokenAddress)
    setMint1(value.subToken[2].tokenAddress)
    setUserAmount(0)
    setEstTokenBAmount(0)
    console.log(selectedTokens);
    

  };

  const getAmm = async () => {
    if (!program) {
      return
    }
    const [amm, _ammBump] = await PublicKey.findProgramAddress(
      [Buffer.from("amm"), mint0.toBuffer(), mint1.toBuffer()],
      program.programId
    );
    return amm
  }

  const getAuth = async () => {
    if (!program) {
      return
    }
    let amm = await getAmm()
    const [authority, _bumpSeed] = await PublicKey.findProgramAddress(
      [amm!.toBuffer()],
      program.programId
    );
    return authority
  }

  const getSupply = async () => {
    const poolMintInfo = await getMint(connection, token_pool_mint);
    const supply = Number(poolMintInfo.supply);
    return supply
  }



  const getVault0 = async () => {
    try {
      let poolAuthority = await getAuth()
      let vault0 = await getAssociatedTokenAddress(mint0, poolAuthority!, true);
      return vault0

    } catch (error) {
      return
    }
  }

  const getVault1 = async () => {
    try {
      let poolAuthority = await getAuth()
      let vault1 = await getAssociatedTokenAddress(mint1, poolAuthority!, true);
      return vault1

    } catch (error) {
      return
    }

  }

  const calculatePoolTokenAmountfromSourceToken = async () => {
    try {
      let supply = await getSupply()
      let vault0 = await getVault0()
      const swapTokenA = await getAccount(connection, vault0!);
      let poolTokenAmount =
        (userAmount * supply) / (Number(swapTokenA.amount))
      return poolTokenAmount

    } catch (error) {
      return
    }

  }


  const tokenBPrice = async () => {
    try {
      let supply = await getSupply()
      let vault1 = await getVault1()
      let poolTokenAmount = await calculatePoolTokenAmountfromSourceToken()
      const swapTokenB = await getAccount(connection, vault1!);
      let estTokenBAmount = Math.ceil(
        ((Number(swapTokenB.amount) * poolTokenAmount!) / supply)
      );
      setEstTokenBAmount(estTokenBAmount)

    } catch (error) {
      return
    }

  }

  useEffect(() => {
    tokenBPrice()
  }, [userAmount])

  useEffect(() => {
    handleTokenName(null, selectedSubTokens[0].id);
    setSelectedRadio(selectedSubTokens[0].tokenName);
  }, [selectedSubTokens]);

  const depositSingleB = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("deposited B");
    if (!wallet) {
      return;
    }
    if (!program) {
      return;
    }

    const [amm, _ammBump] = await PublicKey.findProgramAddress(
      [Buffer.from("amm"), mint0.toBuffer(), mint1.toBuffer()],
      program.programId
    );
    console.log('amm :', amm.toBase58())

    const [poolAuthority, _bump] = await PublicKey.findProgramAddress(
      [amm.toBuffer()],
      program.programId
    );
    console.log('pool :', poolAuthority.toBase58())


    let vault0 = await getAssociatedTokenAddress(mint0, poolAuthority, true);
    console.log('vault0 :', vault0.toBase58())
    let vault1 = await getAssociatedTokenAddress(mint1, poolAuthority, true);
    console.log('vault1 :', vault1.toBase58())


    let sourceTokenAddress = await tk.getAssociatedTokenAddress(
      mint1,
      wallet.publicKey
    );
    let sourceAccount = await connection.getAccountInfo(sourceTokenAddress);

    if (sourceAccount == null) {
      const createATAIX1 =
        await createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          sourceTokenAddress, // ata
          wallet.publicKey, // owner
          mint1 // mint
        )
      transaction.add(createATAIX1)
      let txid = await sendTransaction(transaction, connection)
      console.log('txid', txid);
    }


    let liqTokenAddress = await getAssociatedTokenAddress(
      token_pool_mint, // mint
      wallet.publicKey, // owner
    );
    let account = await connection.getAccountInfo(liqTokenAddress);
    if (account == null) {
      const createATAIX =
        await createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          liqTokenAddress, // ata
          wallet.publicKey, // owner
          token_pool_mint // mint
        )
      transaction.add(createATAIX)
      let txid = await sendTransaction(transaction, connection)
      console.log('txid1', txid);
    }

    const tradingTokensToPoolTokens = (
      sourceAmount: number,
      swapSourceAmount: number,
      poolAmount: number
    ): number => {
      const tradingFee =
        (sourceAmount / 2) * (TRADING_FEE_NUMERATOR / TRADING_FEE_DENOMINATOR);
      const sourceAmountPostFee = sourceAmount - tradingFee;
      const root = Math.sqrt(sourceAmountPostFee / swapSourceAmount + 1);
      return Math.floor(poolAmount * (root - 1));
    };

    const poolMintInfo = await getMint(connection, token_pool_mint);
    const supply = Number(poolMintInfo.supply);

    const swapTokenB = await getAccount(connection, vault1);

    const poolTokenBAmount = Math.floor(tradingTokensToPoolTokens(
      userAmount,
      Number(swapTokenB.amount),
      supply
    ));
    console.log(poolTokenBAmount);


    // Depositing token B into swap
    let tx = await program.rpc.depositSingle(
      new anchor.BN(userAmount),
      new anchor.BN(poolTokenBAmount),
      {
        accounts: {
          amm: amm,
          authority: poolAuthority,
          owner: wallet.publicKey,
          source: sourceTokenAddress,
          swapTokenA: vault0,
          swapTokenB: vault1,
          poolMint: token_pool_mint,
          destination: liqTokenAddress,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId
        },
      }
    );
    console.log(tx)
  };

  const depositSingleA = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("deposited A");

    if (!wallet) {
      return;
    }
    if (!program) {
      return;
    }

    const [amm, ammBump] = await PublicKey.findProgramAddress(
      [Buffer.from("amm"), mint0.toBuffer(), mint1.toBuffer()],
      program.programId
    );

    const [poolAuthority, bump] = await PublicKey.findProgramAddress(
      [amm.toBuffer()],
      program.programId
    );

    let vault0 = await getAssociatedTokenAddress(mint0, poolAuthority, true);
    let vault1 = await getAssociatedTokenAddress(mint1, poolAuthority, true);

    let sourceTokenAddress = await tk.getAssociatedTokenAddress(
      mint0,
      wallet.publicKey
    );
    let sourceAccount = await connection.getAccountInfo(sourceTokenAddress);

    if (sourceAccount == null) {
      const createATAIX1 =
        await createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          sourceTokenAddress, // ata
          wallet.publicKey, // owner
          mint0 // mint
        )
      transaction.add(createATAIX1)
      let txid = await sendTransaction(transaction, connection)
      console.log('txid', txid);
    }

    let txMint = await mintTo(
      connection,
      mint1Keypair,
      mint0,
      sourceTokenAddress,
      mint1Keypair,
      10000000000
    )

    console.log('mint txn:',txMint);
    


    let liqTokenAddress = await getAssociatedTokenAddress(
      token_pool_mint, // mint
      wallet.publicKey, // owner
    );

    let account = await connection.getAccountInfo(liqTokenAddress);
    if (account == null) {
      const createATAIX =
        await createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          liqTokenAddress, // ata
          wallet.publicKey, // owner
          token_pool_mint // mint
        )
      transaction.add(createATAIX)
      let txid = await sendTransaction(transaction, connection)
      console.log('txid1', txid);
    }

    // Pool token amount to deposit on one side

    const tradingTokensToPoolTokens = (
      sourceAmount: number,
      swapSourceAmount: number,
      poolAmount: number
    ): number => {
      const tradingFee =
        (sourceAmount / 2) * (TRADING_FEE_NUMERATOR / TRADING_FEE_DENOMINATOR);
      const sourceAmountPostFee = sourceAmount - tradingFee;
      const root = Math.sqrt(sourceAmountPostFee / swapSourceAmount + 1);
      return Math.floor(poolAmount * (root - 1));
    };

    const poolMintInfo = await getMint(connection, token_pool_mint);
    const supply = Number(poolMintInfo.supply);
    const swapTokenA = await getAccount(connection, vault0);
    const poolTokenAAmount = Math.floor(tradingTokensToPoolTokens(
      userAmount,
      Number(swapTokenA.amount),
      supply
    ));
    console.log(poolTokenAAmount);

    let tx = await program.rpc.depositSingle(
      new anchor.BN(userAmount),
      new anchor.BN(poolTokenAAmount),
      {
        accounts: {
          amm: amm,
          authority: poolAuthority,
          owner: wallet.publicKey,
          source: sourceTokenAddress,
          swapTokenA: vault0,
          swapTokenB: vault1,
          poolMint: token_pool_mint,
          destination: liqTokenAddress,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId
        },
      }


    );
    console.log(tx);
  };

  const depositAll = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("deposited All");

    if (!wallet) {
      return;
    }
    if (!program) {
      return;
    }

    let amm = await getAmm();
    let poolAuthority = await getAuth();
    let vault0 = await getVault0();
    let vault1 = await getVault1();

    let sourceTokenAddress = await tk.getAssociatedTokenAddress(
      mint0,
      wallet.publicKey
    );

    let destTokenAddress = await tk.getAssociatedTokenAddress(
      mint1,
      wallet.publicKey
    );

    let liqTokenAddress = await getAssociatedTokenAddress(
      token_pool_mint, // mint
      wallet.publicKey, // owner
    );

    let account = await connection.getAccountInfo(liqTokenAddress);
    if (account == null) {
      const createATAIX =
        await createAssociatedTokenAccountInstruction(
          wallet.publicKey, // payer
          liqTokenAddress, // ata
          wallet.publicKey, // owner
          token_pool_mint // mint
        )
      transaction.add(createATAIX)
      let txid = await sendTransaction(transaction, connection)
      console.log('txid', txid);
    }

    const poolMintInfo = await getMint(connection, token_pool_mint);
    const supply = await getSupply();
    console.log(supply);
    let poolTokenAmount = await calculatePoolTokenAmountfromSourceToken()
    console.log('pool token amount: ', poolTokenAmount);

    const swapTokenA = await getAccount(connection, vault0!);
    console.log('swap token a : ', swapTokenA.amount);
    let userTokenAAmount = Math.ceil(
      ((Number(swapTokenA.amount) * poolTokenAmount!) / supply)
    );
    console.log(userTokenAAmount);
    const swapTokenB = await getAccount(connection, vault1!);
    console.log('swap token b : ', swapTokenB.amount);
    let userTokenBAmount = Math.ceil(
      ((Number(swapTokenB.amount) * poolTokenAmount!) / supply)
    );
    console.log(userTokenBAmount)

    // let tokenAAmount = await getTokenAAmount()

    let tx = await program.rpc.depositAll(
      new anchor.BN(poolTokenAmount!),
      new anchor.BN(userTokenAAmount),
      new anchor.BN(userTokenBAmount),
      {
        accounts: {
          amm: amm!,
          poolAuthority: poolAuthority!,
          sourceAInfo: sourceTokenAddress, //user Token account A
          sourceBInfo: destTokenAddress, //user Token account B
          vaultTokenA: vault0!,
          vaultTokenB: vault1!,
          poolMint: token_pool_mint,
          destination: liqTokenAddress,
          owner: wallet.publicKey,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId
        },
      }
    );

    console.log(tx);

  };



  return (
    <div className=" text-[12px] inset-  overflow-hidden text-base md:mt-10 px-2 md:px-0">
      <div className="min-h-full flex justify-center items-center max-w-md mx-auto relative">
        <div
          style={{
            background:
              "linear-gradient(107.53deg,#02f1ff -7.25%,#4839ff 46.29%,#e902b6 108.39%)",
          }}
          className="w-full rounded-3xl pt-[2.3px] p-[2px]"
        >
          <div
            style={{
              background:
                "linear-gradient(140.14deg, rgba(0, 182, 191, 0.15) 0%, rgba(27, 22, 89, 0.1) 86.61%), linear-gradient(321.82deg, #18134D 0%, #1B1659 100%",
            }}
            className="h-full rounded-3xl p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold mb-4">
                {removeLiquidity ? "Remove Liquidity" : "Add Liquidity"}
              </div>

              <div>
                <Switch
                  checked={removeLiquidity}
                  onChange={setRemoveLiquidity}
                  className={`${removeLiquidity ? "bg-[#126499]" : "bg-[#126499]"
                    }
                relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${removeLiquidity ? "translate-x-9" : "translate-x-0"
                      }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
            {!removeLiquidity ? (
              <form
                onSubmit={
                  token.id === 0
                    ? depositAll
                    : token.id === 1
                      ? depositSingleA
                      : depositSingleB
                }
              >
                {/* From */}
                <div className="bg-[#141041] relative p-2 w-full rounded-2xl">
                  <div className="flex relative w-full justify-between">
                    <div className="w-full">
                      <div className="mb-2">
                        <Listbox
                          value={selectedTokens}
                          onChange={handlePairChange}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative border border-[rgb(29,234,183,0.14)] p-1 w-full cursor-default rounded-lg py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="truncate flex items-center justify-between">
                                {selectedTokens.name} <BiCaretDown />
                              </span>
                            </Listbox.Button>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute bg-[#126499] z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-md text-white py-1 text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm">
                                {tokens.map((token, id) => (
                                  <Listbox.Option
                                    key={id}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 flex text-left pl-4 ${active ? "" : ""
                                      }`
                                    }
                                    value={token}
                                  // onClick={handleSubToken}
                                  >
                                    <div>{token.name}</div>
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>
                  </div>
                  <div>
                    {selectedTokens.subToken.map((item) => (
                      <div
                        key={item.id}
                        onChange={() =>
                          handleTokenName(window.event as any, item.id)
                        }
                      >
                        <input
                          type="radio"
                          onChange={() =>
                            handleTokenName(window.event as any, item.id)
                          }
                          value={item.tokenName}
                          name={item.name}
                          id={item.id.toString()}
                          checked={item.tokenName === selectedRadio}
                          required
                        />{" "}
                        <label htmlFor={item.id.toString()}>
                          Add {item.tokenName}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between opacity-60 mb-2">
                      <p>Amount</p>
                      <p className="text-sm md:text-base">
                        Available <b>0</b> {token.tokenName}
                      </p>
                    </div>

                    <div>
                      <div className="w-full flex mb-2">
                        <input
                          type="number"
                          placeholder="1000"
                          className="bg-transparent border-[rgb(29,234,183,0.14)] rounded-md border outline-none w-3/5 md:w-2/3 p-2"
                          value={userAmount}
                          onChange={handleValue}
                          required
                        />

                        <div className="border rounded-md border-[rgb(29,234,183,0.14)] px-1 w-2/5 md:w-1/3 flex gap-2 items-center justify-center text-sm md:text-base">
                          {token.icon && (<Image
                            src={token?.icon}
                            alt="token"
                            height={30}
                            width={30}
                          />)}

                          {token.tokenName}
                        </div>
                      </div>
                      {<Token2 tokenValue={estTokenBAmount} showState={token2If} showToken2={showToken2If} />}

                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-[#512DA8] px-3 py-1 rounded hover:bg-opacity-80"
                        >
                          MAX
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex justify-center bg-[#512DA8] w-full mt-6 py-3 font-bold rounded-[20px] hover:bg-opacity-80"
                >
                  Add Liquidity
                </button>
              </form>
            ) : (
              <RemoveLiquidity />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;