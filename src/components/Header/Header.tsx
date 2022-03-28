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

}

export default function Header({location, isHome, searchQuery, setSearchQuery, searchedResaults}: HeaderProps) {

    const {lang} = useLocale()

    return (
        <>
            <header className={'header'}>
                <div className={'header-row'}>
                    <div className={'header-left'}>
                        <Link to={'/'}>
                            <img src={AlgbLogo} alt="Logo"/>
                        </Link>
                        {window.innerWidth > 500 &&
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                posts={searchedResaults}
                            />
                        }
                    </div>
                    <div className={'header-right'}>
                        {/*<LangToggle/>*/}
                        <a
                            href="https://app.algebra.finance/#/swap"
                            target={'_blank'}
                            style={{display: 'flex', alignItems: 'center'}}>
                            {/*//@ts-ignore*/}
                            {toApp[lang]}
                            <ArrowRight size={'1rem'}/>
                        </a>
                    </div>
                </div>
                {window.innerWidth < 501 &&
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        posts={searchedResaults}
                    />
                }
            </header>
            <BreadCrumbs crumbs={location} isHome={isHome}/>
        </>
    )
}