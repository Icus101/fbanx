import React from 'react'

import {AiOutlineHome} from 'react-icons/ai'
import {BiRocket} from 'react-icons/bi'
import {GiStakesFence} from 'react-icons/gi'
import {MdOutlinePerson} from 'react-icons/md'
import {MdSwapVert} from 'react-icons/md'
import {MdOutlineGames} from 'react-icons/md'
import {AiFillDollarCircle} from 'react-icons/ai'
import {FaWallet} from 'react-icons/fa'
import {GiTrade} from 'react-icons/gi'
import {MdOutlineContactSupport} from 'react-icons/md'

export const SideBardata = [
    {
        title : 'Home',
        path : '/',
        icons : AiOutlineHome ,
    },
    {
        title : 'Swap',
        path : '/appL',
        icons : BiRocket
    },
    {
        title : 'Create Token',
        path : '/createToken',
        icons : GiStakesFence
    },
    {
        
        title : 'Escrow',
        path : '/escrow',
        icons : MdOutlinePerson
    },
    {
        
        title : 'Staking',
        path : '/stake',
        icons : MdOutlinePerson
    },
    {
        title : 'Liquidity Pool Locker',
        path : '/play',
        icons : GiStakesFence
    },
    {
        title : 'Unstaking',
        path : '/apply',
        icons : GiStakesFence
    },
    {
        title : 'Withdraw',
        path : '/email',
        icons : AiFillDollarCircle
    },
    {
        title : 'Swap',
        path : '/jobs',
        icons : MdSwapVert
    },
    {
        title : 'Lottery',
        path : '/jobss',
        icons : MdOutlineGames
    },
    {
        title : 'Wallet Details',
        path : '/jobsss',
        icons : FaWallet
    },
    {
        title : 'Trading',
        path : '/jobssss',
        icons : GiTrade
    },
    {
        title : 'Customer Support',
        path : '/jobsssss',
        icons : MdOutlineContactSupport
    },
]