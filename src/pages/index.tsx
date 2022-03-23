import * as React from "react"
import '../assets/styles/index.scss'
import Header from "../components/Header/Header"
import './index.scss'
import {Book, Download, HelpCircle, RefreshCcw, Layers, ShoppingCart} from "react-feather"
import CategoryBlock from "../components/CategoryBlock"
import Footer from "../components/Footer"
import {Helmet} from 'react-helmet'
import useLocale from "../hooks/useLocale"

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
            'en': 'How to swap tokens?',
            'ru': 'Как обменивать токены?',
            'es': '¿Cómo se intercambian las fichas?',
        },
        icon: <RefreshCcw size={'4rem'}/>,
        description: {
            'en': 'Learn how to swap tokens on Algebra',
            'ru': 'Узнайте как обменивать токены на Алгебре',
            'es': 'Aprende a intercambiar fichas en Álgebra',
        },
        category: 'swap'
    },
    {
        title: {
            'en': 'How to provide liquidity?',
            'ru': 'Как добавить ликвидность?',
            'es': '¿Cómo proporcionar liquidez?',
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
            'en': 'How to farm crypto?',
            'ru': 'Как выращивать криптовалюту?',
            'es': '¿Cómo cultivar criptomonedas?',
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
            'en': 'How to stake ALGB?',
            'ru': 'Как сделать ставку на ALGB?',
            'es': '¿Cómo apostar por ALGB?',
        },
        icon: <Layers size={'4rem'}/>,
        description: {
            'en': 'Learn how to earn yield by providing liquidity on Algebra',
            'ru': 'Learn the basics about the Algebra',
            'es': 'Learn the basics about the Algebra',
        },
        category: 'stake'
    },
    {
        title: {
            'en': 'FAQ',
            'ru': 'ЧАВО',
            'es': 'PREGUNTAS FRECUENTES',
        },
        icon: <HelpCircle size={'4rem'}/>,
        description: {
            'en': 'Frequently asked questions',
            'ru': 'Часто задаваемые вопросы',
            'es': 'Preguntas frecuentes',
        },
        category: 'faq'
    }
]

interface IndexPageProps {
    location: Location
    pageContext?: any
}

const IndexPage = ({location, pageContext}: IndexPageProps) => {

    const {lang} = useLocale()

    React.useEffect(() => {
        const [, _lang] = window.location.pathname.split('/')

        if (lang !== _lang) {
            window.location.href = `http://${window.location.host}/${lang}/`
        }

    }, [])



    return (
        <>
            <Helmet>
                <title>Algebra Help Center</title>
            </Helmet>
            <Header location={pageContext.breadcrumb.crumbs} isHome/>
            <main className={'page-container'}>
                {categories.map((el, i) =>
                    <CategoryBlock
                        // @ts-ignore
                        title={el.title[lang]}
                        category={el.category}
                        // @ts-ignore
                        description={el.description[lang]}
                        icon={el.icon}
                        key={i}/>
                )}
            </main>
            <Footer/>
        </>
    )
}
export default IndexPage
