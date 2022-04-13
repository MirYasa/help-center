import React, {useMemo} from 'react'
import {graphql, Link} from "gatsby"
import Header from "../Header/Header"
import './index.scss'
import Footer from "../Footer"
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'
import FaqBlock from '../FaqBlock/index'
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import { Helmet } from 'react-helmet'

export const query = graphql`
    query Articles ($category: String) {
         localSearchPages {
                   index
                   store
                }
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
                body
            }
        }
    }
`

export default function Articles({data: {localSearchPages: {index, store}, allMdx}, location, pageContext}: any) {
    const [baseArr, setBase] = React.useState<any[]>([])
    const [faqArr, setFaq] = React.useState<any[]>([])
    const [searchQuery, setSearchQuery] = React.useState('')
    const results = useFlexSearch(searchQuery, index, store, {language: 'en'})

    // const {lang} = useLocale()
    const lang = 'ru'

    const breadcrumbs = useMemo(() => pageContext.breadcrumb.crumbs.filter((el: any, i: number) => i !== 1).map((el: any, i: number, arr: any[]) => {
        // if (!data.allMdx.nodes[0]) return
        if (i === arr.length - 2) {
            return {
                ...el,
                //@ts-ignore
                'crumbLabel': homes[lang]
            }
        }
        if (!allMdx.nodes[0]) {
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
                'crumbLabel': categories[allMdx.nodes[0]?.frontmatter.category][lang]
            }
        }
        return el
    }), [])

    // React.useEffect(() => {
    //     const [, _lang, category] = window.location.pathname.split('/')

    //     if (lang !== _lang) {
    //         window.location.href = `http://${window.location.host}/${lang}/${category}/`
    //     }

    // }, [])

    // React.useEffect(() => {
    //     allMdx.nodes.forEach((el: any) => {
    //         if (lang !== el.frontmatter.lang) return

    //         if (el.frontmatter.type === 'base') {
    //             setBase(prev => [...prev, el])
    //         }

    //         if (el.frontmatter.type === 'faq') {
    //             setFaq(prev => [...prev, el])
    //         }
    //     })
    // }, [allMdx.nodes])
    return (
        <>
            <Helmet>
                <title>
                    {/*//@ts-ignore*/}
                    {`Algebra Help Center - ${categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]}`}
                </title>
            </Helmet>
            <Header
                location={breadcrumbs}
                searchedResaults={results}
                searchQuery={searchQuery}
                breadcrumbs
                setSearchQuery={setSearchQuery}/>
            <div className={'page-container articles f c'}>
                {/*//@ts-ignore*/}
                <h1>{categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]}</h1>
                <p className="p-b-2" style={{borderBottom: '1px solid #eaeaea'}}>Here is description blablabla</p>
                <h2>Articles</h2>
                {
                    baseArr.length !== 0 ? (
                        <>
                            <ul className={'articles__list'}>
                                {baseArr.map((el: any) =>
                                    <li className="m-b-1" key={el.id}>
                                        <Link className={'articles__link'} to={el.slug}>{el.frontmatter.title}</Link>
                                    </li>
                                )
                                }
                            </ul>
                            {/*//@ts-ignore*/}
                            <h2 style={{marginTop: '1rem'}}>{faqArr.length !== 0 && categories.faq[lang]}</h2>
                            <ul className={'articles__list'}>
                                {faqArr.map((el: any) =>
                                    <li key={el.id}>
                                        <FaqBlock
                                            date={el.frontmatter.date}
                                            body={el.body}
                                            title={el.frontmatter.title}
                                            slug={el.slug}
                                        />
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