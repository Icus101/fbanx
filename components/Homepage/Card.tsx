import React from 'react'
import Image from 'next/image'
import Cardprops from './Cardprops'

const Card = () => {
    return (
        <div className=' text-white font-[400] box-border pt-[50px] pb-[100px] '>
            <div className='container  2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] mx-[auto] px-[12px] '>
                <div className='text-[30px] sm:text-[50px] font-[700] text-center leading-[48px] mb-[24px]'>
                    TOKENOMICS
                </div>
                <p className=' m-auto italic sm:text-[20px] text-[16px] max-w-[793px] font-[300] text-center  mx-auto leading-[24px]'>
                    CCX&apos;S tiered system will help determine the user pool weight for guaranteed token allocation in a fair and decentralized manner.
                </p>
                <div className='flex justify-center flex-wrap items-center text-start mt-[48px] mx-[-12px] leading-[24px] font-[400] text-[16px] '>
                    <div className='px-[12px] shrink-0 max-w-[100%] lg:w-[83.333333%] md:w-[83.333333%]'>
                        <div className='flex flex-wrap justify-center mx-[-12px] text-start'>
                            <Cardprops tier="TOTAL SUPPLY" percent="10B" or="50000" lp="44000" />
                            <Cardprops tier="TEAM ENTRY " percent="5%" or="50000" lp="44000" />
                            <Cardprops tier="FOUNDATIONAL INVESTORS" percent="5%" or="26000" lp="22000" />
                            <Cardprops tier="PRESALES" percent="5%" or="14000" lp="12000" />
                            <Cardprops tier="MARKETING" percent="5%" or="14000" lp="12000" />
                            <Cardprops tier="LIQUIDITY" percent="30%" or="14000" lp="12000" />
                            <Cardprops tier="LIQ FOR FUTURE DEX" percent="50%" or="14000" lp="12000" />
                        </div>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default Card