import React from 'react'
import './index.scss'
import {Link} from "gatsby"

interface BreadCrumbsProps {
    crumbs: { pathname: string, crumbLabel: string }[]
    isHome?: boolean
}

export default function BreadCrumbs({crumbs, isHome}: BreadCrumbsProps) {

    return (
        <div className={'bread-crumbs'}>
            {crumbs.map((crumb: { pathname: string, crumbLabel: string }, i: number) => {
                return (
                    <span key={i} className={`bread-crumbs__wrapper item${i + 1}`} data-last={i === crumbs.length - 1}>
                        {
                            !isHome && <Link to={crumb?.pathname}>{crumb?.crumbLabel}</Link>
                            
                        }
                    </span>
                )
            })}
        </div>
    )
};