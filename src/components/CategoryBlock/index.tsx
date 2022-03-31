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
            <div className={'category-block__icon f'}>
                {/* {icon} */}
                <h3 className="m-b-0 m-t-a">{title}</h3>
            </div>
            <div className={'category-block__text'}>
                {/* <p>{description}</p> */}
                <ul className="category-block__list">
                    <li className="category-block__list-item m-b-1">What is concentrated liquidity?</li>
                    <li className="category-block__list-item">Price ranges on Algebra</li>
                </ul>
            </div>
            <div className="category-block__bottom f jb">
                <span>View all (5)</span>
                <span>→</span>
            </div>
        </Link>
    )
};