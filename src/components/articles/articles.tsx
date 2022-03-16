import React, {useMemo} from 'react'
import {graphql, Link} from "gatsby"
import Header from "../Header/Header"
import './index.scss'
import Footer from "../Footer"

export const query = graphql`
    query Articles ($category: String) {
        allMarkdownRemark (filter: {frontmatter:{category: {eq: $category}}}) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "MMMM D, YYYY")
                    category
                    slug
                }
                id
            }
        }
    }
`

export default function Articles({data, location}: any) {
    const title = useMemo(() => {
        return data.allMarkdownRemark.nodes[0]?.frontmatter.category.split('-').map((el: string) => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
    }, [])

    console.log(data)

    return (
        <>
            <Header location={location} label={title}/>
            <div className={'page-container articles'}>
                {
                    data.allMarkdownRemark.nodes.length !== 0 ? (
                        <>
                            <h1>{title}</h1>
                            <ul className={'articles__list'}>
                                {data.allMarkdownRemark.nodes.map((el: any) =>
                                    <li key={el.id}>
                                        <Link className={'articles__link'} to={el.frontmatter.slug}>
                                            <h3>{el.frontmatter.title}</h3>
                                            <p>{el.frontmatter.date}</p>
                                        </Link>
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