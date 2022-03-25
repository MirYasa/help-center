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
            <Header
                location={breadcrumbs}
                setSearchQuery={setSearchQuery}
                searchedResaults={results}
                searchQuery={searchQuery}/>
            <div className={'page-container article__wrapper'}>
                <div className={'article'}>
                    <MDXRenderer>
                        {mdx.body}
                    </MDXRenderer>
                </div>
            </div>
            <Footer/>
        </>
    )
}
