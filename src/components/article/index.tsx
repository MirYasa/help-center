import React, {useMemo} from 'react'
import {graphql} from "gatsby"
import './article.scss'
import Header from "../Header/Header"
import Footer from "../Footer"

export const query = graphql`
    query Article ($slug: String) {
        markdownRemark(frontmatter: {slug: {eq: $slug}}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
                slug
            }
            html
        }
    }
`

export default function Article({data, pageContext, location}: any) {

    const breadTitle: string = useMemo(() => pageContext.slug?.split('-').map((el: string) => el.charAt(0).toUpperCase() + el.slice(1)).join(' '), [])

    return (
        <>
            <Header location={location} label={breadTitle}/>
            <div className={'page-container article__wrapper'}>
                <div className={'article'}>
                    <div
                    dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
