import React, {useMemo} from 'react'
import {graphql} from "gatsby"
import './article.scss'
import Header from "../Header/Header"
import Footer from "../Footer"
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const query = graphql`
    query Article ($slug: String) {
        mdx(slug: {eq: $slug}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")  
            }
            slug
            body
        }
    }
`

export default function Article({data, pageContext, location}: any) {

    const breadTitle: string = useMemo(() => pageContext.slug?.split('-').map((el: string) => el.charAt(0).toUpperCase() + el.slice(1)).join(' '), [])

    // console.log(data)


    return (
        <>
            <Header location={location} label={breadTitle}/>
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
