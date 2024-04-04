import Link from 'next/link'
import React, { useState } from 'react'
import * as AiIcons from "react-icons/ai"
import { NavBardata } from './NavBardata'

interface Props{
    sidebar : boolean,
    showSidebar : () => void
}

const Navpop = ({sidebar, showSidebar}:Props) => {
    return (
        <div className=''>
            <nav className={`nav ${sidebar ? 'nav__appear_show' : 'nav__appear'}`}>
                <ul className='nav-bar-items'>
                    <li className='flex justify-center' >
                        <Link href='#' className='text-[#fff] mb-[4px] visible'>
                            <AiIcons.AiOutlineClose size={'3em'} onClick={showSidebar}/>
                        </Link>
                    </li>
                    {NavBardata.map((item, index) => {
                        return (
                            <li key={index} className='py-[12px] pr-[100px] text-[16px] tracking-[0.5px] font-[400] leading-[24px] ml-[40px]'>
                                <Link href={item.path}>
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>

    )
}

export default Navpop