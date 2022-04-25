import * as React from "react"
import '../../assets/styles/index.scss'
import Header from '../Header'
import './index.scss'
import {Book, Download, HelpCircle, Layers, RefreshCcw, Shield, ShoppingCart} from "react-feather"
import CategoryBlock from "../CategoryBlock"
import Footer from "../Footer"
import {Helmet} from 'react-helmet'
import useLocale from "../../hooks/useLocale"
import {graphql, Link} from "gatsby"
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import Hero from "../../sections/Hero"
import ContactForm from "../ContactForm"
import { isBrowser } from "../../utils/isBrowser"

import HackenLogo from '../../assets/images/hacken-logo.svg'
import DiscordLogo from '../../assets/images/discord-logo.svg'
import TwitterLogo from '../../assets/images/twitter-logo.svg'
import TelegramLogo from '../../assets/images/telegram-logo.svg'
import YoutubeLogo from '../../assets/images/youtube-logo.svg'
import MeidumLogo from '../../assets/images/medium-logo.svg'
import RedditLogo from '../../assets/images/reddit-logo.svg'

import GettingStartedIcon from '../../assets/images/getting-started-icon.svg'
import LiquidityIcon from '../../assets/images/liquidity-icon.svg'
import FarmingIcon from '../../assets/images/farming-icon.svg'
import StakingIcon from '../../assets/images/staking-icon.svg'
import TechPaperIcon from '../../assets/images/tech-paper-icon.png'

const categories = [
    {
        title: {
            'en': 'Getting Started',
            'ru': 'Начало работы',
            'es': 'Cómo empezar',
        },
        icon: GettingStartedIcon,
        chips: [
            'Algebra',
            'Connect Wallet',
            'Swap Crypto',
            'Transactions'
        ],
        description: {
            'en': 'Learn the basics about the Algebra',
            'ru': 'Узнайте основные сведения об Алгебре',
            'es': 'Aprenda lo básico sobre el álgebra',
        },
        category: 'getting-started'
    },
    {
        title: {
            'en': 'Liquidity',
            'ru': 'Ликвидность',
            'es': 'Liquidez',
        },
        icon: LiquidityIcon,
        chips: [
            'Concentrated Liquidity',
            'Impermanent Loss',
            'Price Range'
        ],
        description: {
            'en': 'Learn how to provide liquidity and earn high rewards on Algebra',
            'ru': 'Узнайте, как получать доходность, предоставляя ликвидность по алгебре',
            'es': 'Aprenda a obtener rendimiento proporcionando liquidez en el Álgebra',
        },
        category: 'liquidity'
    },
    {
        title: {
            'en': 'Farming',
            'ru': 'Фарминг',
            'es': 'Farming',
        },
        icon: FarmingIcon,
        chips: [
            'Infinite Farms',
            'Limit Farms',
            'Rewards'
        ],
        description: {
            'en': 'Learn how to earn high APR by farming tokens on Algebra',
            'ru': 'Узнайте как выращивать криптовалюту?',
            'es': 'Learn the basics about the Algebra',
        },
        category: 'farm'
    },
    {
        title: {
            'en': 'Staking',
            'ru': 'Стейкинг',
            'es': 'Staking',
        },
        icon: StakingIcon,
        chips: [
            'Staking',
            'Risks',
            'Withdrawal'
        ],
        description: {
            'en': 'Learn how to make your idle crypto work for you on Algebra',
            'ru': 'Узнайте как обменивать токены на Алгебре',
            'es': 'Aprende a intercambiar fichas en Álgebra',
        },
        category: 'stake'
    },
]

interface IndexPageProps {
    location: Location
    pageContext?: any
    data: any

}

