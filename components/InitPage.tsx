import React, { useState } from 'react'
import FormComp from './FormComp'
import { useProgram } from "../hooks/useProgram";
import * as anchor from "@project-serum/anchor";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccount, getAssociatedTokenAddress, } from "@solana/spl-token";
import { fbanxMint, usdcMint, usdtMint, solMint } from "./Swap/const";
import { PublicKey } from "@solana/web3.js";
import idl from '../public/idl.json';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorProvider } from '@project-serum/anchor';

const mintA = fbanxMint
const mintB = usdcMint
const programID = new PublicKey(idl.metadata?.address);
const preflightCommitment = "processed";
const commitment = "processed";

const CurveType = Object.freeze({
    ConstantProduct: 0,
    ConstantPrice: 1
})

const InitPage = () => {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();

    const [tfn, setTfn] = useState<number>();
    const [tfd, setTfd] = useState<number>()
    const [otfn, setOtfn] = useState<number>()
    const [otfd, setOtfd] = useState<number>()
    const [owfn, setOwfn] = useState<number>()
    const [owfd, setOwfd] = useState<number>()
    const [hfn, setHfn] = useState<number>()
    const [hfd, setHfd] = useState<number>()

    const handleTfn = (e: React.FormEvent) => {
        setTfn(Number((e.target as HTMLInputElement).value));
    };
    const handleTfd = (e: React.FormEvent) => {
        setTfd(Number((e.target as HTMLInputElement).value));
    };
    const handleOtfn = (e: React.FormEvent) => {
        setOtfn(Number((e.target as HTMLInputElement).value));
    };
    const handleOtfd = (e: React.FormEvent) => {
        setOtfd(Number((e.target as HTMLInputElement).value));
    };
    const handleOwfn = (e: React.FormEvent) => {
        setOwfn(Number((e.target as HTMLInputElement).value));
    };
    const handleOwfd = (e: React.FormEvent) => {
        setOwfd(Number((e.target as HTMLInputElement).value));
    };
    const handleHfn = (e: React.FormEvent) => {
        setHfn(Number((e.target as HTMLInputElement).value));
    };
    const handleHfd = (e: React.FormEvent) => {
        setHfd(Number((e.target as HTMLInputElement).value));
    };

    const curve_input: TypeDef<
        {
            name: "CurveInput";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "curveType";
                        type: "u8";
                    },
                    {
                        name: "curveParameters";
                        type: "u64";
                    }
                ];
            };
        },
        Record<string, number>
    > = {
        curveType: CurveType.ConstantProduct,
        curveParameters: new anchor.BN(0),
    };



    const fees_input: TypeDef<
        {
            name: "FeesInput";
            type: {
                kind: "struct";
                fields: [
                    {
                        name: "tradeFeeNumerator";
                        type: "u64";
                    },
                    {
                        name: "tradeFeeDenominator";
                        type: "u64";
                    },
                    {
                        name: "ownerTradeFeeNumerator";
                        type: "u64";
                    },
                    {
                        name: "ownerTradeFeeDenominator";
                        type: "u64";
                    },
                    {
                        name: "ownerWithdrawFeeNumerator";
                        type: "u64";
                    },
                    {
                        name: "ownerWithdrawFeeDenominator";
                        type: "u64";
                    },
                    {
                        name: "hostFeeNumerator";
                        type: "u64";
                    },
                    {
                        name: "hostFeeDenominator";
                        type: "u64";
                    }
                ];
            };
        },
        Record<string, number>
    > = {
        tradeFeeNumerator: new anchor.BN(tfn!),
        tradeFeeDenominator: new anchor.BN(tfd!),
        ownerTradeFeeNumerator: new anchor.BN(otfn!),
        ownerTradeFeeDenominator: new anchor.BN(otfd!),
        ownerWithdrawFeeNumerator: new anchor.BN(owfn!),
        ownerWithdrawFeeDenominator: new anchor.BN(
            owfd!
        ),
        hostFeeNumerator: new anchor.BN(hfn!),
        hostFeeDenominator: new anchor.BN(hfd!),
    };


    const init_page = async (e: any) => {

        const provider = new AnchorProvider(connection!, wallet!, {
            preflightCommitment,
            commitment,
        });
        const program = new anchor.Program(idl as any, programID, provider);
        e.preventDefault();

        const [amm, _ammBump] = await PublicKey.findProgramAddress(
            [Buffer.from("amm"), fbanxMint.toBuffer(), usdcMint.toBuffer()],
            program!.programId
        );

        const [authority, _bumpSeed] = await PublicKey.findProgramAddress(
            
            [Buffer.from("authority"),amm.toBuffer()],
            program!.programId
        );

        let [poolMint, _poolMint_b] = await PublicKey.findProgramAddress(
            [Buffer.from("pool_mint"), amm.toBuffer()],
            program!.programId,
        );

        let [vault0, _vault0_b] = await PublicKey.findProgramAddress(
            [Buffer.from("vault0"), amm.toBuffer()],
            program!.programId,
        );
        let [vault1, _vault1_b] = await PublicKey.findProgramAddress(
            [Buffer.from("vault1"), amm.toBuffer()],
            program!.programId,
        );


        const feeAta = await getAssociatedTokenAddress(poolMint, wallet!.publicKey);
        const destAta = await getAssociatedTokenAddress(poolMint, wallet!.publicKey);
        console.log(programID)
        console.log(wallet!.publicKey)
        console.log(amm)



        const tx = await program!.rpc.initPool(fees_input, curve_input, {
            accounts: {
                poolAuthority: authority,
                amm: amm,
                poolMint: poolMint,
                vault0: vault0,
                vault1: vault1,
                feeAccount: feeAta,
                destination: destAta,
                payer: wallet!.publicKey,
                mint0: mintA,
                mint1: mintB,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId,
            },

        });
        console.log("Your transaction signature", tx);
    };

    return (
        <div className='h-[100vh]'>
            <div className='container mx-[auto]'>
                <FormComp value={tfn!} label='TRADING FEE NUMERATOR' handleChange={handleTfn} />
                <FormComp value={tfd!} label='TRADING FEE DENOMINATIOR' handleChange={handleTfd} />
                <FormComp value={otfn!} label='OWNER TRADING FEE NUMERATOR' handleChange={handleOtfn} />
                <FormComp value={otfd!} label='OWNER TRADING FEE DENOMINATOR' handleChange={handleOtfd} />
                <FormComp value={owfn!} label='OWNER WITHDRAW FEE NUMERATOR' handleChange={handleOwfn} />
                <FormComp value={owfd!} label='OWNER WITHDRAW FEE DENOMINATOR' handleChange={handleOwfd} />
                <FormComp value={hfn!} label='HOST FEE NUMERATOR' handleChange={handleHfn} />
                <FormComp value={hfd!} label='HOST FEE DENOMINATOR' handleChange={handleHfd} />
                <div className='text-center'>
                    <button className='border-[1px] bg-[red] px-[12px] py-[12px] ' onClick={init_page}>
                        SUBMIT
                    </button>
                </div>
                <div>
                    <WalletMultiButton />
                </div>
            </div>

        </div>
    )
}





export default InitPage