import React from 'react'
import useLocale from '../../hooks/useLocale'
import { searches } from '../../i18n'
import './index.scss'

export default function Search() {
    const {lang} = useLocale()

    return (
        <div className={'search'}>
            <input
                type="text"
                //@ts-ignore
                placeholder={searches[lang]}
            />
        </div>
    )
};