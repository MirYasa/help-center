import React, {useMemo} from 'react'
import {graphql, Link} from "gatsby"
import Header from "../Header/Header"
import './index.scss'
import Footer from "../Footer"
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'
import FaqBlock from '../FaqBlock/index'

export const query = graphql`
    query Articles ($category: String) {
        allMdx (filter: {frontmatter:{category: {eq: $category}}}) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "MMMM D, YYYY")
                    category
                    lang
                    id
                    type
                }
                slug
                id
            }
        }
    }
`

export default function Articles({data, location, pageContext}: any) {


    const {lang} = useLocale()

    React.useEffect(() => {
        const [, _lang, category] = window.location.pathname.split('/')

        if (lang !== _lang) {
            window.location.href = `http://${window.location.host}/${lang}/${category}/`
        }

    }, [])

    const breadcrumbs = useMemo(() => pageContext.breadcrumb.crumbs.filter((el: any, i: number) => i !== 1).map((el: any, i: number, arr: any[]) => {
        // if (!data.allMdx.nodes[0]) return
        if (i === arr.length - 2) {
            return {
                ...el,
                //@ts-ignore
                'crumbLabel': homes[lang]
            }
        }
        if (!data.allMdx.nodes[0]) {
            return {
                ...el,
                //@ts-ignore
                'crumbLabel': categories[el.crumbLabel][lang]
            }
        }
        if (i === arr.length - 1) {
            return {
                ...el,
                //@ts-ignore
                'crumbLabel': categories[data.allMdx.nodes[0]?.frontmatter.category][lang]
            }
        }
        return el
    }), [lang])

    const [baseArr, setBase] = React.useState<any[]>([])
    const [faqArr, setFaq] = React.useState<any[]>([])

    React.useEffect(() => {
        data.allMdx.nodes.forEach((el: any) => {
            if (lang !== el.frontmatter.lang) return

            if (el.frontmatter.type === 'base') {

                setBase(prev => [...prev, el])
            }
            if (el.frontmatter.type === 'faq') {
                setFaq(prev => [...prev, el])
            }
        })
    }, [data.allMdx.nodes])
    // React.useEffect(() => console.log(baseArr, faqArr), [baseArr, faqArr])
    return (
        <>
            <Header location={breadcrumbs}/>
            <div className={'page-container articles'}>
                {/*//@ts-ignore*/}
                <h1>{categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]}</h1>
                {
                    baseArr.length !== 0 ? (
                        <>
                            <ul className={'articles__list'}>
                                {baseArr.map((el: any) =>
                                    <li key={el.id}>
                                        <Link className={'articles__link'} to={el.slug}>
                                            <h3>{el.frontmatter.title}</h3>
                                            <p>{el.frontmatter.date}</p>
                                        </Link>
                                    </li>
                                )
                                }
                            </ul>
                            {/*//@ts-ignore*/}
                            <h1 style={{marginTop: '1rem'}}>{faqArr.length !== 0 && categories.faq[lang]}</h1>
                            <ul className={'articles__list'}>
                                {faqArr.map((el: any) =>
                                    <li key={el.id}>
                                        <FaqBlock/>
                                    </li>
                                )
                                }
                            </ul>
                        </>
                    ) : <div>No articles in this category</div>
                }
            </div>
            <Footer/>
        </>
    )
}