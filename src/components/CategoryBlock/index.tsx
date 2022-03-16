import React from 'react'
import './index.scss'
import {Link} from "gatsby"

interface CatrgoryBlockProps {
    item: any
}

export default function CategoryBlock({item}:CatrgoryBlockProps) {
    return (
        <Link to={`${item.category}`} state={{category: item.category}} className={'category-block'}>
            <div className={'category-block__icon'}>
                {item.icon}
            </div>
            <div className={'category-block__text'}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        </Link>
    )
};