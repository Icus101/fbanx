import React from 'react'
import Header from "../components/Apppage/Header";
import StartEscrow from '../components/Escrow/StartEscrow';
import Header2 from '../components/Homepage/header2';

const escrow = () => {
  return (
    <div className='min-h-screen'>
        <Header/>
        <StartEscrow/>
    </div>
  )
}

export default escrow