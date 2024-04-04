import React, { useEffect, useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react';
import { Account, getAccount, getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import { mint1, mint2, authority, token_pool_mint, } from '../utils/constant';
import { PublicKey } from "@solana/web3.js";

let vault0: PublicKey;
let vault1: PublicKey;
let swapTokenA: Account
let swapTokenB: Account

interface Props {
    detailState : boolean
}


const Details = ({detailState}:Props) => {
    const [tokenX, setTokenX] = useState<number>(0)
    const [tokenY, setTokenY] = useState<number>(0)
    const [supply, setSupply] = useState<number>(0)
    const [price, setPrice] = useState<number>(0)
    const [details,showDetails] = useState<boolean>(false)

    const { connection } = useConnection();
    const update = async () => {
        try {
            vault1 = await getAssociatedTokenAddress(mint1, authority, true);
            vault0 = await getAssociatedTokenAddress(mint2, authority, true);
            swapTokenA = await getAccount(connection, vault0);
            swapTokenB = await getAccount(connection, vault1);
            let poolMintInfo = await getMint(connection, token_pool_mint);
            setTokenX(Number((swapTokenA).amount))
            setTokenY(Number(swapTokenB.amount))
            setSupply(Number(poolMintInfo.supply))

        } catch (error) {
            return

        }

    }

    const tokenPrice = async () => {
        try {
            vault1 = await getAssociatedTokenAddress(mint1, authority, true);
        vault0 = await getAssociatedTokenAddress(mint2, authority, true);
        swapTokenA = await getAccount(connection, vault0);
        swapTokenB = await getAccount(connection, vault1);
        const invariant = (Number(swapTokenA!.amount)) * (Number(swapTokenB!.amount))
        let plus_one = Number(swapTokenA.amount) + 1;
        let amount_to_balance = invariant / plus_one;
        let price = Number(swapTokenB.amount) - amount_to_balance;
        console.log(price);

        setPrice(price)
        } catch (error) {
            return
        }
        

    }


    useEffect(() => {
        tokenPrice()
        update();
    }, []);

    return (
         <div  className={`${detailState ? 'show_side' : 'hide_side'}`}>
            <div className=''>
                <div>
                    <div className='flex p-[30px] justify-evenly text-start align-middle'>
                        <div>
                            Currency Rate:
                        </div>
                        <div>
                            1 FBANX = {price}<span>USDC</span>
                        </div>
                    </div>
                    <div className='flex p-[30px] justify-evenly text-start align-baseline'>
                        <div>Pool Liquidity :</div>
                        <div>
                            <span>{` ${tokenX} TOKEN-X`}</span>
                            <br />
                            <span>{` ${tokenY} TOKEN-Y`}</span>
                        </div>

                    </div>
                    <div className='flex p-[30px] text-start align-baseline justify-evenly'>
                        <div>Your Liquidity :</div>
                        <div>
                            0 Fbnx<br />
                            0 USDC
                        </div>
                    </div>
                    <div className='flex p-[10px] justify-evenly'>
                        <div>LP Supply:</div>
                        <div>
                            <span>
                                {` ${supply} LP-TOKEN`}

                            </span>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default Details