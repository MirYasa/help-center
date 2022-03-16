import React from 'react'
import './index.scss'
// @ts-ignore
import logo from '../../assets/images/logo.svg'

export default function Footer() {
    return (
        <footer className={'footer'}>
            <img src={logo} alt="Algebra Finance Logo"/>
            <a href="https://app.algebra.finance/#/swap" target="_blank">App</a>
        </footer>
    )
};