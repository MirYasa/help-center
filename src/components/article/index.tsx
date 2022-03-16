import React from 'react'
import {graphql, Link} from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"
import './article.scss'
import Header from "../Header/Header"
import {ArrowLeft} from "react-feather"

export const query = graphql`
    query Article ($slug: String) {
        mdx(slug: {eq: $slug}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
            }
            body
        }
    }
`

export default function Article({data, pageContext}: any) {
    return (
        <>
            <Header/>
            <div className={'page-container'}>
                <Link to={'/' + pageContext.backlink} className={'article__back'}>
                    <ArrowLeft size={'1rem'}/> <div> Back</div>
                </Link>
                <div className={'article'}>
                    <MDXRenderer>
                        {data.mdx.body}
                    </MDXRenderer>
                </div>
            </div>
            <div style={{height: '50px', width: '100%'}}/>
        </>
    )
}
