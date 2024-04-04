import React from 'react'
import Nob3Icon from "~/nob3.png"
import Image from 'next/image'
import logo5 from "/public/Transparent PNG/logo-05.png";

const Grow = () => {
    return (
        <div className=''>
            <div className='container px-[12px] mx-auto 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] '>
                <div className='uppercase sm:text-[50px] text-[30px] font-700 text-center mb-[24px]'>
                    Raise funds for your  project the right way with our Kickstarter
                </div>
                <p className='max-w-[793px] text-center m-auto text-[20px] font-[300] italic'>
                    ChainCircle is created with a vision to change the landscape of the fundraising with the Solana ecosystem.
                </p>
                <div className='mt-[48px] mx-[-12px] flex flex-wrap'>
                    <div className='px-[12px] md:w-[100%] md:flex-[0_0_auto] '>
                        <div className='flex flex-wrap md:mt-[48px] items-center mx-[-12px] mt-[0] '>
                            <div className='lg:mb-0 mb-[8px] max-w-[100%] px-[12px] lg:w-[50%] lg:flex-[0_0_auto] md:w-[100%]'>
                                <Image src={logo5} width={300} height={300} alt='imgxx' className='h-auto max-w-[100%]'/>
                            </div>
                            <div className='px-[12px] lg:w-[50%] md:w-[100%] lg:flex-[0_0_auto] '>
                                <div className='flex flex-wrap mx-[-12px]'>
                                    <div className='flex mb-[48px] px-[12px] items-center lg:flex-[0_0_auto] lg:w-[100%] sm:w-[100%]'>
                                        <div className='flex p-[22px] border-[1px] border-[rgb(29,234,183,0.16)] rounded-[50%] relative'>
                                            <Image src='/stratup-icon-1.png' width={50} height={50}  alt='startup' className='w-[auto] h-auto align-middle max-w-[100%]'/>
                                            <div className='before:content-[""] w-[90%] h-[90%] block top-[5px] left-[5px] absolute rounded-[50%] border-[1px] border-[rgb(38,198,138)]'>
                                            </div>
                                        </div>
                                        <div className='ml-[48px] inline-flex text-[20px] sm:text-[35px] font-[900] leading-[35px] text-start'>
                                            <strong>
                                                Guaranteed<br/>
                                                Token Allocation
                                            </strong>
                                        </div>
                                    </div>

                                    <div className='flex mb-[48px] px-[12px] items-center lg:flex-[0_0_auto] lg:w-[100%] sm:w-[100%]'>
                                        <div className='flex p-[22px] border-[1px] border-[rgb(29,234,183,0.16)] rounded-[50%] relative'>
                                            <Image src='/Insured.png' width={50} height={50} alt='insured' className='h-auto w-[auto] align-middle max-w-[100%]'/>
                                            <div className='before:content-[""] w-[90%] h-[90%] block top-[5px] left-[5px] absolute rounded-[50%] border-[1px] border-[rgb(38,198,138)]'>
                                            </div>
                                        </div>
                                        <div className='ml-[48px] inline-flex text-[20px] sm:text-[35px] font-[900] leading-[35px] text-start'>
                                            <strong>
                                                Insured IDO<br/>
                                                Platform
                                            </strong>
                                        </div>
                                    </div>

                                    <div className='flex mb-[48px] px-[12px] items-center lg:flex-[0_0_auto] lg:w-[100%] sm:w-[100%]'>
                                        <div className='flex p-[22px] border-[1px] border-[rgb(29,234,183,0.16)] rounded-[50%] relative'>
                                            <Image src='/Reward.png' alt='icon1' width={50} height={50} className='h-auto w-[auto] align-middle max-w-[100%]'/>
                                            <div className='before:content-[""] w-[90%] h-[90%] block top-[5px] left-[5px] absolute rounded-[50%] border-[1px] border-[rgb(38,198,138)]'>
                                            </div>
                                        </div>
                                        <div className='ml-[48px] inline-flex text-[20px] sm:text-[35px] font-[900] leading-[35px] text-start'>
                                            <strong>
                                                Reward for<br/>
                                                IDO Participants
                                            </strong>
                                        </div>
                                    </div>

                                    <div className='flex mb-[48px] px-[12px] items-center lg:flex-[0_0_auto] lg:w-[100%] sm:w-[100%]'>
                                        <div className='flex p-[22px] border-[1px] border-[rgb(29,234,183,0.16)] rounded-[50%] relative'>
                                            <Image src='/stratup-icon-4.png' width={50} height={50} alt='icon1' className='h-auto w-auto align-middle max-w-[100%]'/>
                                            <div className='before:content-[""] w-[90%] h-[90%] block top-[5px] left-[5px] absolute rounded-[50%] border-[1px] border-[rgb(38,198,138)]'>
                                            </div>
                                        </div>
                                        <div className='ml-[48px] inline-flex text-[20px] sm:text-[35px] font-[900] leading-[35px] text-start'>
                                            <strong>
                                                Competitive<br/>
                                                Platform Fees
                                            </strong>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Grow