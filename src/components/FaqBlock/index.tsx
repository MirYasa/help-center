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
                    <div className="m-r-05">{title}</div>
                </div>
                {open ? <MinusCircle className={'animation'} size={'21px'} color={'var(--black)'}/> : <PlusCircle size={'21px'} color={'var(--black)'}/>}
                <div style={{position: 'absolute', right: '-2rem'}}>
                    <AnchorLink to={`#${slug}`}>
                        <Link style={{display: 'block', stroke:"#cecece"}} size={'1rem'} color={'var(--primary)'} className={'faq-block__title__text__link'}/>
                    </AnchorLink>
                </div>
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