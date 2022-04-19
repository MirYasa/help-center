import React, {useMemo} from 'react'
import {graphql, Link} from "gatsby"
import Header from "../Header"
import './index.scss'
import Footer from "../Footer"
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'
import FaqBlock from '../FaqBlock/index'
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import { Helmet } from 'react-helmet'
import { isBrowser } from "../../utils/isBrowser"
import BreadCrumbs from "../BreadCrumbs"
import SideMenu from "../SideMenu"

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
                    Lang
                    ID
                    Is_FAQ
                    Type
                }
                slug
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

    const {lang} = useLocale()

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
                // @ts-ignore
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
    }), [lang])

    React.useEffect(() => {

        if (!isBrowser()) return

        const [, _lang, category] = window.location.pathname.split('/')

        if (lang !== _lang) {
            window.location.href = `http://${window.location.host}/${lang}/${category}/`
        }

    }, [])

    React.useEffect(() => {
        allMdx.nodes.forEach((el: any) => {
            if (lang !== el.frontmatter.Lang) return
            
            if (el.frontmatter['Is_FAQ'] === '0') {
                setBase(prev => [...prev, el])
            }

            if (el.frontmatter['Is_FAQ'] === '1') {
                setFaq(prev => [...prev, el])
            }
        })
    }, [allMdx.nodes])

    const category = useMemo(() => {
        if (!allMdx.nodes) return

        //@ts-ignore
        return pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel
    }, [allMdx, lang])

    const langNodes = useMemo(() => allMdx.nodes.filter((node: any) => node.frontmatter.Lang === lang),[allMdx, lang])

    const guides = useMemo(() => langNodes.filter((node: any) => node.frontmatter.Type === 'Guide'), [langNodes])

    const articles = useMemo(() => langNodes.filter((node: any) => node.frontmatter['Is_FAQ'] !== '1' && node.frontmatter.Type === 'Article'), [langNodes])

    const faq = useMemo(() => langNodes.filter((node: any) => node.frontmatter['Is_FAQ'] === '1'), [langNodes])

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
            <div className="articles-container f full-h page-container" style={{height: '100%'}}>
                <div className={'articles f c'}>
                     { breadcrumbs && <BreadCrumbs crumbs={breadcrumbs} isHome={false}/> }
                {/*//@ts-ignore*/}
                <h1>{categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]}</h1>
                <h2>👉 Essentials</h2>
                {
                    articles.length !== 0 ? 
                    <ul className={'articles__list'}>
                        {
                            articles.map((el: any) => 
                            <li className="m-b-1" key={el.id}>
                                <Link className={'articles__link'} to={el.slug}>{el.frontmatter.title}</Link>
                            </li>)
                        }
                    </ul>
                    : <div>No articles in this category</div>
                }
                 <div>
                <h2>🔥 Guides</h2>
                <ul className="articles__list">
                    {
                        guides.map((guide: any) => <li className="m-b-1" key={guide.id}>
                            <Link className="articles__link" to={guide.slug}>{`${guide.frontmatter.title}`}</Link>
                        </li>)
                    }
                </ul>
                </div>
                {/* @ts-ignore */}
                <h2>✨ {categories.faq[lang]}</h2>
                {
                    faq.length && <ul className={'articles__list'}>
                    {faq.map((el: any) =>
                        <li className="m-b-1" key={el.id}>
                        <Link className={'articles__link'} to={el.slug}>{el.frontmatter.title}</Link>
                    </li>
                    )
                    }
                </ul>
                }
                </div>
                {/* @ts-ignore */}
                <SideMenu category={category} articles={articles} guides={guides} faq={faq} slug={pageContext.slug} title={categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]} lang={lang}/>
            </div>
        </>
    )
}