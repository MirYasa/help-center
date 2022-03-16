import React from 'react'
//@ts-ignore
import AlgbLogo from '../../assets/images/logo.svg'
import './index.scss'
import {Link} from "gatsby"

export default function Header() {
    return (
        <header className={'header'}>
            <Link to={'/'}>
                <img src={AlgbLogo} alt="Logo"/>
            </Link>
            <a href="https://app.algebra.finance/#/swap" target={'_blank'}>Launch App</a>
        </header>
    )
};