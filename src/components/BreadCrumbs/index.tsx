import React from 'react'
import './index.scss'
import {Link} from "gatsby"


export default function BreadCrumbs({crumbs}: any) {
    return (
        <div className={'bread-crumbs'}>
            {crumbs.map((crumb: any, i: number) => {
                return (
                    <div key={i}>
                        <Link to={crumb.pathname}>
                            {crumb.crumbLabel}
                        </Link>
                        {crumb.crumbSeparator || " / "}
                    </div>
                )
            })}
        </div>
    )
};