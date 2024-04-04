import Image from 'next/image'
import React, { Children } from 'react'

interface Props{
    imgurl : string,
    summary : string
    children: JSX.Element
}



const SolutionCard = ({imgurl,summary,children}:Props) => {
    return (
        <div className='box-border shrink-0 mb-[48px] max-w-[100%] px-[12px] lg:w-[33.33333333%] md:w-[50%]'>
            <div className='p-[45px] border-[1px] rounded-[20px] border-[rgb(29,234,83,0.14)] h-[100%] '>
                <div className='mb-[4px] flex justify-center'>
                    <Image className=" max-w-[100%] align-middle" src={imgurl} alt='image' width='100' height="50" />
                </div>
                <div className='my-[30px] box-border text-[25px] font-[700] text-center leading-[35px] text-[#FFFF]'>
                    {children}
                </div>

                <p className='text-[16px] mb-[16px] font-[300] text-center leading-[30px]'>
                    {summary}
                </p>
            </div>

        </div>
    )
}

export default SolutionCard