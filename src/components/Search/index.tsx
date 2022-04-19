import { Link } from 'gatsby'
import React, { useCallback, useEffect, useState } from 'react'
import useLocale from '../../hooks/useLocale'
import {searches} from '../../i18n'
import './index.scss'


export default function SearchBar({searchQuery, setSearchQuery, posts}: any) {
    
    const {lang} = useLocale()

    const [focus, setFocus] = useState(-1)

    const _posts = React.useMemo(() => {
        return posts?.filter((el: any) => el.Lang === lang).map( (el: any, i: number) => <Link className="search-item" data-order={i} style={{display: 'block'}} to={`/${lang}/${el.category}/${el.slug}`} key={i}>
        <div>{el.title}</div>
    </Link>)
    }, [posts])

    useEffect(() => {
        setFocus(-1)
    }, [_posts])

    const onKeyDown = useCallback((e) => {
        
        if (e.keyCode != '40') return
        
        if (!_posts || !_posts.length) return
        
        if (focus + 1 > _posts.length) return
 
        e.preventDefault()

        setFocus(focus + 1)

    }, [_posts, focus])

    const onKeyUp = useCallback((e) => {
        
        if (e.keyCode != '38') return
        
        if (!_posts || !_posts.length) return
        
        if (focus - 1 < 0) return
 
        e.preventDefault()

        setFocus(focus - 1)

    }, [_posts, focus])

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keydown', onKeyUp)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('keydown', onKeyUp)
        }
    }, [_posts, focus])

    useEffect(() => {
        if (!_posts || !_posts.length) return

        const items: NodeListOf<HTMLLinkElement> = document.querySelectorAll(`.search-item`)
        
        items.forEach((item) => {
            const id = item.getAttribute('data-order')
            if (id && +id === focus) {  
                item.focus()
            }
        })

    }, [focus])

    useEffect(() => {
        if (!_posts || !_posts.length) return

        const item = document.getElementById(`search-item-${focus}`)

        if (item) {
            item.focus()
        }

    }, [_posts, focus])


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
                    {_posts}
                </ul>
            }
        </form>
    )
}