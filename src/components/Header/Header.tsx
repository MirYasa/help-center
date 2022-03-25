import React from 'react'
//@ts-ignore
import AlgbLogo from '../../assets/images/logo.svg'
import './index.scss'
import {graphql, Link, useStaticQuery} from "gatsby"
// @ts-ignore
import {useBreadcrumb} from 'gatsby-plugin-breadcrumb'
import BreadCrumbs from "../BreadCrumbs"
import LangToggle from '../LangToggle'
import SearchBar from '../Search'
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import {ArrowRight} from 'react-feather'

interface HeaderProps {
    location: any
    isHome?: boolean
    pageContex?: any
    setSearchQuery: any
    searchQuery: any
    searchedResaults: any

}

export default function Header({location, isHome, searchQuery, setSearchQuery, searchedResaults}: HeaderProps) {

    return (
        <>
            <header className={'header'}>
                <div className={'header-right'}>
                    <Link to={'/'}>
                        <img src={AlgbLogo} alt="Logo"/>
                    </Link>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        posts={searchedResaults}
                    />
                </div>
                <div className={'header-right'}>
                    <LangToggle/>
                    <a href="https://app.algebra.finance/#/swap" target={'_blank'} style={{display: 'flex', alignItems: 'center'}}>Launch App <ArrowRight color={'white'}/></a>
                </div>
            </header>
            <BreadCrumbs crumbs={location} isHome={isHome}/>
        </>
    )
}