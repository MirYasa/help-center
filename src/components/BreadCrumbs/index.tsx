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
                    <div key={i} className={'bread-crumbs__wrapper'} data-last={i === crumbs.length - 1}>
                        {
                            !isHome && (
                                <>
                                    <Link to={crumb?.pathname}>{crumb?.crumbLabel}</Link>
                                    {i !== crumbs.length - 1 && '/'}
                                </>
                            )
                        }
                    </div>
                )
            })}
        </div>
    )
};