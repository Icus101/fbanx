import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Link from 'next/link'
import React from 'react'

const Header2 = () => {
    return (
        <div>
            <div className='flex justify-between items-center px-[15px] py-[20px]'>
                <div>
                    <Link href='/'>

                        Logo

                    </Link>

                </div>
                <nav className='flex'>
                    <div className='mr-[10px]'>
                        <Link href='/swap'>
                            Swap
                        </Link>

                    </div>
                    <div className='mr-[10px]'>
                        <Link href='/liquidity'>
                            Liquidity
                        </Link>
                    </div>
                    <div className='mr-[10px]'>
                        <Link href='/pool'>
                            Pools
                        </Link>
                    </div>
                </nav>
                
                
            </div>
        </div>
    )
}

export default Header2