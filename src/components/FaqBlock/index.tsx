import React from 'react'
import '../CategoryBlock/index.scss'
import './index.scss'
import {MinusCircle, PlusCircle, Link} from 'react-feather'
import {MDXRenderer} from 'gatsby-plugin-mdx'
import { AnchorLink } from "gatsby-plugin-anchor-links";

interface FaqBlockProps {
    title: string
    date: string
    body: any
    slug: string
}

export default function FaqBlock({title, body, date, slug}: FaqBlockProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className={'category-block faq-block'} id={slug}>
            <div className={'faq-block__title'} onClick={() => setOpen(!open)}>
                <div className={'category-block__text faq-block__title__text'}>
                   <AnchorLink to={`#${slug}`}>
                       <Link size={'1rem'} color={'var(--primary)'} className={'faq-block__title__text__link'}/>
                   </AnchorLink>
                    <div>
                        <h3>{title}</h3>
                        <p>{date}</p>
                    </div>
                </div>
                {open ? <MinusCircle className={'animation'} size={'2rem'} color={'var(--primary)'}/> :
                    <PlusCircle size={'2rem'} color={'var(--primary)'}/>}
            </div>
            {
                open &&
                <div className={'faq-block__body'}>
                    <MDXRenderer>
                        {body}
                    </MDXRenderer>
                </div>
            }
        </div>

    )
};