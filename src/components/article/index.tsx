import React from 'react'
import {graphql} from "gatsby"
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
            <div className={'page-container article__wrapper'}>
                <div className={'article'}>
                    <h1>{mdx.frontmatter.title}</h1>
                    <div className="f ac">
                        <div className="m-r-1" style={{position: 'relative', width: '45px', height: '45px', borderRadius: '50%', background: `url(${Alice})`, backgroundSize: 'cover'}}>
                            <div style={{position: 'absolute', bottom: '-2px', right: '-2px'}}>
                            <svg style={{display: 'block'}} width="18" height="18">
                                <circle cx="8" cy="8" r="7" fill="white" stroke="#36f" strokeWidth="3"></circle>
                            </svg>
                            </div>
                        </div>
                        <div>
                            <div className="b">Alice</div>
                            <div style={{color: 'grey', fontSize: '14px'}}>{mdx.frontmatter.date}</div>
                        </div>
                    </div>
                    <MDXRenderer>
                        {mdx.body}
                    </MDXRenderer>
                </div>
            </div>
            <Footer/>
        </>
    )
}
