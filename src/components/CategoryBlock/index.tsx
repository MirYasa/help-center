import React from 'react'
import './index.scss'
import {Link} from "gatsby"

interface CatrgoryBlockProps {
    title: string
    category: string
    icon: JSX.Element
    description: string
    articles: any[]
}

export default function CategoryBlock({title, category, articles, description, icon}: CatrgoryBlockProps) {

    console.log('Articles', articles)

    return (
        <div className={'category-block'}>
            <div className={'category-block__icon f'}>
                {/* {icon} */}
                <h3 className="m-b-0 m-t-a">{title}</h3>
            </div>
            <div className={'category-block__text'}>
                {/* <p>{description}</p> */}
                <ul className="category-block__list">
                    {
                        articles && articles.slice(0, 2).map((article, i) => <li key={i}className="category-block__list-item">
                            <a href={`/${article.frontmatter.lang}/${article.frontmatter.category}/${article.slug}`}>{article.frontmatter.title}</a>
                        </li> )
                    }
                </ul>
            </div>
            <Link to={`${category}`} state={{category: category}} className="category-block__bottom f jb">
                <span className="category-block__bottom-link">View all (5)</span>
                <span className="category-block__bottom-arrow">→</span>
            </Link>
        </div>
    )
};