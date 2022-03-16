import React from 'react'
import {graphql, Link} from "gatsby"
import Header from "../Header/Header"
import './index.scss'
import {ArrowLeft} from "react-feather"

export const query = graphql`
    query Articles ($category: String) {
        allMdx (filter: {frontmatter: {category: {eq: $category}} }) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "MMMM D, YYYY")
                }
                id
                slug
            }
        }
    }
`

export default function Articles({data, pageContext}: any) {
    return (
        <>
            <Header/>
            <div className={'page-container articles'}>
                <Link to={'/'} className={'articles__back'}>
                    <ArrowLeft size={'1rem'}/> <div>Back</div>
                </Link>
                <h1>Articles</h1>
                <ul className={'articles__list'}>
                    {data.allMdx.nodes.map((el: any) =>
                        <li key={el.id}>
                            <Link className={'articles__link'} to={el.slug}>
                                <h3>{el.frontmatter.title}</h3>
                                <p>{el.frontmatter.date}</p>
                            </Link>
                        </li>
                    )
                    }
                </ul>
            </div>
        </>
    )
};