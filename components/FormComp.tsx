import React from 'react'
import { Fees } from './Form'

interface Props {
    label: string,
    value: number,
    handleChange: (e: React.FormEvent) => void

}

const FormComp = ({ value, label, handleChange }: Props) => {
    return (
        <div className=''>
            <form >
                <label>{label}:</label><br/>
                <input value={value} type="number"
                    required
                    onChange={handleChange}
                    className='border-[1px] border-[red] w-[100%] p-[12px_20px] m-[8px_0] box-border rounded-[4px]' />
            </form>
        </div>



    )
}

export default FormComp