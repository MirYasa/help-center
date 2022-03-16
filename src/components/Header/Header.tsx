import React from 'react'
//@ts-ignore
import AlgbLogo from '../../assets/images/logo.svg'
import './index.scss'
import {Link} from "gatsby"
// @ts-ignore
import { useBreadcrumb } from 'gatsby-plugin-breadcrumb'
import BreadCrumbs from "../BreadCrumbs"

export default function Header({location, label}: any) {
    const { crumbs } = useBreadcrumb({
        location,
        crumbLabel: label,
        crumbSeparator: ' / ',
    })

    return (
        <>
            <header className={'header'}>
                <Link to={'/'}>
                    <img src={AlgbLogo} alt="Logo"/>
                </Link>
                <a href="https://app.algebra.finance/#/swap" target={'_blank'}>Launch App</a>
            </header>
            <BreadCrumbs crumbs={crumbs}/>

        </>
    )
};