import React from 'react'

interface Props{
    tokenValue : number
    showToken2 : () => void
    showState : boolean
}

const Token2 = ({tokenValue,showToken2,showState}:Props) => {
    return (
        <div  className={`${showState ? '' : 'hide_side'}`}>
            <input
                type="number"
                placeholder="1000"
                className="bg-transparent border border-[rgb(29,234,183,0.14)] rounded-md outline-none w-3/5 md:w-2/3 p-2 opacity-[0.6]"
                value={tokenValue}
                readOnly
                // onChange={handleValue}
            />
        </div>
    )
}

export default Token2