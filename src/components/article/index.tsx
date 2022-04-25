import React, { useEffect, useMemo } from 'react'
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
import SideMenu from "../SideMenu"

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

    const category = useMemo(() => {
        if (!allMdx.nodes) return

        //@ts-ignore
        return pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 2].crumbLabel
    }, [allMdx, lang])

    const langNodes = useMemo(() => allMdx.nodes.filter((node: any) => node.frontmatter.Lang === lang),[allMdx, lang])

    const guides = useMemo(() => langNodes.filter((node: any) => node.frontmatter.Type === 'Guide'), [langNodes])

    const articles = useMemo(() => langNodes.filter((node: any) => node.frontmatter['Is_FAQ'] !== '1' && node.frontmatter.Type === 'Article'), [langNodes])

    const faq = useMemo(() => langNodes.filter((node: any) => node.frontmatter['Is_FAQ'] === '1'), [langNodes])

    const formattedBody = useMemo(() => {
        let body = mdx.body
        // body = body.replaceAll("u201C", 'u00AB')
        // body = body.replaceAll('u201D', 'u00BB')
        return body
    }, [mdx.body])

    useEffect(() => {

        const ps = document.querySelectorAll('p')
        ps.forEach( p => {
            if (p.innerText.match(/==[a-zA-Z ]+==/)) {
                const video = document.createElement('video')
                video.src = `/assets/${p.innerText.replaceAll('=', '')}.MP4`
                video.setAttribute('autoplay', 'autoplay')
                video.setAttribute('loop', 'true')
                video.setAttribute('muted', 'true')
                p.replaceWith(video)
            }
        })
    }, [mdx.body])

    useEffect(() => {
        const video  = document.querySelectorAll('video')

        const getObserver = (el: HTMLVideoElement) => new IntersectionObserver((entries, _observer) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio != 1 && !el.paused) {
                    el.pause()
                } else {
                    el.play()
                }
             })
        }, {threshold: 1})

        video.forEach(_video => getObserver(_video).observe(_video))

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
            <div className="f article-container page-container">
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
                <SideMenu category={category} articles={articles} guides={guides} faq={faq} slug={pageContext.slug} title={mdx.frontmatter.title} lang={lang}/>
            </div>
        </>
    )
}
