import { utils } from "@project-serum/anchor";
import { useProgram } from "../../hooks/useProgram";
import {} from "../../utils/constant";
import * as token from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import React, { useEffect, useState, Fragment } from "react";
import { MdOutlineSwapVert } from "react-icons/md";
import { Listbox, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import Image from "next/image";
import * as Web3 from "@solana/web3.js";
import Usdt from "cryptocurrency-icons/svg/color/usdt.svg";
import Usdc from "cryptocurrency-icons/svg/color/usdc.svg";
import Sol from "cryptocurrency-icons/svg/color/sol.svg";
import { usdcMint, Mint1, Mint2, solMint } from "./const";
import { PublicKey, Keypair } from "@solana/web3.js";
import { token_pool_mint, token_pool_mint_ata } from "../../utils/constant";
import {
  getAccount,
  getAssociatedTokenAddress,
  getMint,
  mintTo,
  TokenUnsupportedInstructionError,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
const utf8 = utils.bytes.utf8;
//const tokenAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

//const tokenPublicKey = new Web3.PublicKey(tokenAddress);

interface Props {
  id: number;
  name: string;
}

const mint1Keypair = Keypair.fromSecretKey(
  bs58.decode(
    "5XehqoyEdqRYe6KU9qQrZ5ZNBB2RUjV31AsYaRPQaS5PmcNGtvyVrjwZtgUyWSmcbWub5BcAH5TSYkxM7tF4bueE"
  )
);

const FromItems = [
  { id: 1, name: "CCX", icon: Usdt, address: Mint1 },
  { id: 2, name: "USDT", icon: Usdt, address: Mint2 },
  { id: 3, name: "USDC", icon: Usdc, address: usdcMint },
  { id: 4, name: "SOL", icon: Sol, address: solMint },
];

const ToItems = [
  { id: 1, name: "CCX", icon: Usdt, address: Mint1 },
  { id: 2, name: "USDT", icon: Usdt, address: Mint2 },
  { id: 3, name: "USDC", icon: Usdc, address: usdcMint },
  { id: 4, name: "SOL", icon: Sol, address: solMint },
];

const Swap = () => {
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [reverse, setReserve] = useState<boolean>(false);
  const [swapFrom, setSwapFrom] = useState<Props>(FromItems[0]);
  const [swapTo, setSwapTo] = useState<Props>(ToItems[1]);
  const [value, setValue] = useState<number>(0);
  const [mintSource, setMintSource] = useState<PublicKey>(FromItems[0].address);
  const [mintDestination, setMintDestination] = useState<PublicKey>(
    ToItems[1].address
  );
  const [toValue, setToValue] = useState<number>(0);

  const handleSwitch = () => {
    setReserve(!reverse);
    setSwapTo(swapFrom);
    setSwapFrom(swapTo);
  };

  const handleSwapFrom = (valu: any) => {
    setSwapFrom(valu);
    setMintSource(valu.address);
    console.log(value);
    setValue(0);
    setToValue(0);
  };

  const handleSwapTo = (value: any) => {
    setSwapTo(value);
    setMintDestination(value.address);
    setValue(0);
    setToValue(0);
  };

  // useEffect(() => {
  //   setSwapTo(swapFrom);
  //   setSwapFrom(swapTo);
  // }, [reverse]);

  const handleValue = (e: React.FormEvent) => {
    setValue(Number((e.target as HTMLInputElement).value));
  };

  const { program, wallet, connection } = useProgram();

  const showBalance = async () => {
    if (!wallet) {
      return;
    }

    connection.getBalance(wallet.publicKey).then((balance) => {
      setBalance(balance / Web3.LAMPORTS_PER_SOL);
    });
  };
  const getAmm = async () => {
    if (!program && !wallet) {
      return;
    }
    const [amm, _ammBump] = await PublicKey.findProgramAddress(
      [Buffer.from("amm"), mintSource.toBuffer(), mintDestination.toBuffer()],
      program!.programId
    );
    return amm;
  };

  const getAuth = async () => {
    if (!program && !wallet) {
      return;
    }
    let amm = await getAmm();
    const [authority, _bumpSeed] = await PublicKey.findProgramAddress(
      [amm!.toBuffer()],
      program!.programId
    );
    return authority;
  };

  const tokenPrice = async () => {
    try {
      let authority = await getAuth();
      let vault0 = await getAssociatedTokenAddress(
        mintSource,
        authority!,
        true
      );
      let vault1 = await getAssociatedTokenAddress(
        mintDestination,
        authority!,
        true
      );
      let swapTokenA = await getAccount(connection, vault0);
      let swapTokenB = await getAccount(connection, vault1);
      const invariant = Number(swapTokenA!.amount) * Number(swapTokenB!.amount);
      let plus_value = Number(swapTokenA.amount) + value;
      let amount_to_balance = invariant / plus_value;
      let price = Number(swapTokenB.amount) - amount_to_balance;
      console.log(price);

      setToValue(price);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    showBalance();
  }, []);

  // const showTokenBalance = async () => {
  //   if (!wallet) {
  //     return;
  //   }
  //   connection.getParsedTokenAccountsByOwner(
  //     wallet.publicKey, { mint: tokenPublicKey }
  //   ).then(balance => {
  //     setTokenBalance(balance.value[0]?.account.data.parsed.info.tokenAmount.uiAmount)
  //     console.log(balance)
  //   })

  // }

  const swaps = async (e: any) => {
    e.preventDefault();
    if (!wallet) {
      return;
    }
    if (!program) {
      return;
    }

    const userSrcATA = await token.getOrCreateAssociatedTokenAccount(
      connection,
      mint1Keypair,
      mintSource,
      wallet.publicKey,
      true
    );

    const userDstATA = await token.getOrCreateAssociatedTokenAccount(
      connection,
      mint1Keypair,
      mintDestination,
      wallet.publicKey,
      true
    );
    let amm = await getAmm();
    let auth = await getAuth();

    let vault0 = await getAssociatedTokenAddress(mintSource, auth!, true);
    let vault1 = await getAssociatedTokenAddress(mintDestination, auth!, true);

    let tx = await program.rpc.swap(new anchor.BN(value), new anchor.BN(0), {
      accounts: {
        poolAuthority: auth!,
        amm: amm!,
        userSourceInfo: userSrcATA.address,
        userDestinationInfo: userDstATA.address,
        swapSource: vault0,
        swapDestination: vault1,
        poolMint: token_pool_mint,
        feeAccount: token_pool_mint_ata,
        owner: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        hostFeeAccount: PublicKey.default,
      },
    });
    console.log(tx);
  };

  useEffect(() => {
    tokenPrice();
  }, [value]);

  return (
    <div className="  mt-[10%] px-2 md:px-0">
      <div className="min-h-full flex justify-center items-center max-w-md mx-auto relativ">
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
            <form>
              <p className="font-bold mb-4">Swap</p>

              {/* From */}

              <div className="bg-[#141041] text-[12px] relative p-3 rounded-2xl h-[100px]">
                <div className="flex justify-between">
                  <p>From</p>
                  <p>{`Balance: ${balance} SOL`}</p>
                </div>

                <div className="flex relative justify-between">
                  <div className="">
                    <div className="fixed">
                      <Listbox value={swapFrom} onChange={handleSwapFrom}>
                        <Listbox.Button className="flex items-center gap-2">
                          {swapFrom.name} <MdArrowDropDown />{" "}
                        </Listbox.Button>
                        <Listbox.Options className="bg-[#126499] grid gap-y-4 p-2">
                          {FromItems.map((item) => (
                            <Listbox.Option
                              key={item.id}
                              value={item}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <Image
                                src={item.icon}
                                alt="img"
                                height={25}
                                width={25}
                              />
                              {item.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                    </div>
                  </div>

                  <div>
                    <input
                      type="number"
                      required
                      placeholder="0"
                      className="text-right bg-transparent outline-none"
                      value={value}
                      onChange={handleValue}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-[#512DA8] px-3 py-1 rounded hover:bg-opacity-80"
                  >
                    MAX
                  </button>
                </div>
              </div>

              {/* Switch */}
              <div
                className="py-4 flex justify-center cursor-pointer"
                onClick={handleSwitch}
              >
                <span className="bg-[#1B2D65] p-3 rounded-full hover:bg-opacity-80">
                  <MdOutlineSwapVert
                    size="24"
                    className="hover:rotate-180 transition-all"
                  />
                </span>
              </div>

              {/* To */}

              <div className="bg-[#141041] text-[12px] p-3 rounded-2xl h-[100px]">
                <div className="flex justify-between">
                  <p>To</p>
                  <p>{`Balance: ${tokenBalance} SOL`}</p>
                </div>

                <div className="flex justify-between">
                  <div className="">
                    <Listbox value={swapTo} onChange={handleSwapTo}>
                      <Listbox.Button className="flex items-center gap-2">
                        {swapTo.name} <MdArrowDropDown />{" "}
                      </Listbox.Button>
                      <Listbox.Options className="bg-[#126499] grid gap-y-4 p-2">
                        {ToItems.map((item) => (
                          <Listbox.Option
                            key={item.id}
                            value={item}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <Image
                              src={item.icon}
                              alt="img"
                              height={25}
                              width={25}
                            />
                            {item.name}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
                  </div>
                  <p>{toValue}</p>
                </div>
              </div>

              <button
                onClick={swaps}
                className="flex justify-center bg-[#512DA8] w-full mt-6 py-3 font-bold rounded-[20px] hover:bg-opacity-80"
              >
                SWAP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
