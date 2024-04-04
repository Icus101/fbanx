// src/components/EscrowStatus.tsx
import React, { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useProgram } from "./useProgram2";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";

interface EscrowStatusProps {
  escrowAccountPubkey: PublicKey;
  // You can include additional props needed for smart contract interaction
}
const mintA = new PublicKey("GkbyHgD2roA6pCSBrNSzqV3szJQQtCToLMpcg3DxLny7");

const FetchEscrow: React.FC = () => {
  const [escrowAccountPubkey, setEscrowAccountPubkey] = useState<string>("");
  const [escrowAccount, setEscrowAccount] = useState<any>(null);
  const { program, wallet, connection } = useProgram();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isApprLoading, setIsApprLoading] = useState(false);
  const [isApprSuccess, setIsApprSuccess] = useState(false);
  const [isRelLoading, setIsRelLoading] = useState(false);
  const [isRelSuccess, setIsRelSuccess] = useState(false);
 

  const { sendTransaction } = useWallet();
  const transaction = new anchor.web3.Transaction();

  const fetchEscrowAccount = async () => {
    try {
      if (program) {
        console.log("fetching");
        setIsLoading(true);
        setIsSuccess(false);

        const account = await program.account.escrowAccount.fetchNullable(
          new PublicKey(escrowAccountPubkey)
        );
        // console.log('account',account);

        setEscrowAccount(account);
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Failed to fetch escrow account:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is false after operation completes or fails
    }
  };

  useEffect(() => {
      fetchEscrowAccount()
      console.log('fetched');
      

  }, [isApprSuccess,isApprLoading,isRelSuccess,isRelLoading]);

  const handleApprove = async () => {
    try {
      if (program && wallet && escrowAccount != null) {
        setIsApprLoading(true);
        setIsApprSuccess(false);
       
        const tx = await program.methods
          .approve()
          .accounts({
            escrowAccount: new PublicKey(escrowAccountPubkey),
            creator: escrowAccount.initializerKey,
            receiver: escrowAccount.developerKey,
          })
          .signers([])
          .rpc();
        console.log("Funds released transaction signature", tx);
        setIsApprLoading(false);
        setIsApprSuccess(true);
      }
    } catch (error) {
      setIsError(true)
      console.error("Failed to Approve escrow account:", error);

    } finally {
      setIsApprLoading(false); // Ensure loading state is false after operation completes or fails
      setIsApprSuccess(false);
      setIsError(false)
    }
  };

  const handleReleaseFunds = async () => {
    try {
      if (program && wallet && escrowAccount != null) {
        setIsRelLoading(true);
        setIsRelSuccess(false);
        const [escrowTAccount, _escrowTAccountBump] =
          await PublicKey.findProgramAddress(
            [
              Buffer.from("vault"),
              new PublicKey(escrowAccountPubkey).toBuffer(),
            ],
            program.programId
          );

        const [escrowAuthority, _poolBump] = await PublicKey.findProgramAddress(
          [
            Buffer.from("authority"),
            new PublicKey(escrowAccountPubkey).toBuffer(),
          ],
          program!.programId
        );

        let userTokenAddress = await getAssociatedTokenAddress(
          mintA,
          escrowAccount.developerKey
        );

        let userAccount = await connection.getAccountInfo(userTokenAddress);
        if (userAccount == null) {
          const createATAIX1 = await createAssociatedTokenAccountInstruction(
            wallet.publicKey, // payer
            userTokenAddress, // ata
            escrowAccount.developerKey, // owner
            mintA // mint
          );
          transaction.add(createATAIX1);
          let txid = await sendTransaction(transaction, connection);
          console.log("txid", txid);
        }

        const tx = await program.methods
          .releaseFunds()
          .accounts({
            escrowAccount: new PublicKey(escrowAccountPubkey),
            creator: escrowAccount.initializerKey,
            receiver: escrowAccount.developerKey,
            escrowAuthority,
            escrowTokenAccount: escrowTAccount,
            receiverTokenAccount: userTokenAddress,
            tokenMint: mintA,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([])
          .rpc();
        console.log("Funds released transaction signature", tx);
        setIsRelLoading(true);
        setIsRelSuccess(false);
      }
    } catch (error) {
      console.error("Failed to Released escrow account:", error);
    } finally {
      setIsRelLoading(false); // Ensure loading state is false after operation completes or fails
      setIsRelSuccess(false);
    }
  };

  //   if (!escrowAccount) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="p-6 mt-[20px] shadow-xl text-black rounded-xl bg-gradient-to-r from-gray-100 to-gray-200">
      <input
        type="text"
        value={escrowAccountPubkey}
        onChange={(e) => setEscrowAccountPubkey(e.target.value)}
        placeholder="Enter Escrow Account Pubkey"
        className="border border-gray-300 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        required
      />
      <button
        onClick={fetchEscrowAccount}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transition-all"
      >
        Fetch Escrow Account
      </button>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!isLoading && isSuccess && (
        <div className="mt-4 text-lg font-medium text-center">
          Amount in escrow: {(escrowAccount.amount / 1_000_000_000).toString()}{" "}
          SOL
        </div>
      )}

      {escrowAccount && (
        <>
          {!escrowAccount.isApproved && (
            <button
              onClick={handleApprove}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg w-full transition-all"
            >
              Approve
            </button>
          )}
          {isApprLoading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!isApprLoading && isApprSuccess && (
            <div className="mt-4 text-lg font-medium text-center">
              Escrow Approved,Now Realease
            </div>
          )}
          {escrowAccount.isApproved && Number(escrowAccount.amount) > 0 &&(
            <button
              onClick={handleReleaseFunds}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg w-full transition-all"
            >
              Release Funds
            </button>
          )}
           {isRelLoading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!isRelLoading && isRelSuccess && (
            <div className="mt-4 text-lg font-medium text-center">
              Escrow  Realeased
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FetchEscrow;
