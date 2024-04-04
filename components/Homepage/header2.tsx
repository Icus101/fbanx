import React, { useState } from 'react'
import * as FaIcons from "react-icons/fa"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Sidebar from './Sidebar'

const Header2 = () => {
    const [Navbar, setNavBar] = useState(false);

    const showSidebar = () => {
        // const over = document.getElementById('over')!;
        // if (sidebar) {
        //     over.classList.add('overlay_show')
        // } else {
        //     over.classList.remove('overlay_show')
        // }

        setNavBar(!Navbar)
    }



    return (
        <div className='pb-[30px]'>
            <header className='px-[30px] py-[14px] fixed top-0 w-[100%] z-[100] flex justify-between items-center bg-[#16123F]  '>
                <div >
                    <FaIcons.FaBars size={'2em'} onClick={showSidebar} />
                </div>
                <div>
                    <ul className='flex justify-end items-center text-[16px] font-[400]'>

                        <WalletMultiButton style={{backgroundColor : '#1adcab', padding : '10px_22px', borderRadius :'12px'}} />
                    </ul>
                </div>

            </header>

            <Sidebar sidebar={Navbar} showSidebar={showSidebar} />

        </div>

    )
}

export default Header2