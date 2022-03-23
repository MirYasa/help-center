import React from 'react'
//@ts-ignore
import AlgbLogo from '../../assets/images/logo.svg'
import './index.scss'
import {Link} from "gatsby"
// @ts-ignore
import {useBreadcrumb} from 'gatsby-plugin-breadcrumb'
import BreadCrumbs from "../BreadCrumbs"
import LangToggle from '../LangToggle'

interface HeaderProps {
    location: Location
    isHome?: boolean
    pageContex?: any
}

export default function Header({location, isHome}: HeaderProps) {

    return (
        <>
            <header className={'header'}>
                <Link to={'/'}>
                    <img src={AlgbLogo} alt="Logo"/>
                </Link>
                <div className={'header-right'}>
                    <LangToggle/>
                    <a href="https://app.algebra.finance/#/swap" target={'_blank'}>Launch App</a>
                </div>
            </header>
            <BreadCrumbs crumbs={location} isHome={isHome}/>
        </>
    )
}