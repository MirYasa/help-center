import React from 'react'
import './index.scss'
import useLocale from '../../hooks/useLocale'

const languages = [
    {
        lang: 'en',
        title: `🇬🇧  English`
    },
    {
        lang: 'ru',
        title: `🇷🇺  Русский`
    },
    {
        lang: 'es',
        title: `🇪🇸  Espanol`
    }
]

export default function LangToggle({location}: any) {
    // const {lang, setLang} = useLocale()
    // const selectLang = languages.find(el => el.lang === lang)
    const selectLang = { lang: 'ru', title: 'He' }

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
                                data-selected={selectLang === el}
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