import React from 'react'
//@ts-ignore
import AlgbLogo from '../../assets/images/logo.svg'
import './index.scss'
import {Link} from "gatsby"
// @ts-ignore
import {useBreadcrumb} from 'gatsby-plugin-breadcrumb'
import BreadCrumbs from "../BreadCrumbs"
import LangToggle from '../LangToggle'
import SearchBar from '../Search'
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import {toApp} from '../../i18n'
import useLocale from '../../hooks/useLocale'
import {ArrowRight} from 'react-feather'

interface HeaderProps {
    location: any
    isHome?: boolean
    pageContex?: any
    setSearchQuery: any
    searchQuery: any
    searchedResaults: any
    breadcrumbs?: boolean
}

export default function Header({location, isHome, searchQuery, setSearchQuery, searchedResaults, breadcrumbs}: HeaderProps) {

    // const {lang} = useLocale()

    return (
        <>
            <header className={'header'}>
                <div className={'header-row'}>
                    <div className={'header-left'}>
                        <Link to={'/'}>
                            <img src={AlgbLogo} alt="Logo"/>
                        </Link>
                        <span style={{color: 'white', position: 'absolute', right: 0, bottom: '-10px', userSelect: 'none', fontStyle: 'italic' }}>help center</span>
                        {/* {window.innerWidth > 500 &&
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                posts={searchedResaults}
                            />
                        } */}
                    </div>
                    <div className={'header-right'}>
                        <LangToggle/>
                        <a
                            href="https://app.algebra.finance/#/swap"
                            target={'_blank'}
                            style={{display: 'flex', alignItems: 'center', backgroundColor: '#36f', padding: '8px 12px', borderRadius: '8px'}}>
                            {/*//@ts-ignore*/}
                            {toApp[lang]}
                            <span className="m-l-05">→</span>
                        </a>
                    </div>
                </div>
                {/* {window.innerWidth < 501 &&
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        posts={searchedResaults}
                    />
                } */}
            </header>
            {
                breadcrumbs &&
                <BreadCrumbs crumbs={location} isHome={isHome}/>
            }
        </>
    )
}