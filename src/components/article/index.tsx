import React, { useMemo } from 'react'
import {graphql, Link} from "gatsby"
import './article.scss'
import Header from "../Header"
import Footer from "../Footer"
import {MDXRenderer} from 'gatsby-plugin-mdx'
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import { Helmet } from 'react-helmet'

import Alice from '../../assets/images/alice.jpeg'
import { Tag } from "react-feather"
import { isBrowser } from "../../utils/isBrowser"
import BreadCrumbs from "../BreadCrumbs"

export const query = graphql`
    query Article ($slug: String, $category: String) {
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
        mdx(slug: {eq: $slug}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
                ID
                category
                Is_FAQ
                Type
                Lang
            }
            slug
            body
        }
    }
`

export default function Article({data: {allMdx, mdx, localSearchPages: {index, store}}, pageContext, location}: any) {

    const {lang} = useLocale()

    const [searchQuery, setSearchQuery] = React.useState('')
    const results = useFlexSearch(searchQuery, index, store, {language: 'en'})

    React.useEffect(() => {

        if (!isBrowser()) return

        const [, _lang, category, article] = window.location.pathname.split('/')

        if (lang !== _lang) {
            const newSlug = pageContext.ids[mdx.frontmatter.ID][lang]
            window.location.href = `http://${window.location.host}/${lang}/${category}/${newSlug}`
        }

    }, [])

    const breadcrumbs = React.useMemo(() => pageContext.breadcrumb.crumbs.filter((el: any, i: number) => i !== 1).map((el: any, i: number, arr: any[]) => {
        if (i === arr.length - 3) {
            return {
                ...el,
                //@ts-ignore
                'crumbLabel': homes[lang]
            }
        }
        if (i === arr.length - 2) {
            return {
                ...el,
                //@ts-ignore
                'crumbLabel': categories[el.crumbLabel][lang]
            }
        }
        if (i === arr.length - 1) {
            return {
                ...el,
                'crumbLabel': mdx.frontmatter.title
            }
        }
        return el
    }), [lang])

    const langNodes = useMemo(() => allMdx.nodes.filter((node: any) => node.frontmatter.Lang === lang),[allMdx, lang])

    const guides = useMemo(() => langNodes.filter((node: any) => node.frontmatter.Type === 'Guide'), [langNodes])

    const articles = useMemo(() => langNodes.filter((node: any) => node.frontmatter['Is_FAQ'] !== '1' && node.frontmatter.Type === 'Article'), [langNodes])

    const faq = useMemo(() => langNodes.filter((node: any) => node.frontmatter['Is_FAQ'] === '1'), [langNodes])

    const formattedBody = useMemo(() => {
        let body = mdx.body
        body = body.replaceAll("u201C", 'u00AB')
        body = body.replaceAll('u201D', 'u00BB')
        return body
    }, [mdx.body])

    return (
        <>
            <Helmet>
                <title>
                    {/*//@ts-ignore*/}
                    {`Algebra Help Center - ${mdx.frontmatter.title}`}
                </title>
            </Helmet>
            <Header
                location={breadcrumbs}
                setSearchQuery={setSearchQuery}
                searchedResaults={results}
                breadcrumbs={true}
                searchQuery={searchQuery}/>
            <div className="f page-container">
            <div className={'article__wrapper'} style={{padding: 0}}>
            { breadcrumbs && <BreadCrumbs crumbs={breadcrumbs} isHome={false}/> }
                <div className={'article'}>
                    <div className="f ac">
                        <h1>{mdx.frontmatter.title}</h1>
                    </div>
                    {
                        pageContext.isGuide &&
                    <div className="f ac jb">
                        <div className="f ac">
                            <div className="m-r-1" style={{position: 'relative', width: '45px', height: '45px', borderRadius: '50%', background: `url(${Alice})`, border: '3px solid #97b1ff', backgroundSize: 'cover'}}></div>
                            <div>
                                <div className="b">Alice</div>
                                <div style={{color: 'grey', fontSize: '14px'}}>{mdx.frontmatter.date}</div>
                            </div>
                        </div>
                    </div>
}
                    <div className={'mdx-text'}>
                    <MDXRenderer>
                        {formattedBody}
                    </MDXRenderer>
                    </div>
                </div>
            </div>
            <div className="full-h m-l-a p-t-1" style={{minWidth: '300px', maxWidth: '300px', position: 'sticky', top: 0}}>
                <div>
                    <div style={{padding: '0 0 0 0'}}>
                        <div className="b" style={{padding: '8px 0 8px 0'}}>Base</div>
                        <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
                        {
                            articles.length && articles.map((article: any) => <li className={`article__side-link ${pageContext.slug === article.slug ? 'active' : '' }`} style={{padding: '8px 1rem'}} key={article.id}>
                                  <Link className={'articles__link'} style={{color: 'black', textDecoration: 'none'}} to={`/${lang}/${article.frontmatter.category}/${article.slug}`}>{article.frontmatter.title}</Link>
                            </li>)
                        }
                        </ul>
                    </div>
                    <div style={{padding: '0 0 0 0'}}>
                        <div className="b" style={{padding: '8px 0rem 8px 0rem'}}>Guides</div>
                        <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
                        {
                            guides.length && guides.map((guide: any) => <li className={`article__side-link ${pageContext.slug === guide.slug ? 'active' : '' }`} style={{padding: '8px 1rem'}} key={guide.id}>
                                  <Link className={`articles__link`} style={{color: 'black', textDecoration: 'none'}} to={`/${lang}/${guide.frontmatter.category}/${guide.slug}`}>{`${guide.frontmatter.title}`}</Link>
                            </li>)
                        }
                        </ul>
                    </div>
                    <div style={{padding: '0 0 0 0'}}>
                        <div className="b" style={{padding: '8px 0 8px 0'}}>FAQ</div>
                        <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
                        {
                            faq.length && faq.map((question: any) => <li className={`article__side-link ${pageContext.slug === question.slug ? 'active' : '' }`} style={{padding: '8px 1rem'}} key={question.id}>
                                  <Link className={'articles__link'} style={{color: 'black', textDecoration: 'none'}} to={`/${lang}/${question.frontmatter.category}/${question.slug}`}>{question.frontmatter.title}</Link>
                            </li>)
                        }
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    )
}
