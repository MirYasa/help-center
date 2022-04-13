import { Link } from 'gatsby'
import React from 'react'
import useLocale from '../../hooks/useLocale'
import {searches} from '../../i18n'
import './index.scss'


export default function SearchBar({searchQuery, setSearchQuery, posts}: any) {
    // const {lang} = useLocale()
    const lang = 'ru'

    const _posts = React.useMemo(() => posts?.filter((el: any) => el.lang === lang) ,[posts])

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            className={'search'}
            onSubmit={(e) => e.preventDefault()}
            data-searched={_posts?.length !== 0}
        >
            <input
                value={searchQuery}
                //@ts-ignore
                onInput={(e) => setSearchQuery(e.target.value)}
                type="text"
                id="header-search"
                //@ts-ignore
                placeholder={searches[lang]}
                name="s"
            />
            {
                _posts?.length !== 0 &&
                <ul>
                    {
                        _posts?.map((el: any) =>
                            <Link style={{display: 'block'}} className="m-b-1" to={`/${lang}/${el.category}/${el.slug}`} key={el.title}>
                                <div style={{fontSize: '21px'}}>{el.title}</div>
                            </Link>
                        )
                    }
                </ul>
            }
        </form>
    )
}