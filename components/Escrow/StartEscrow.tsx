import React, { FormEvent, useEffect, useState } from "react";
import { useProgram } from "./useProgram2";
import { LAMPORTS_PER_SOL, Keypair, PublicKey } from "@solana/web3.js";

import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getMint,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor";
import FetchEscrow from "./FetchEscrow";
import { Address } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";

let escrowAddress: string;

let escrowAccountBump;

const StartEscrow = () => {
  const [paymentType, setPaymentType] = useState<"sol" | "splToken">("sol");
  const [amount, setAmount] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const { sendTransaction } = useWallet();
  const transaction = new anchor.web3.Transaction();

  const { program, wallet, connection } = useProgram();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert(`Copied`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      // Additional initialization logic here
      console.log("Clicked");
      console.log(paymentType);

      if (program && wallet && receiver != null) {
        // Generate a new keypair for the creator

        const receiverPubKey = new PublicKey(receiver);

        const admin = new PublicKey(
          "Vjv4bPBgBCcc2gEDartcUGfBaaTFtR8vdUNrtyZdCxv"
        );

        const mintA = new PublicKey(
          "GkbyHgD2roA6pCSBrNSzqV3szJQQtCToLMpcg3DxLny7"
        );

        const creatorTokenAddress = await getAssociatedTokenAddress(
          mintA,
          wallet.publicKey
        );
        let creatorAccount = await connection.getAccountInfo(
          creatorTokenAddress
        );
        if (creatorAccount == null) {
          const createATAIX1 = await createAssociatedTokenAccountInstruction(
            wallet.publicKey, // payer
            creatorTokenAddress, // ata
            wallet.publicKey, // owner
            mintA // mint
          );
          transaction.add(createATAIX1);
          let txid = await sendTransaction(transaction, connection);
          console.log("txid", txid);
        }
        // Assume escrow_account and escrow_token_account are PDAs. Adjust the seed and programId accordingly.
        const [escrowAccount, _escrowAccountBump] =
          await PublicKey.findProgramAddress(
            [
              Buffer.from("escrow"),
              wallet.publicKey.toBuffer(),
              receiverPubKey.toBuffer(),
            ],
            program.programId
          );

        escrowAddress = escrowAccount.toString();
        console.log(escrowAccount.toString());

        const [escrowAuthority, _poolBump] = await PublicKey.findProgramAddress(
          [Buffer.from("authority"), escrowAccount.toBuffer()],
          program!.programId
        );
        const [escrowTAccount, _escrowTAccountBump] =
          await PublicKey.findProgramAddress(
            [Buffer.from("vault"), escrowAccount.toBuffer()],
            program.programId
          );

        // const paymentType = { sol: {} }; // This represents paying with SOL. Adjust for SPL token by including SPL token details.
        const paymentTypeSpl = { splToken: {} };
        const paymentTypeSol = { sol: {} }; // for Sol

        const tokenMintInfo = await getMint(connection, mintA);
        const decimal = Number(tokenMintInfo.decimals);
        let amount2 = new anchor.BN(Number(amount) * Math.pow(10, decimal));
        const amountSol = new anchor.BN(
          anchor.web3.LAMPORTS_PER_SOL * Number(amount)
        );

        const tx = await program.methods
          .startEscrow(paymentTypeSol, paymentTypeSol ? amountSol : amount2)
          .accounts({
            creator: wallet.publicKey,
            receiver: receiverPubKey,
            escrowAccount: escrowAccount,
            creatorTokenAccount: creatorTokenAddress,
            escrowAuthority,
            escrowTokenAccount: escrowTAccount,
            admin: admin,
            tokenMint: mintA,
            systemProgram: anchor.web3.SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          })
          .signers([])
          .rpc();

        console.log("Transaction ID:", tx);
        setIsLoading(false);
        setIsSuccess(true);
        setErrMsg(null);
      }
    } catch (error: any) {
      setIsError(true);
      setErrMsg(error.toString());
      console.error("An error occurred during the transaction:", error);
      // Handle the error accordingly
      // For example, you might want to set an error state or display a notification
    } finally {
      setIsLoading(false); // Ensure loading state is false after operation completes or fails
      setIsError(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-[#141041] to-[#1E215D] text-white shadow-xl container mx-auto max-w-2xl rounded-xl">
      <h2 className="text-3xl font-bold text-center">Start Escrow</h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Payment Type</h3>
        <select
          className="border border-gray-300 p-3 text-black bg-white rounded-md w-full mt-2"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value as "sol" | "splToken")}
        >
          <option value="sol">SOL</option>
          <option value="splToken">SPL Token</option>
        </select>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border text-black border-gray-300 p-3 rounded-md w-full mb-4"
          required
        />
        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="Receiver Address"
          className="border text-black border-gray-300 p-3 rounded-md w-full"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out hover:bg-gradient-to-l hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Start Escrow
      </button>

      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!isLoading && isSuccess && (
        <div className="mt-4 text-center font-medium">
          Escrow Account: <br />{" "}
          <span
            onClick={() => copyToClipboard(escrowAddress)}
            className="text-blue-300"
          >
            {escrowAddress}
          </span>
        </div>
      )}

      {!isLoading && !isSuccess && errorMsg != null && (
        <div className="flex justify-center items-center mt-4">
          <div className="a">{errorMsg}</div>
        </div>
      )}

      <FetchEscrow />
    </div>
  );
};

export default StartEscrow;
