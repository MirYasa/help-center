import React from 'react'
//@ts-ignore
import AlgbLogo from '../../assets/images/logo.svg'
import './index.scss'
import {Link} from "gatsby"
// @ts-ignore
import {useBreadcrumb} from 'gatsby-plugin-breadcrumb'
import BreadCrumbs from "../BreadCrumbs"
import LangToggle from '../LangToggle'

import {LanguageContext} from '../../context/LanguageContext'

interface HeaderProps {
    location: any
    label: string
    isHome?: boolean
}

export default function Header({location, label, isHome}: HeaderProps) {

    const {crumbs} = useBreadcrumb({
        location,
        crumbLabel: label,
        crumbSeparator: ' / ',
    })

    const [language, setLanguage] = React.useState('en')

    console.log(language)

    return (
        // @ts-ignore
        <LanguageContext.Provider value={{language, setLanguage}}>
            <header className={'header'}>
                <Link to={'/'}>
                    <img src={AlgbLogo} alt="Logo"/>
                </Link>
                <div className={'header-right'}>
                    <LangToggle/>
                    <a href="https://app.algebra.finance/#/swap" target={'_blank'}>Launch App</a>
                </div>
            </header>
            <BreadCrumbs crumbs={crumbs} isHome={isHome}/>
        </LanguageContext.Provider>
    )
};