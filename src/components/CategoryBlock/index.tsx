import React from 'react'
import './index.scss'
import {Link} from "gatsby"
import { Check } from "react-feather"

interface CatrgoryBlockProps {
    title: string
    category: string
    icon: string
    chips: string[]
    description: string
    articles: any[]
}

export default function CategoryBlock({title, category, chips, articles, description, icon}: CatrgoryBlockProps) {

    return (
        <div className={'category-wrapper i-f c'}>
            <img className="category__icon m-b-1" src={icon} />
            <div className={'category__title f'}>
                <h3 className="m-b-0 m-t-a">{title}</h3>
            </div>
                <p>{description}</p>
            <div className={'category-wrapper__text f'} style={{flexWrap: 'wrap'}}>
                {chips.map( (chip, i) => <div className="f ac jc m-r-1 m-b-1" style={{borderRadius: '16px', padding: '3px 8px', backgroundColor: '#fafafa', border: '1px solid #eaeaea'}} key={i}>
                    <Check style={{display: 'inline-block', marginRight: '4px'}} size={'14px'}/>
                    <span>{chip}</span>
                </div>)}
            </div>
            <Link to={`${category}`} state={{category: category}} className="category-block__bottom f jb">
                <span className="category-block__bottom-link">Learn more</span>
                <span className="category-block__bottom-arrow">→</span>
            </Link>
        </div>
    )
};