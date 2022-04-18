import React from 'react'
import './index.scss'
import {Link} from "gatsby"

interface CatrgoryBlockProps {
    title: string
    category: string
    icon: string
    description: string
    articles: any[]
}

export default function CategoryBlock({title, category, articles, description, icon}: CatrgoryBlockProps) {

    return (
        <div className={'category-wrapper i-f c'}>
            <div className="category__icon m-b-1">{icon}</div>
            <div className={'category__title f'}>
                <h3 className="m-b-0 m-t-a">{title}</h3>
            </div>
            <div className={'category-wrapper__text'}>
                <p>{description}</p>
            </div>
            <Link to={`${category}`} state={{category: category}} className="category-block__bottom f jb">
                <span className="category-block__bottom-link">View</span>
                <span className="category-block__bottom-arrow">→</span>
            </Link>
        </div>
    )
};