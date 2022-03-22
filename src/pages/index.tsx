import * as React from "react"
import '../assets/styles/index.scss'
import Header from "../components/Header/Header"
import './index.scss'
import {Book, Download, HelpCircle, RefreshCcw} from "react-feather"
import CategoryBlock from "../components/CategoryBlock"
import Footer from "../components/Footer"
import {Helmet} from 'react-helmet'
import I18NProvider from "../components/i18n"

const categories = [
    {
        title: 'Getting Started',
        icon: <Book size={'4rem'}/>,
        description: 'Learn the basics about the Algebra',
        category: 'getting-started'
    },
    {
        title: 'Swap',
        icon: <RefreshCcw size={'4rem'}/>,
        description: 'Learn how to swap tokens on Algebra',
        category: 'swap'
    },
    {
        title: 'Provide Liquidity',
        icon: <Download size={'4rem'}/>,
        description: 'Learn how to earn yield by providing liquidity on Algebra',
        category: 'liquidity'
    },
    {
        title: 'FAQ',
        icon: <HelpCircle size={'4rem'}/>,
        description: 'Frequently asked questions',
        category: 'faq'
    }
]

const IndexPage = ({location}: any) => {

    return (
        <>
            <I18NProvider>
                <Helmet>
                    <title>Algebra Help Center</title>
                </Helmet>
                <Header location={location} label={'Home'} isHome/>
                <main className={'page-container'}>
                    {categories.map((el, i) =>
                        <CategoryBlock item={el} key={i}/>
                    )}
                </main>
                <Footer/>
            </I18NProvider>
        </>
    )
}
export default IndexPage
