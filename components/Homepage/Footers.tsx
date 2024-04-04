import Image from 'next/image'
import React from 'react'
import { SocialIcon } from 'react-social-icons'
import logo1 from "/public/Transparent PNG/logo-04.png";

const Footers = () => {
    return (
        <div className=''>
            <div className='pt-[16px] md:pt-[48px] text-center'>
                <div className='container  2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] mx-auto px-[12px] '>
                    <div className='md:flex  flex-wrap mx-[-12px] md:text-left text-center'>
                        <div className='  md:order-2 md:mb-0 md:flex-[0_0_auto] px-[12px] md:w-[50%] max-w-[100%]'>
                            <div className='flex flex-wrap text-left mx-[-12px]'>
                                <div className='uppercase text-left px-[12px] mb-[8px] w-[50%] leading-[35px] '>
                                    <p className='sm:text-[25px] text-[30px] text-[#16123F] font-[500] mb-[16px] leading-[37.5px]'>
                                        info
                                    </p>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        getting started
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        buy CCX
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        Tiers system
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        roadmap
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        apply for ido
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        terms and conditions
                                    </a>
                                </div>
                                <div className='uppercase leading-[35px] text-left px-[12px] mb-[48px] w-[50%]'>
                                    <p className='sm:text-[25px] text-[20px] text-[#16123F] font-[500] mb-[16px] leading-[37.5px]'>
                                        products
                                    </p>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        ido launchpad
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        token swap
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        dex for trading
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        token staking
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        lottery giveaway
                                    </a>
                                    <a href='#' className='block cursor-pointer text-[14px] md:text-[18px] font-[300] '>
                                        token vesting
                                    </a>
                                </div>
                            </div>
                            <div className='block mt-[24px]  text-[16px] leading-[24px] text-left max-w-[100%] font-[400] '>
                                <div className='leading-[37.5px] text-[25px] font-[500] text-[#16123F]'>
                                    <strong>Powered by: ChainCircle</strong>
                                </div>
                            </div>
                        </div>
                        <div className='block md:mt-[0px] mt-[8px] text-left  md:flex-[0_0_auto] max-w-[100%]  md:order-1 px-[12px] md:w-[50%]'>
                            <div className='mb-[4px] flex  justify-start  '>
                                <Image src={logo1} alt='pix' width={250} height={50} className='h-[70px] w-[150px] align-middle text-center sm:text-left' />
                            </div>
                            <p className='mt-[30px] mb-[16px] md:mb-[48px] text-[25px] font-[600] leading-[35px]  text-left'>
                                Diversifying<br />
                                Decentralized Finances
                            </p>
                            <div className='font-[500] text-[25px] cursor-pointer text-[#16123F]'>
                                CONNECT
                            </div>
                            <div className='mb-[8px]'>
                                <div className='inline-block '>
                                    <a className='ml-[-3px] inline-flex w-[50px] items-center justify-center mt-[20px] h-[40px] mr-[10px] text-start cursor-pointer decoration-[rgb(255,255,255)]' href="https://t.me/cfg" title="Telegram" >
                                        <SocialIcon style={{ width: '40px', height: '40px' }} bgColor="#16123F" url='https://t.me/' />
                                    </a>
                                    <a className='inline-flex mt-[20px] w-[50px] h-[40px] mr-[10px] text-center cursor-pointer' href="https://twitter.com/" title="Twitter" >
                                        <SocialIcon style={{ width: '40px', height: '40px' }} bgColor="#16123F" url='https://twitter.com/' />
                                    </a>
                                    <a className='inline-flex w-[50px] mt-[20px] h-[40px] mr-[10px] text-center cursor-pointer' href="https://www.linkedin.com/" title="Linkedin" >
                                        <SocialIcon style={{ width: '40px', height: '40px' }} bgColor="#16123F" url='https://www.linkedin.com/' />
                                    </a>
                                    <a className='inline-flex w-[50px] mt-[20px] h-[50px] mr-[10px] text-center cursor-pointer' href="https://medium.com/" title="medium" >
                                        <SocialIcon style={{ width: '40px', height: '40px' }} bgColor="#16123F" url='https://www.medium.com/' />
                                    </a>
                                </div>

                            </div>
                            <div className='flex md:justify-start justify-center mx-auto '>
                                <div className='text-[16px] font-[400]'>
                                    <a href ='chaincircle@gmail.com' className='bg-[#16123F] items-center justify-center flex cursor-pointer  lg:w-[193px] w-[120px] text-[rgb(255,255,255)] lg:text-[18px] text-[16px] font-[300] leading-[35px] mr-[20px] py-[8px] px-[16px] rounded-[3px]' >
                                        <span className='text-center'>Email</span>
                                    </a>
                                </div>
                                <div>
                                    <a className='bg-[#16123F] cursor-pointer flex justify-center lg:w-[193px] w-[120px] text-[rgb(255,255,255)] lg:text-[18px] text-[16px] font-[300] leading-[35px] mr-[20px] py-[8px] px-[16px] rounded-[3px] ' href='#'>
                                        <span className='text-center'>Press Kit</span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='mt-[45px] pb-[24px] justify-center item-center mx-[-12px] flex flex-wrap text-center text-[16px] font-[400]'>
                        <div className='uppercase text-[14px] font-[300] max-w-[100%] text-center leading-[21px] text-[rgb(153,153,153)] '>
                            Copyright 2024 &copy; ChainCircle. All rights reserved.
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Footers