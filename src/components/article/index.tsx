import React from 'react'
import {graphql} from "gatsby"
import './article.scss'
import Header from "../Header/Header"
import Footer from "../Footer"
import {MDXRenderer} from 'gatsby-plugin-mdx'
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'

export const query = graphql`
    query Article ($slug: String) {
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

export default function Article({data, pageContext, location}: any) {

    const {lang} = useLocale()

    React.useEffect(() => {
        const [, _lang, category, article] = window.location.pathname.split('/')

        if (lang !== _lang) {
            const newSlug = pageContext.ids[data.mdx.frontmatter.id][lang]
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
                'crumbLabel': data.mdx.frontmatter.title
            }
        }
        return el
    }), [lang])

    console.log(breadcrumbs)

    return (
        <>
            <Header location={breadcrumbs}/>
            <div className={'page-container article__wrapper'}>
                <div className={'article'}>
                    <MDXRenderer>
                        {data.mdx.body}
                    </MDXRenderer>
                </div>
            </div>
            <Footer/>
        </>
    )
}
