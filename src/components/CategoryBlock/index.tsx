import React from 'react'
import './index.scss'
import {Link} from "gatsby"

interface CatrgoryBlockProps {
    title: string
    category: string
    icon: JSX.Element
    description: string
}

export default function CategoryBlock({title, category, description, icon}: CatrgoryBlockProps) {

    return (
        <Link to={`${category}`} state={{category: category}} className={'category-block'}>
            <div className={'category-block__icon'}>
                {icon}
            </div>
            <div className={'category-block__text'}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </Link>
    )
};