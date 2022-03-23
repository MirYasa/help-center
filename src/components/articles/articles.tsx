import React, {useMemo} from 'react'
import {graphql, Link} from "gatsby"
import Header from "../Header/Header"
import './index.scss'
import Footer from "../Footer"
import useLocale from '../../hooks/useLocale'
import {categories, homes} from '../../i18n'

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
                }
                slug
                id
            }
        }
    }
`

export default function Articles({data, location, pageContext}: any) {

    const title = useMemo(() => {
        return data.allMdx.nodes[0]?.frontmatter.category.split('-').map((el: string) => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
    }, [])

    const {lang} = useLocale()

    React.useEffect(() => {
        const [, _lang, category] = window.location.pathname.split('/')

        if (lang !== _lang) {
            window.location.href = `http://${window.location.host}/${lang}/${category}/`
        }

    }, [])

    console.log(pageContext.breadcrumb.crumbs)
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


    return (
        <>
            <Header location={breadcrumbs}/>
            <div className={'page-container articles'}>
                {/*//@ts-ignore*/}
                <h1>{categories[pageContext.breadcrumb.crumbs[pageContext.breadcrumb.crumbs.length - 1].crumbLabel][lang]}</h1>
                {
                    data.allMdx.nodes.length !== 0 ? (
                        <ul className={'articles__list'}>
                            {data.allMdx.nodes.map((el: any) =>
                                lang === el.frontmatter.lang &&
                                <li key={el.id}>
                                    <Link className={'articles__link'} to={el.slug}>
                                        <h3>{el.frontmatter.title}</h3>
                                        <p>{el.frontmatter.date}</p>
                                    </Link>
                                </li>
                            )
                            }
                        </ul>
                    ) : <div>No articles in this category</div>
                }
            </div>
            <Footer/>
        </>
    )
}