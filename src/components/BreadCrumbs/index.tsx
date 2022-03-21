import React from 'react'
import './index.scss'
import {Link} from "gatsby"

interface BreadCrumbsProps {
    crumbs: {
        pathname: any
        crumbLabel: string
        crumbSeparator: string
    }[]
    isHome?: boolean
}

export default function BreadCrumbs({crumbs, isHome}: BreadCrumbsProps) {
    return (
        <div className={'bread-crumbs'}>
            {crumbs.map((crumb: any, i: number) => {
                return (
                    <div key={i}>
                        {
                            !isHome && (
                                <>
                                    <Link to={crumb.pathname}>{crumb.crumbLabel}</Link>
                                    {crumb.crumbLabel ? crumb.crumbSeparator || " / " : ''}
                                </>
                            )
                        }
                    </div>
                )
            })}
        </div>
    )
};