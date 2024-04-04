import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiCaretDown } from "react-icons/bi";
import Image from "next/image";
import * as anchor from "@project-serum/anchor";
import { utils, web3 } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  getMint,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "../../../hooks/useProgram";
import * as tk from "@solana/spl-token";
import { tokens } from "./const";
import { token_pool_mint, token_pool_mint_ata, } from "../../../utils/constant";
const utf8 = utils.bytes.utf8;

const OWNER_WITHDRAW_FEE_NUMERATOR = 1;
const OWNER_WITHDRAW_FEE_DENOMINATOR = 6;
const TRADING_FEE_NUMERATOR = 25;
const TRADING_FEE_DENOMINATOR = 10000;

interface TokenProps {
  id: number;
  tokenName: string;
  icon?: any;
  name: string;
  tokenAddress: PublicKey;
}

const RemoveLiquidity = () => {
  const [selectedTokens, setSelectedTokens] = useState(tokens[0]);
  const [selectedSubTokens, setSelectedSubTokens] = useState(
    selectedTokens.subToken
  );
  const [selectedRadio, setSelectedRadio] = useState(
    selectedSubTokens[0].tokenName
  );

  const [token, setToken] = useState(selectedSubTokens[0]);
  const { program, wallet, connection } = useProgram();
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
      setSelectedRadio((e.target as HTMLInputElement).value);
    }

    let newToken = [...selectedSubTokens];
    let token = newToken.find((token) => token.id === id) as TokenProps;
    setToken(token);
  };

  // console.log("outside", selectedSubTokens);

  const handlePairChange = (value: any) => {
    setSelectedTokens(value);
    setSelectedSubTokens(value.subToken);
    setMint0(value.subToken[1].tokenAddress)
    setMint1(value.subToken[2].tokenAddress)
    setUserAmount(0)
    setEstTokenBAmount(0)
  };

  useEffect(() => {
    handleTokenName(null, 0);
    setSelectedRadio(selectedTokens.subToken[0].tokenName);
  }, [selectedTokens]);

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
      let feeAmount = Math.floor(
        (userAmount * OWNER_WITHDRAW_FEE_NUMERATOR) /
        OWNER_WITHDRAW_FEE_DENOMINATOR
      );
      let poolTokenAmountWithoutFees = await calculatePoolTokenAmountfromSourceToken()
      const poolTokenAmount = poolTokenAmountWithoutFees! - feeAmount;
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

  //withdraw A

  const withdrawA = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Remove A")

    if (!wallet) {
      return;
    }
    if (!program) {
      return;
    }

    console.log(mint0.toBase58());
    console.log(mint1.toBase58());


    const [amm, ammBump] = await PublicKey.findProgramAddress(
      [Buffer.from("amm"), mint0.toBuffer(), mint1.toBuffer()],
      program.programId
    );
    console.log('amm', amm.toBase58());

    const [poolAuthority, bump] = await PublicKey.findProgramAddress(
      [amm.toBuffer()],
      program.programId
    );
    console.log('auth', poolAuthority.toBase58());


    let vault0 = await getAssociatedTokenAddress(mint0, poolAuthority, true);
    let vault1 = await getAssociatedTokenAddress(mint1, poolAuthority, true);

    let tokenPool = await getMint(
      connection,
      token_pool_mint,
    );


    // let sourceTokenAddress = await tk.getAssociatedTokenAddress(
    //   mint0,
    //   wallet.publicKey
    // );
    let destTokenAddress = await tk.getAssociatedTokenAddress(
      mint0,
      wallet.publicKey
    );
    let sourcePoolTokenAddress = await tk.getAssociatedTokenAddress(
      tokenPool.address,
      wallet.publicKey
    );
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

    // Pool token amount to withdraw on one side
    // const withdrawAmount = 50000;
    const roundingAmount = 1.0001; // make math a little easier

    const poolMintInfo = await getMint(connection, tokenPool.address);
    const supply = Number(poolMintInfo.supply);
    const swapTokenA = await getAccount(connection, vault0);
    const swapTokenAPost = Number(swapTokenA.amount) - userAmount;
    const poolTokenA = tradingTokensToPoolTokens(
      userAmount,
      swapTokenAPost,
      supply
    );

    let adjustedPoolTokenA = poolTokenA * roundingAmount;

    adjustedPoolTokenA *=
      1 + OWNER_WITHDRAW_FEE_NUMERATOR / OWNER_WITHDRAW_FEE_DENOMINATOR;

    console.log(adjustedPoolTokenA);


    // const swapTokenB = await getAccount(connection, vault1);
    // const swapTokenBPost = Number(swapTokenB.amount) - withdrawAmount;
    // const poolTokenB = tradingTokensToPoolTokens(
    //   withdrawAmount,
    //   swapTokenBPost,
    //   supply
    // );

    // let adjustedPoolTokenB = poolTokenB * roundingAmount;

    // adjustedPoolTokenB *=
    //   1 + OWNER_WITHDRAW_FEE_NUMERATOR / OWNER_WITHDRAW_FEE_DENOMINATOR;

    let tx = await program.rpc.withdrawSingle(
      new anchor.BN(userAmount),
      new anchor.BN(adjustedPoolTokenA),
      {
        accounts: {
          amm: amm,
          authority: poolAuthority,
          owner: wallet.publicKey,
          source: sourcePoolTokenAddress,
          swapTokenA: vault0, //vault address 1
          swapTokenB: vault1, //vault address 2
          poolMint: tokenPool.address,
          destination: destTokenAddress,
          feeAccount: token_pool_mint_ata,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      });

    console.log(tx);

  };

  //withdraw

  const withdrawB = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Remove B")

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

    let tokenPool = await getMint(
      connection,
      token_pool_mint,
    );



    // let sourceTokenAddress = await tk.getAssociatedTokenAddress(
    //   mint0,
    //   wallet.publicKey
    // );
    let destTokenAddress = await tk.getAssociatedTokenAddress(
      mint1,
      wallet.publicKey
    );
    let sourcePoolTokenAddress = await tk.getAssociatedTokenAddress(
      tokenPool.address,
      wallet.publicKey
    );

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

    // Pool token amount to withdraw on one side
    const withdrawAmount = 50000;
    const roundingAmount = 1.0001; // make math a little easier

    const poolMintInfo = await getMint(connection, tokenPool.address);
    const supply = Number(poolMintInfo.supply);
    // const swapTokenA = await getAccount(connection, vault0);
    // const swapTokenAPost = Number(swapTokenA.amount) - withdrawAmount;
    // const poolTokenA = tradingTokensToPoolTokens(
    //   withdrawAmount,
    //   swapTokenAPost,
    //   supply
    // );

    // let adjustedPoolTokenA = poolTokenA * roundingAmount;

    // adjustedPoolTokenA *=
    //   1 + OWNER_WITHDRAW_FEE_NUMERATOR / OWNER_WITHDRAW_FEE_DENOMINATOR;

    const swapTokenB = await getAccount(connection, vault1);
    const swapTokenBPost = Number(swapTokenB.amount) - userAmount;
    const poolTokenB = tradingTokensToPoolTokens(
      userAmount,
      swapTokenBPost,
      supply
    );

    let adjustedPoolTokenB = poolTokenB * roundingAmount;

    adjustedPoolTokenB *=
      1 + OWNER_WITHDRAW_FEE_NUMERATOR / OWNER_WITHDRAW_FEE_DENOMINATOR;

    console.log(adjustedPoolTokenB);

    let tx = await program.rpc.withdrawSingle(
      new anchor.BN(userAmount),
      new anchor.BN(adjustedPoolTokenB),
      {
        accounts: {
          amm: amm,
          authority: poolAuthority,
          owner: wallet.publicKey,
          source: sourcePoolTokenAddress,
          swapTokenA: vault0, //vault address 1
          swapTokenB: vault1, //vault address 2
          poolMint: tokenPool.address,
          destination: destTokenAddress,
          feeAccount: token_pool_mint_ata,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
      }
    );
    console.log(tx);

  };

  // withdraw all sc
  const withdrawAll = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Remove All")

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
    const [poolAuthority, _bump] = await PublicKey.findProgramAddress(
      [amm.toBuffer()],
      program.programId
    );
    let vault0 = await getAssociatedTokenAddress(mint0, poolAuthority, true);
    let vault1 = await getAssociatedTokenAddress(mint1, poolAuthority, true);

    let tokenPool = await getMint(
      connection,
      token_pool_mint,
    );

    let sourceTokenAddress = await tk.getAssociatedTokenAddress(
      mint0,
      wallet.publicKey
    );
    let destTokenAddress = await tk.getAssociatedTokenAddress(
      mint1,
      wallet.publicKey
    );

    let sourcePoolTokenAddress = await tk.getAssociatedTokenAddress(
      tokenPool.address,
      wallet.publicKey
    );

    const poolMintInfo = await getMint(connection, tokenPool.address);
    const supply = Number(poolMintInfo.supply);

    const swapTokenA = await getAccount(connection, vault0);
    const swapTokenB = await getAccount(connection, vault1);
    let feeAmount = 0;
    // const POOL_TOKEN_AMOUNT = 10000;

    let poolTokenAmountWithoutFees = await calculatePoolTokenAmountfromSourceToken()
    console.log('pool token amount: ', poolTokenAmountWithoutFees);



    feeAmount = Math.floor(
      (userAmount * OWNER_WITHDRAW_FEE_NUMERATOR) /
      OWNER_WITHDRAW_FEE_DENOMINATOR
    );

    const poolTokenAmount = poolTokenAmountWithoutFees! - feeAmount;


    const tokenAAmount = Math.floor(
      (Number(swapTokenA.amount) * poolTokenAmount) / supply
    );

    const tokenBAmount = Math.floor(
      (Number(swapTokenB.amount) * poolTokenAmount) / supply
    );
    console.log('A', tokenAAmount);
    console.log('B', tokenBAmount);


    await program.rpc.withdrawAll(
      new anchor.BN(poolTokenAmount),
      new anchor.BN(tokenAAmount),
      new anchor.BN(tokenBAmount),
      {
        accounts: {
          amm: amm,
          authority: poolAuthority,
          owner: wallet.publicKey,
          sourceInfo: sourcePoolTokenAddress,
          vaultTokenA: vault0, //vault address 1
          vaultTokenB: vault1, //vault address 2
          poolMint: tokenPool.address,
          destTokenAInfo: sourceTokenAddress,
          destTokenBInfo: destTokenAddress,
          feeAccount: token_pool_mint_ata,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={
          token.id === 0 ? withdrawAll : token.id === 1 ? withdrawA : withdrawB
        }
      >
        {/* From */}
        <div className="bg-[#141041] relative p-2 w-full rounded-2xl">
          <div className="flex relative w-full justify-between">
            <div className="w-full">
              <div className="mb-2">
                {/* listbox */}

                <Listbox value={selectedTokens} onChange={handlePairChange}>
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
                onChange={() => handleTokenName(window.event as any, item.id)}
              >
                <input
                  type="radio"
                  value={item.tokenName}
                  onChange={() => handleTokenName(window.event as any, item.id)}
                  name={item.name}
                  id={item.id.toString()}
                  checked={item.tokenName === selectedRadio}
                />{" "}
                <label htmlFor={item.id.toString()}>
                  Remove {item.tokenName}
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
                  className="bg-transparent border border-[rgb(29,234,183,0.14)] rounded-sm outline-none w-3/5 md:w-2/3 p-2 "
                  value={userAmount}
                  onChange={handleValue}
                />

                <div className="border border-[rgb(29,234,183,0.14)] rounded-sm text-sm md:text-base px-1 w-2/5 md:first:w-1/3 flex items-center gap-2 justify-center">
                  {token.icon && (
                    <Image src={token.icon} alt="token" height={30} width={30} />

                  )}
                  {token.tokenName}

                </div>
              </div>
              <input
                type="number"
                placeholder="1000"
                className="bg-transparent border-[rgb(29,234,183,0.14)] rounded-sm border outline-none w-3/5 md:w-2/3 p-2 "
                value={estTokenBAmount}
                readOnly

              />

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

        <button type="submit" className="flex justify-center bg-[#512DA8] w-full mt-6 py-3 font-bold rounded-[20px] hover:bg-opacity-80">
          Remove Liquidity
        </button>
      </form>
    </div>
  );
};

export default RemoveLiquidity;
