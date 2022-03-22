import React from 'react'
import './index.scss'
import {Link} from "gatsby"
import {LanguageContext} from '../../context/LanguageContext'

interface CatrgoryBlockProps {
    item: any
}

export default function CategoryBlock({item}:CatrgoryBlockProps) {

    const {language} = React.useContext(LanguageContext)

    return (
        <Link to={`${language}/${item.category}`} state={{category: item.category}} className={'category-block'}>
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