// Import necessary libraries and types
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import {
  DataV2,
  CreateMetadataAccountV3InstructionArgs,
  Creator,
  createV1,
  TokenStandard,
  mintV1,
  createMetadataAccountV3,
} from "@metaplex-foundation/mpl-token-metadata";
import { findMetadataPda, Metaplex } from "@metaplex-foundation/js";
import * as web3 from "@solana/web3.js";
import { percentAmount, generateSigner } from "@metaplex-foundation/umi";
import { createFungibleAsset } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { nftStorageUploader } from "@metaplex-foundation/umi-uploader-nft-storage";
import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";

interface TokenFormData {
  name: string;
  symbol: string;
  decimals: string;
  supply: string;
  description: string;
  image: File | null;
}

const CreateToken: React.FC = () => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [errorMsg, setErrMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  // Additional state for holding the mint address, token account address, and supply
  const [tokenDetails, setTokenDetails] = useState({
    mintAddress: "",
    tokenAccountAddress: "", // You might need to adjust how you get this based on your actual token creation logic
    supply: "",
  });


  const umi = createUmi(
    "https://solana-devnet.g.alchemy.com/v2/DcUC5ugedhI5oeTvIK9cn7jgRlnVJKjn"
  )
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet));

  umi.use(
    nftStorageUploader({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDk4RDViMEMyZDc5ZkU2MUZmMjE0NTJmMzIwNEYwQmQyMzhlOTM5YjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcxMTU2OTQ4MTM5MywibmFtZSI6ImNoYWluY2lyY2xlIn0.3nLQABvpmx0NOo74026kFY-rNccgrpzHDV6x81Dpzao",
    })
  );

  // State to hold form data
  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    decimals: "",
    supply: "",
    description: "",
    image: null,
  });

  // Handle change in input fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement; // Assert target as HTMLInputElement
    const { name, value } = target;
    let fileValue: File | string = value;

    if (target.type === "file") {
      fileValue = target.files ? target.files[0] : value;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: fileValue,
    }));
  };

  const createTokenWithMetadata = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false)
    setIsError(false)
    try {
      if (wallet.connected) {
        e.preventDefault();
        setIsLoading(true);
        const file = await createGenericFileFromBrowserFile(formData.image!);
        const [imageUri] = await umi.uploader.upload([file]);

        const uri = await umi.uploader.uploadJson({
          name: formData.name,
          symbol: formData.symbol,
          supply: formData.supply,
          description: formData.description,
          image: imageUri,
          external_url: "https://chaincircle.io",
        });

        console.log(uri);

        const mint = generateSigner(umi);

        const ts = await createV1(umi, {
          mint,
          uri,
          sellerFeeBasisPoints: percentAmount(0),
          tokenStandard: TokenStandard.Fungible,
          name: formData.name,
          decimals: Number(formData.decimals),
          symbol: formData.symbol,
          isMutable: true,

          authority: umi.identity,
        }).sendAndConfirm(umi);

        let amount =  Number(formData.supply) * Math.pow(10,Number(formData.decimals))
        console.log('amount :',amount);
        

        await mintV1(umi, {
          mint: mint.publicKey,
          authority: umi.identity,
          amount,
          tokenOwner: umi.identity.publicKey,
          tokenStandard: TokenStandard.Fungible,
        }).sendAndConfirm(umi);

        setIsLoading(false);

        console.log(ts.signature);

        setTokenDetails({
          mintAddress: mint.publicKey.toString(),
          tokenAccountAddress: "Token Account Address Here", // Update this with actual logic
          supply: formData.supply,
        });

        setIsLoading(false);
        setIsSuccess(true)
        setErrMsg(null)
      }
    } catch (error : any) {
      setIsError(true)
      setErrMsg(error.toString())
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsError(false)
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-md text-gray-700">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
      Solana Token Creator
    </h1>
    <p className="text-center text-gray-600 mb-6">
      Create your token easily in 5 mins
    </p>

    <form onSubmit={createTokenWithMetadata} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Token Name"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="symbol" className="block font-medium text-gray-700">Symbol</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            placeholder="Symbol"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="supply" className="block font-medium text-gray-700">Supply</label>
          <input
            type="text"
            name="supply"
            value={formData.supply}
            onChange={handleChange}
            placeholder="Supply"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="decimals" className="block font-medium text-gray-700">Decimals</label>
          <input
            type="text"
            name="decimals"
            value={formData.decimals}
            onChange={handleChange}
            placeholder="Decimals"
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block font-medium text-gray-700">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-24"
          required
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? "Creating..." : "Create Token"}
        </button>
      </div>
    </form>

    {isLoading && (
      <div className="mt-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )}
    {!isLoading && !isSuccess && errorMsg != null && (
      <div className="mt-4 flex justify-center items-center">
        <div className="">{errorMsg}</div>
      </div>
    )}

   {tokenDetails.mintAddress && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Token Creation Details:</h3>
          <p>Mint Address: {tokenDetails.mintAddress}</p>
         
          <p>Supply: {tokenDetails.supply}</p>
        </div>
      )}
  </div>
  );
};

export default CreateToken;
