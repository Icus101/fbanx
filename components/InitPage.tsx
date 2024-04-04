import React, { FC, useEffect, useState } from 'react'
import FormComp from './FormComp'
import { useProgram } from "../hooks/useProgram";
import * as anchor from "@project-serum/anchor";
import { TypeDef } from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccount, getAssociatedTokenAddress, createMint, createAccount, Account, getOrCreateAssociatedTokenAccount, mintTo, getMint, } from "@solana/spl-token";
import { Mint1, Mint2} from "./Swap/const";
import { PublicKey, Keypair } from "@solana/web3.js";
import idl from '../public/idl.json';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorProvider } from '@project-serum/anchor';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {  token_pool_mint } from '../utils/constant';

const mintA = Mint1
const mintB = Mint2
const programId = new PublicKey(idl.metadata.address);

const feePayer = Keypair.fromSecretKey(
    bs58.decode(
        "61Sy9Xma92RDgno7qR4doim7Zr2Rtmv3QhTnGRU2DVh7a9aACEqmarcsgAcTAEcSaatY5rCnBS7N7mmPW7Fsmcia"
    )
);

// const mint1Keypair = Keypair.fromSecretKey(
//     bs58.decode(
//         "5XehqoyEdqRYe6KU9qQrZ5ZNBB2RUjV31AsYaRPQaS5PmcNGtvyVrjwZtgUyWSmcbWub5BcAH5TSYkxM7tF4bueE"
//     )
// )
// const mint2Keypair = Keypair.fromSecretKey(
//     bs58.decode(
//         "F4F4BKBQYd4NYQijZPRocMySdC2dF7BF2cdgFNN7rnJiiCsEFWESEyLtHwjF58dBK4iZr3HgS3KczwQZXi88Jwt"
//     )
// )


const CurveType = Object.freeze({
    ConstantProduct: 0,
    ConstantPrice: 1
})

const InitPage: FC = () => {
    const [program, setProgram] = useState<anchor.Program>()
    const wallet = useAnchorWallet();
    const { connection } = useConnection();

    useEffect(() => {
        if (!wallet) {
            return
        }
        let provider: anchor.Provider

        try {
            provider = anchor.getProvider()

        } catch {
            provider = new anchor.AnchorProvider(connection, wallet, {})
            anchor.setProvider(provider)
        }

        const program = new anchor.Program(idl as anchor.Idl, programId)
        setProgram(program)
    }, [])

    const [tfn, setTfn] = useState<number>(0);
    const [tfd, setTfd] = useState<number>(0)
    const [otfn, setOtfn] = useState<number>(0)
    const [otfd, setOtfd] = useState<number>(0)
    const [owfn, setOwfn] = useState<number>(0)
    const [owfd, setOwfd] = useState<number>(0)
    const [hfn, setHfn] = useState<number>(0)
    const [hfd, setHfd] = useState<number>(0)

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

        if (!program) {
            return
        }
        if (!wallet) {
            return
        }
        console.log('clicked')
        e.preventDefault();

        const [amm, _ammBump] = await PublicKey.findProgramAddress(
            [Buffer.from("amm"), mintA.toBuffer(), mintB.toBuffer()],
            program.programId
        );

        console.log('amm :', amm.toBase58())

        const [authority, _bumpSeed] = await PublicKey.findProgramAddress(
            [amm.toBuffer()],
            program.programId
        );
        console.log('authority :', authority.toBase58())

        let tokenPool = await getMint(
            connection,
            token_pool_mint,
        );
        console.log('token pool mint : ', tokenPool.address.toBase58());



        let pool_mint_ata = await getOrCreateAssociatedTokenAccount(
            connection, feePayer, tokenPool.address, wallet.publicKey);

        console.log('pool mint ata : ', pool_mint_ata.address.toBase58());


        let vault0 = await getOrCreateAssociatedTokenAccount(connection, feePayer, mintA, authority, true);
        

        console.log('v 1 :', vault0.address.toBase58())

        let vault1 = await getOrCreateAssociatedTokenAccount(connection, feePayer, mintB, authority, true);
        // await mintTo(
        //     connection,
        //     mint2Keypair,
        //     mintB,
        //     vault1.address,
        //     mint2Keypair.publicKey,
        //     1000000
        // )
        console.log('v 2 :', vault1.address.toBase58())

        const tx = await program.methods.initPool(fees_input, curve_input).
            accounts({
                poolAuthority: authority,
                amm: amm,
                poolMint: tokenPool.address,
                vault0: vault0.address,
                vault1: vault1.address,
                feeAccount: pool_mint_ata.address,
                destination: pool_mint_ata.address,
                payer: wallet.publicKey,
                mint0: mintA,
                mint1: mintB,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId,
            }).signers([])
            .rpc()


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