import React from 'react'

const Disclaimer = () => {
  return (
    <div className=''>
        <div className='pb-[48px]'>
            <div className='container m-auto 2xl:max-w-[1320px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[768px] sm:max-w-[540px] px-[12px]'>
                <hr className='bg-[rgb(168,109,222)] h-[1px]'/>
                <div className='mt-[48px] mx-[-12px] flex items-center flex-wrap'>
                    <div className='px-[12px] md:flex-[0_0_auto] md:w-[100%] max-w-[100%]'>
                        <div className='mb-[24px] text-[20px] sm:text-[30px] font-[700] leading-[33px] text-[#16123F] flex items-center uppercase'>
                            <img src='information-icon.png' alt='info' className='m-[16px] max-w-[100%] h-auto w-[30px]'/>
                            Disclaimer for investors
                        </div>
                        <p className='text-[rgb(153,153,153)] text-[20px] italic font-[300] leading-[30px]'>
                        Cryptocurrency investment is subject to high market risk. ChainCircle Finance is not responsible for any of your crypto losses. Please do not construe any of the above statements as to financial advice.
                        </p>

                    </div>

                </div>
 
            </div>

        </div>

    </div>
  )
}

export default Disclaimer