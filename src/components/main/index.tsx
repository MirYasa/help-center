import * as React from "react"
import '../../assets/styles/index.scss'
import Header from '../Header'
import './index.scss'
import {Book, Download, HelpCircle, Layers, RefreshCcw, ShoppingCart} from "react-feather"
import CategoryBlock from "../CategoryBlock"
import Footer from "../Footer"
import {Helmet} from 'react-helmet'
import useLocale from "../../hooks/useLocale"
import {graphql} from "gatsby"
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import Hero from "../../sections/Hero"
import ContactForm from "../ContactForm"
import { isBrowser } from "../../utils/isBrowser"

const categories = [
    {
        title: {
            'en': 'Getting Started',
            'ru': 'Начало работы',
            'es': 'Cómo empezar',
        },
        icon: <Book size={'4rem'}/>,
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
        icon: <Download size={'4rem'}/>,
        description: {
            'en': 'Learn how to earn yield by providing liquidity on Algebra',
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
        icon: <ShoppingCart size={'4rem'}/>,
        description: {
            'en': 'Learn how to earn yield by providing liquidity on Algebra',
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
        icon: <RefreshCcw size={'4rem'}/>,
        description: {
            'en': 'Learn how to swap tokens on Algebra',
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

    console.log('ALL DATA', pageContext)

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
            <Hero  searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchedResaults={results}/>
            <main className={'page-container'} style={{paddingTop: '3rem', paddingBottom: '3rem', background: '#fafdff'}}>
                {categories.map((el, i) => {

                    return <CategoryBlock
                        // @ts-ignore
                        title={el.title[lang]}
                        category={el.category}
                        // @ts-ignore
                        description={el.description[lang]}
                        articles={pageContext.categoriesData.filter( (_el: any) => _el.frontmatter.category === el.category && _el.frontmatter['Is_FAQ'] !== '1' )}
                        icon={el.icon}
                        key={i}/>
                }
                )}
            </main>
            <div className="page-container f" style={{marginBottom: '3rem', background: '#fafdff'}}>
                    <div className="m-r-2 p-2" style={{width: '100%', borderRadius: '8px', background: 'white', border: '1px solid #eaebec'}}>
                        <div className="w-100">
                            <div className="m-b-2 b" style={{fontSize: '21px'}}>Contact us</div>
                            <div>
                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                    <div className="f c" style={{width: '100%'}}>
                        <div className="p-t-1 p-b-1 p-r-1 p-l-1 m-b-1 b f jb ac" style={{fontSize: '18px', background: '#d1e7e1', color: '#256554', border: '1px solid #bbdcd3', borderRadius: '8px'}}>
                            <span>Guides</span>
                            <span>→</span>
                        </div>
                        {/* <div className="p-t-1 p-b-1 p-r-1 p-l-1 m-b-1 b f jb ac" style={{fontSize: '18px', background: '#d1e0e7', color: '#253265', border: '1px solid #bbc8dc', borderRadius: '8px'}}>
                        <span>Submit a request</span>
                            <span>→</span>
                        </div> */}
                        <div className="p-t-1 p-b-1 p-r-1 p-l-1 m-b-1 b" style={{fontSize: '18px'}}>Community</div>
                        <div className="p-t-1 p-b-1 p-r-1 p-l-1 m-b-1 b" style={{fontSize: '18px'}}>Troubleshooting</div>
                    </div>
            </div>
            <Footer/>
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