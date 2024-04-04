// import React, { ChangeEvent, useState } from "react";
// import {
//   updateV1,
//   fetchMetadataFromSeeds,
//   mplTokenMetadata,
// } from "@metaplex-foundation/mpl-token-metadata";
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { PublicKey } from "@solana/web3.js";

// const UpdateToken = () => {
//   const wallet = useWallet();
//   const [isLoading, setIsLoading] = useState(false);
 
//   const umi = createUmi(
//     "https://solana-devnet.g.alchemy.com/v2/DcUC5ugedhI5oeTvIK9cn7jgRlnVJKjn"
//   )
//     .use(mplTokenMetadata())
//     .use(walletAdapterIdentity(wallet));

//   interface TokenFormData {
//     mint: string;
//     name: string;
//     symbol: string;
//     decimals: string;
//     supply: string;
//     description: string;
//     image: File | null;
//   }

//   // State to hold form data
//   const [formData, setFormData] = useState<TokenFormData>({
//     mint : '',
//     name: "",
//     symbol: "",
//     decimals: "",
//     supply: "",
//     description: "",
//     image: null,
//   });
  

//   // Handle change in input fields
//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const target = e.target as HTMLInputElement; // Assert target as HTMLInputElement
//     const { name, value } = target;
//     let fileValue: File | string = value;

//     if (target.type === "file") {
//       fileValue = target.files ? target.files[0] : value;
//     }

//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: fileValue,
//     }));
//   };

//   const mint = new PublicKey(formData.mint)

//   const updateTokenMedata = async () => {
//     const initialMetadata = await fetchMetadataFromSeeds(umi, { mint });
//     console.log('initial Metadata:',initialMetadata);
    
//     await updateV1(umi, {
//       mint,
//       authority: umi.identity,
//       data: { ...initialMetadata, name: "Updated Asset",symbol : 'UA', },
//       primarySaleHappened: true,
//       isMutable: true,
//       // ...
//     }).sendAndConfirm(umi);
//   };

//   return (
//     <div className="container mx-auto max-w-2xl p-6 bg-white rounded-lg shadow-md text-gray-700">
//       <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//         Update Token Details
//       </h1>

//       <form onSubmit={updateTokenMedata} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="name" className="block font-medium text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Token Name"
//               className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="symbol" className="block font-medium text-gray-700">
//               Symbol
//             </label>
//             <input
//               type="text"
//               name="symbol"
//               value={formData.symbol}
//               onChange={handleChange}
//               placeholder="Symbol"
//               className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="supply" className="block font-medium text-gray-700">
//               Supply
//             </label>
//             <input
//               type="text"
//               name="supply"
//               value={formData.supply}
//               onChange={handleChange}
//               placeholder="Supply"
//               className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="decimals"
//               className="block font-medium text-gray-700"
//             >
//               Decimals
//             </label>
//             <input
//               type="text"
//               name="decimals"
//               value={formData.decimals}
//               onChange={handleChange}
//               placeholder="Decimals"
//               required
//               className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="image" className="block font-medium text-gray-700">
//             Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             required
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="description"
//             className="block font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-24"
//             required
//           />
//         </div>

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             {isLoading ? "Creating..." : "Create Token"}
//           </button>
//         </div>
//       </form>

//       {isLoading && (
//         <div className="mt-4 flex justify-center items-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateToken;
import React from 'react'

const UpdateToken = () => {
  return (
    <div>UpdateToken</div>
  )
}

export default UpdateToken
