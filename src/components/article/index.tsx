import React from 'react'
import {graphql, Link} from "gatsby"
import './article.scss'
import Header from "../Header/Header"
import Footer from "../Footer"
import {MDXRenderer} from 'gatsby-plugin-mdx'
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'
// @ts-ignore
import {useFlexSearch} from 'react-use-flexsearch'
import { Helmet } from 'react-helmet'

import Alice from '../../assets/images/alice.jpeg'
import { Tag } from "react-feather"

export const query = graphql`
    query Article ($slug: String) {
        localSearchPages {
               index
               store
            }
        mdx(slug: {eq: $slug}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
                id
                category
                type
                lang
            }
            slug
            body
        }
    }
`

export default function Article({data: {mdx, localSearchPages: {index, store}}, pageContext, location}: any) {

    const {lang} = useLocale()

    const [searchQuery, setSearchQuery] = React.useState('')
    const results = useFlexSearch(searchQuery, index, store, {language: 'en'})

    React.useEffect(() => {
        const [, _lang, category, article] = window.location.pathname.split('/')

        if (lang !== _lang) {
            const newSlug = pageContext.ids[mdx.frontmatter.id][lang]
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
            <div className={'page-container article__wrapper'} style={{padding: 0, borderTop: '1px solid #eaeaea'}}>
                <div className={'article'} style={{paddingTop: '1rem'}}>
                    <div className="f ac">
                        <h1>{mdx.frontmatter.title}</h1>
                        <a href={`/${mdx.frontmatter.lang}/${mdx.frontmatter.category}`} className="m-l-a f ac" style={{textDecoration: 'none', textTransform: 'capitalize', padding: '4px 8px', background: '#eaeaea', borderRadius: '6px', color: 'black'}}>
                            <Tag style={{marginRight: '5px'}} size={'12px'} />
                            <span>{mdx.frontmatter.category}</span>
                        </a>
                    </div>
                    <div className="f ac jb">
                        <div className="f ac">
                            <div className="m-r-1" style={{position: 'relative', width: '45px', height: '45px', borderRadius: '50%', background: `url(${Alice})`, border: '3px solid #97b1ff', backgroundSize: 'cover'}}></div>
                            <div>
                                <div className="b">Alice</div>
                                <div style={{color: 'grey', fontSize: '14px'}}>{mdx.frontmatter.date}</div>
                            </div>
                        </div>
                        <div>
                            <button style={{padding: '8px 12px'}}>Share</button>
                        </div>
                    </div>
                    <MDXRenderer>
                        {mdx.body}
                    </MDXRenderer>
                </div>
                <div className="side-part full-w m-l-2 p-l-2" style={{paddingTop: '1rem'}}>
                    <h2 style={{fontSize: '20px'}}>Articles in this section</h2>
                    <ul className="p-0 m-0" style={{listStyleType: 'none'}}>
                        {
                            pageContext.otherArticles.map( (el: any, i: number) => <li className="m-b-1" key={i}>
                                <a href={`/${el.frontmatter.lang}/${el.frontmatter.category}/${el.slug}`}>{el.frontmatter.title}</a>
                            </li> )
                        }
                    </ul>
                </div>
            </div>
            <Footer/>
        </>
    )
}