const IndexPage = ({location, pageContext, data: {localSearchPages: {index, store}}}: IndexPageProps) => {

    const {lang} = useLocale()

    React.useEffect(() => {

        if (!isBrowser()) return

        const [, _lang] = window.location.pathname.split('/')

        if (lang !== _lang) {
            window.location.href = `http://${window.location.host}/${lang}/`
        }

    }, [])

    const [searchQuery, setSearchQuery] = React.useState('')
    const results = useFlexSearch(searchQuery, index, store, {language: 'en'})

    return (
        <>
            <Helmet>
                <title>Algebra Help Center</title>
            </Helmet>
            <Header
                location={pageContext.breadcrumb.crumbs}
                isHome
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchedResaults={results}/>
            <Hero searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchedResaults={results}/>
            <section className={'container categories-container full-w'}>
                <h2 className="container-title" style={{color: '#2629d7'}}>Categories</h2>
                <div className="categories-wrapper full-w">
                {categories.map((el, i) => {
                    return <CategoryBlock
                        // @ts-ignore
                        title={el.title[lang]}
                        category={el.category}
                        // @ts-ignore
                        description={el.description[lang]}
                        articles={pageContext.categoriesData.filter( (_el: any) => _el.frontmatter.category === el.category && _el.frontmatter['Is_FAQ'] !== '1' )}
                        icon={el.icon}
                        chips={el.chips}
                        key={i}/>
                }
                )}
                </div>
            </section>
            <section className="container docs-container full-w">
                <div className="docs-wrapper">
                    <div className="docs-wrapper__block">
                        <h3>Documents</h3>
                        <div className="docs-wrapper__block-items f ac">
                            <Link download to={'https://algebra.finance/static/Algebra_Tech_Paper-51ff302b23209d0432e2453dbd9649a8.pdf'} className="audit-chip f m-r-1">
                                <div className="tech__img f ac jc">
                                    <div className="tech__img-icon" style={{backgroundImage: `url(${TechPaperIcon})`}}></div>
                                </div>
                                <div className="m-l-1">
                                    <div className="b" style={{color: 'black'}}>Tech paper</div>
                                  <div style={{color: '#afafaf'}}>Algebra v1.6</div>
                                </div>
                            </Link>

                            <Link download to={'https://algebra.finance/static/Hacken_Algebra_Audit-317911476f86c632be77388fa51852c0.pdf'} className="audit-chip f m-r-1">
                                <img src={HackenLogo} width="40" height="40" />
                                <div className="m-l-1">
                                    <div className="b" style={{color: 'black'}}>Hacken audit</div>
                                  <div className="f ac jc" style={{color: '#1ab147'}}>
                                      <span><Shield style={{display: 'block', marginRight: '4px'}} size={'16px'} /></span>
                                      <span>Well-secured</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="community-wrapper__block">
                        <h3>Community</h3>
                        <div className="community-wrapper__block-items f ac">
                            <Link to={'https://discord.gg/MneScXrq6T'} target={'_blank'} rel={'noreferrer noopenet'} className="community-chip scale f">
                                <img src={DiscordLogo} width="40" height="40" />
                            </Link>
                            <Link to={'https://twitter.com/CryptoAlgebra'} target={'_blank'} rel={'noreferrer noopenet'} className="community-chip scale f">
                                <img src={TwitterLogo} width="40" height="40" />
                            </Link>
                            <Link to={'https://t.me/cryptoalgebra_chat'} target={'_blank'} rel={'noreferrer noopenet'} className="community-chip scale f">
                                <img src={TelegramLogo} width="40" height="40" />
                            </Link>
                            <Link to={'https://www.youtube.com/channel/UCCeQt4pAAQ-DDdRAEF2hwhQ'} target={'_blank'} rel={'noreferrer noopenet'} className="community-chip scale f">
                                <img src={YoutubeLogo} width="40" height="40" />
                            </Link>
                            <Link to={'https://medium.com/@crypto_algebra'} target={'_blank'} rel={'noreferrer noopenet'} className="community-chip scale f">
                                <img src={MeidumLogo} width="40" height="40" />
                            </Link>
                            <Link to={'https://www.reddit.com/r/CryptoAlgebra/'} target={'_blank'} rel={'noreferrer noopenet'} className="community-chip scale f">
                                <img src={RedditLogo} width="40" height="40" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default IndexPage

export const query = graphql`
        {
            localSearchPages {
                index
                store
            }
        }
    `