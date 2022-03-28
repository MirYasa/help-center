import React from 'react'
import './index.scss'
import useLocale from '../../hooks/useLocale'

const languages = [
    {
        lang: 'en',
        title: `🇬🇧${window.innerWidth > 500 ? '  English': ''}`
    },
    {
        lang: 'ru',
        title: `🇷🇺 ${window.innerWidth > 500 ? '  Русский' : ''}`
    },
    {
        lang: 'es',
        title: `🇪🇸 ${window.innerWidth > 500 ? '  Espanol': ''}`
    }
]

export default function LangToggle({location}: any) {
    const {lang, setLang} = useLocale()
    const selectLang = languages.find(el => el.lang === lang)

    const closeHandler = React.useCallback(e => {
        const target = e.target.control

        if (!target) return

        target.checked = false
    }, [])

    return (
        <div className={'languages'}>
            <input type="checkbox" id="languages" className={'languages__checkbox'}/>
            <label
                htmlFor="languages"
                role={'button'}
                tabIndex={0}
                onBlur={closeHandler}
                className={'languages__label'}>
                <div>{selectLang?.title}</div>
                <ul className={'languages__items'} onClick={(e) => e.preventDefault()}>
                    {
                        languages.map(el =>
                            <li
                                className={'languages__items__item'}
                                key={el.lang}
                                value={el.lang}
                                // @ts-ignore
                                onClick={(e) => setLang(el.lang)}>
                                {el.title}
                            </li>)
                    }
                </ul>
            </label>
        </div>
    )
};