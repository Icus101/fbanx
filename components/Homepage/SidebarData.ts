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
        title : 'IDO Launchpad',
        path : '/',
        icons : BiRocket
    },
    {
        title : 'Staking Statistics',
        path : '/up',
        icons : GiStakesFence
    },
    {
        title : 'Personal Statistics',
        path : '/stake',
        icons : MdOutlinePerson
    },
    {
        title : 'Staking',
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
        path : '/jobs',
        icons : MdOutlineGames
    },
    {
        title : 'Wallet Details',
        path : '/jobs',
        icons : FaWallet
    },
    {
        title : 'Trading',
        path : '/jobs',
        icons : GiTrade
    },
    {
        title : 'Customer Support',
        path : '/jobs',
        icons : MdOutlineContactSupport
    },
]