import React from 'react'
import Image from 'next/image'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
const Main = () => {
    return (
        <main className='px-[15px] pt-[0] pb-[25px] lg:px-[70px] lg:pb-[30px]'>
            <div className=''>
                <div className='my-[20px]'>
                    <div className='py-[22px]'>
                        <h1 className='mb-[8px] text-[36px] font-[700] italic'> ICUS Finance </h1>
                        <p className='text-[18px] font-[400]'>Diversifying Decentralized Finance.</p>
                    </div>
                    <div className='flex flex-wrap mx-[-16px] mb-[60px]'>
                        <div className='px-[16px]  max-w-[100%] w-[100%] md:w-[50%]'>
                            <div className='p-[25px] rounded-[20px] mt-[30px] min-h-[90%] relative bg-[rgb(11,31,68)]'>
                                <div>
                                    <h6 className='text-[16px] font-[500] tracking-[2.56px] uppercase opacity-[0.9] leading-[19.2px] absolute top-[-10px]'>Staking</h6>

                                    <div className='grid gap-[20px] grid-cols-2 mb-[30px] leading-[24px]'>
                                        <p className=' text-[16px] font-[400]'>
                                            <span className='mt-[10px] text-[16px] font-[400] leading-[32.5px] opacity-[0.6] block'> Your Staked CFB-LP:     </span>
                                            <span className='mt-[10px] text-[25px] font-[400] block'>0.0000</span>
                                        </p>
                                        <p>
                                            <span className='mt-[10px] text-[16px] font-[400] leading-[32.5px] opacity-[0.6] block'>Your Staked CFB:</span>
                                            <span className='mt-[10px] text-[25px] font-[400] block'>0.0000</span>
                                        </p>
                                        <p>
                                            <span className='mt-[10px] text-[16px] font-[400] leading-[32.5px] opacity-[0.6] block'>
                                                Your Staked CFB: </span>
                                            <span className='mt-[10px] text-[25px] font-[400] block'>0.0000</span>
                                            <span className='text-[16px] block italic font-[400] mt-[10px] opacity-[0.6] leading-[20.8px]'>(Across all ICUS Pools)</span>


                                        </p>
                                        <p>
                                            <span className='mt-[10px] text-[16px] font-[400] leading-[32.5px] opacity-[0.6] block'>
                                                Total CFB Supply:
                                            </span>
                                            <span className='mt-[10px] text-[25px] font-[400] block'>000,000</span>
                                            <span className='text-[16px] block italic font-[400] mt-[10px] opacity-[0.6] leading-[20.8px]'>(ICUS Stats)</span>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <WalletMultiButton style={{backgroundColor : '#1adcab', padding : '10px_22px', borderRadius :'12px'}} />
                                </div>

                            </div>

                        </div>
                        <div className='px-[16px] max-w-[100%] w-[100%] md:w-[50%]'>
                            <div className='p-[25px] rounded-[20px] mt-[30px] bg-[rgb(71,106,172)] relative min-h-[90%] '>
                                <Image src='/party.png' alt='image' width={132} height={137} className='absolute top-0 right-0' />
                                <div className='relative'>
                                    <h5 className='mb-[8px] text-[18px] font-[500] italic leading-[21.6px]'>Your Lottery</h5>
                                    <h2 className='mb-[8px] text-[36px] font-[500] italic '> Winnings</h2>
                                    <div className='grid grid-cols-2 mx-[-16px] mt-[50px] mb-[30px]'>
                                        <p className='text-[16px] px-[16px] text-center border-r-[1px] max-w-[100%] font-[400]'>
                                            Active Lottery :
                                            <span className='block text-[24px] text-center'>0</span>
                                        </p>
                                        <p className='text-[16px] px-[16px] text-center font-[400]'>
                                            Winner Reward :
                                            <span className='block text-[24px] text-center'>0</span>
                                        </p>
                                    </div>

                                    <div>
                                        <WalletMultiButton style={{backgroundColor : '#1adcab', padding : '10px_22px', borderRadius :'12px'}} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='mx-[-12px] mb-[60px]'>
                        <div className='px-[12px]'>
                            <div className='min-h-[180px]'>
                                <div className='md:p-[24px] p-[20px] bg-[rgb(11,31,68)] relative flex justify-between items-center h-[150px] min-h-[90%]'>
                                    <div className='leading-[24px]'>
                                        <p className='lg:text-[18px] text-[16px] font-[400] leading-[27px] mb-[10px] '>Earn up to </p>
                                        <h3 className='italic text-[45px] lg:text-[56px] font-[500] tracking-[1px] mb-[8px] text-[rgb(26,220,171)]'>20%{" "}
                                            <span className='text-[16px] tracking-[1px]'>ICUS in Stake</span>
                                        </h3>
                                    </div>
                                    <div>
                                        <Image src='/surprise.png' alt='image' width={192} height={201} className=' w-auto md:right-[10%] align-middle' />
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='mx-[-16px] flex'>
                        <div className='px-[16px] max-w-[100%] w-[100%]'>
                            <div className='flex md:flex-row flex-col justify-between md:items-center align-baseline '>
                                <div className='text-start mb-[10px]'>
                                    <h1 className='text-[36px] font-[700] text-left'>ICUS Pools</h1>
                                    <p className='text-[16px] font-[400] opacity-[0.6]'> Just stake some tokens to earn. High APR, low risk.</p>
                                </div>
                                <div className='sm:min-w-[35%] min-w-[100%]  '>
                                    <div className='text-[rgb(0,0,0)] p-[20px] bg-[#1ADCAB] rounded-[20px]'>
                                        <h4 className='mb-[10px] italic text-[20px] font-[500]'>Auto Bounty</h4>
                                        <p className='flex flex-wrap items-center justify-between'>
                                            <span className='font-[700] block italic text-[43px] leading-[64.5px]'>0.000</span>
                                            <span className='text-right'>
                                                <Link href='#' className='text-[16px] text-[#fff] bg-[black] rounded-[12px] font-[700] cursor-pointer leading-[24px] border-[#1ADCAB] text-right px-[22px] py-[8px]  md:px-[45px] md:py-[5px] border-[1px]'>
                                                    Claim
                                                </Link>
                                            </span>
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </main>
    )
}

export default Main