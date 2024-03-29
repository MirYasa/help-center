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

    const {lang} = useLocale()

    return (
        <>
            <header className={`header ${isHome ? 'home' : ''}`}>
                <div className={'header-row'}>
                    <div className={'header-left'}>
                        <Link to={'/'}>
                        <svg width="150" height="34" viewBox="0 0 150 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M0 30.5438L14.2012 2.3064V21.3824L0 30.5438Z" fill="#EF359E"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.6743 22.041L0.473145 31.2025H28.8755L14.6743 22.041Z" fill="#2797FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M15.1472 2.3064L29.3484 30.5438L15.1472 21.3824V2.3064Z" fill="#0EFBDF"/>
<path d="M37.0356 25.7256H40.2714L41.7336 21.2781H48.1691L49.6313 25.7256H52.8789L46.6951 8.52001H43.2195L37.0356 25.7256ZM44.9214 11.5844H44.9932L47.3902 18.9053H42.5125L44.9214 11.5844ZM55.2154 25.7256H66.1571V23.1382H58.3074V8.52001H55.2154V25.7256ZM75.7441 26.0237C80.4779 26.0237 83.2822 23.2217 83.2822 18.5477V16.6877H75.9718V19.0842H80.2621L80.2502 19.3466C80.1903 21.7552 78.3925 23.3529 75.7801 23.3529C72.6641 23.3529 70.7106 20.9801 70.7106 17.0334V17.0215C70.7106 13.1583 72.5802 10.8928 75.6962 10.8928C77.8173 10.8928 79.3154 11.9659 79.9745 13.814L80.0105 13.9452H83.1504L83.1024 13.7544C82.4433 10.5828 79.7828 8.22192 75.6841 8.22192C70.6987 8.22192 67.5588 11.5844 67.5588 17.0453V17.0573C67.5588 22.6136 70.6987 26.0237 75.7441 26.0237ZM86.3017 25.7256H97.4952V23.1382H89.3938V18.2377H97.0517V15.7456H89.3938V11.1074H97.4952V8.52001H86.3017V25.7256ZM100.671 25.7256H107.921C111.612 25.7256 113.853 23.8656 113.853 20.8608V20.837C113.853 18.5715 112.199 16.8784 109.767 16.6637V16.6042C111.624 16.3538 113.026 14.6964 113.026 12.8483V12.8244C113.026 10.2131 111.001 8.52001 107.849 8.52001H100.671V25.7256ZM107.07 10.9166C108.904 10.9166 109.97 11.7513 109.97 13.2417V13.2656C109.97 14.8872 108.772 15.7933 106.543 15.7933H103.763V10.9166H107.07ZM107.034 18.023C109.455 18.023 110.701 18.9293 110.701 20.6581V20.6821C110.701 22.4109 109.479 23.3289 107.214 23.3289H103.763V18.023H107.034ZM116.549 25.7256H119.641V19.287H122.985L126.388 25.7256H129.912L126.137 18.822C128.15 18.0946 129.396 16.2226 129.396 13.9094V13.8856C129.396 10.5589 127.143 8.52001 123.452 8.52001H116.549V25.7256ZM119.641 16.8545V11.012H123.069C125.01 11.012 126.233 12.109 126.233 13.9094V13.9333C126.233 15.7814 125.082 16.8545 123.129 16.8545H119.641ZM131.182 25.7256H134.417L135.879 21.2781H142.315L143.777 25.7256H147.025L140.841 8.52001H137.366L131.182 25.7256ZM139.067 11.5844H139.139L141.536 18.9053H136.658L139.067 11.5844Z" fill={isHome ? 'white' : `#383838`}/>
</svg>
                        </Link>
                        {/* {window.innerWidth > 500 &&
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                posts={searchedResaults}
                            />
                        } */}
                    </div>
                    <div className={'header-right'}>
                        {/* <LangToggle/> */}
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
            {/* {
                breadcrumbs &&
                <BreadCrumbs crumbs={location} isHome={isHome}/>
            } */}
        </>
    )
}