import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import * as AiIcons from "react-icons/ai"
import { SocialIcon } from 'react-social-icons'
import { SideBardata } from './SidebarData'

interface Props {
    sidebar: boolean,
    showSidebar: () => void
}

const Sidebar = ({ sidebar, showSidebar }: Props) => {
    return (
        <div  className={`sidebarpop ${sidebar ? 'show_side' : ''}`}>
            <div className='flex flex-col h-[100%] relative'>
                <div>
                    <Link href='#' className='flex items-center max-w-[156px] m-[30px_auto]'>
                        <Image src='/nobg5.png' alt='' width={50} height={50} className='h-auto max-w-[100%] align-middle' />
                        <h3 className='ml-[5px] tracking-[1.4px] text-[28px] leading-[33.6px]'>CFB</h3>
                    </Link>

                    <ul className='ml-[5px]'>
                        <li className='flex justify-center' >
                            <Link href='#' className='text-[#fff] mb-[4px] absolute top-0 right-0'>
                                <AiIcons.AiOutlineClose size={'3em'} onClick={showSidebar} />
                            </Link>
                        </li>
                        {SideBardata.map((item, index) => {
                            return (
                                <li key={index} className='text-[16px] font-[400] text-left'>
                                    <Link href={item.path} className='hover:bg-[#031736] hover:text-[#1ADCAB] flex items-center p-[10px_15px] rounded-[10px] w-[100%] text-[16px] font-[400]'>
                                        <span className='mr-[15px] w-[22px] align-middle'>{<item.icons/>}</span>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className='text-center mt-[auto] px-[15px] pt-[15px] pb-[13px]'>
                    <div className='text-[16px] text-[#a5a5a5] font-[400] leading-[20.8px] mb-[12px] text-center'>
                        Made with{" "}
                        <span className='text-[red]'>♥</span> by {" "}
                        <span>CFB</span>
                    </div>
                    <div className='flex justify-center items-center  '>
                        <a className=' w-[50px] mt-[20px] h-[40px] mr-[10px]  cursor-pointer decoration-[rgb(255,255,255)]' href="https://t.me/cfg" title="Telegram" >
                            <SocialIcon style={{ width: '30px', height: '30px' }} bgColor='#fff' url='https://t.me/cfg' />
                        </a>
                        <a className=' mt-[20px] w-[50px] h-[40px] mr-[5px] text-center cursor-pointer' href="https://twitter.com/cfg" title="Twitter" >
                            <SocialIcon style={{ width: '30px', height: '30px' }} bgColor='#fff' url='https://twitter.com/cfb7777' />
                        </a>
                        <a className=' w-[50px] mt-[20px] h-[40px] mr-[5px] text-center cursor-pointer' href="https://www.linkedin.com/cfg" title="Linkedin" >
                            <SocialIcon style={{ width: '30px', height: '30px' }} bgColor='#fff' url='https://www.linkedin.com/cfg' />
                        </a>
                        <a className=' w-[50px] mt-[20px] h-[40px] mr-[5px] text-center cursor-pointer' href="https://medium.com/cfg" title="medium" >
                            <SocialIcon style={{ width: '30px', height: '30px' }} bgColor='#fff' url='https://www.medium.com/cfg' />
                        </a>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default Sidebar