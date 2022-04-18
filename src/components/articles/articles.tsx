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
            <div className="f full-h page-container" style={{height: '100%'}}>
                <div className={'articles f c'}>
                     { breadcrumbs && <BreadCrumbs crumbs={breadcrumbs} isHome={false}/> }
                {/*//@ts-ignore*/}
                <h1>{categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]}</h1>
                <div style={{padding: '1rem', background: '#36f', color: 'white', borderRadius: '8px'}}>
                <h2 className="m-t-0">🔥 Guides</h2>
                <ul className="articles__list">
                    {
                        guides.map((guide: any) => <li className="m-b-1" key={guide.id}>
                            <Link className="articles__link" style={{fontSize: '21px', color: 'white', fontWeight: '500', textDecoration: 'underline'}} to={guide.slug}>{`${guide.frontmatter.title}`}</Link>
                        </li>)
                    }
                </ul>
                </div>
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
                <div className="full-h m-l-a p-t-1" style={{minWidth: '300px', maxWidth: '300px'}}>
                <div style={{padding: '0 0 0 0'}}>
                        <div className="b" style={{padding: '8px 0 8px 0'}}>👉 Essentials</div>
                        <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
                        {
                            articles.length && articles.map((article: any) => <li style={{padding: '8px 1rem', borderLeft: '1px solid #eaeaea'}} key={article.id}>
                                  <Link className={'articles__link'} style={{color: 'black', textDecoration: 'none'}} to={article.slug}>{article.frontmatter.title}</Link>
                            </li>)
                        }
                        </ul>
                    </div>
                    <div style={{padding: '0 0 0 0'}}>
                        <div className="b" style={{padding: '8px 0rem 8px 0rem',}}>🔥 Guides</div>
                        <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
                        {
                            guides.length && guides.map((guide: any) => <li style={{padding: '8px 1rem', borderLeft: '1px solid #eaeaea'}} key={guide.id}>
                                  <Link className={'articles__link'} style={{color: 'black', textDecoration: 'none'}} to={guide.slug}>{guide.frontmatter.title}</Link>
                            </li>)
                        }
                        </ul>
                    </div>
                    <div style={{padding: '0 0 0 0'}}>
                        <div className="b" style={{padding: '8px 0 8px 0'}}>✨ FAQ</div>
                        <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
                        {
                            faq.length && faq.map((question: any) => <li style={{padding: '8px 1rem', borderLeft: '1px solid #eaeaea'}} key={question.id}>
                                  <Link className={'articles__link'} style={{color: 'black', textDecoration: 'none'}} to={question.slug}>{question.frontmatter.title}</Link>
                            </li>)
                        }
                        </ul>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}