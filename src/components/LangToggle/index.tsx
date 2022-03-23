import React from 'react'
import './index.scss'
import useLocale from '../../hooks/useLocale'

const languages = [
    {
        lang: 'en',
        title: "🇬🇧  English"
    },
    {
        lang: 'ru',
        title: "🇷🇺  Русский"
    },
    {
        lang: 'es',
        title: "🇪🇸  Espanol"
    }
]

export default function LangToggle({location}: any) {

    const closeHandler = React.useCallback(e => {
        const target = e.target.control

        if (!target) return

        target.checked = false
    }, [])

    // const {language, setLanguage} = React.useContext(LanguageContext)

    const { lang, setLang } = useLocale()

    // const [language, setLanguage] = React.useState('en')

    const selectLang = languages.find(el => el.lang === lang)

    return (
        <div className={'languages'}>
            <input type="checkbox" id="languages" className={'languages__checkbox'}/>
            <label htmlFor="languages" role={'button'} tabIndex={0} onBlur={closeHandler}
                   className={'languages__label'}>
                <span>{selectLang?.title}</span>
                <div className={'languages__items'} onClick={(e) => e.preventDefault()}>
                    {
                        languages.map(el =>
                            <option
                                className={'languages__items__item'}
                                key={el.lang}
                                value={el.lang}
                                // @ts-ignore
                                onClick={(e) => setLang(el.lang)}>
                                {el.title}
                            </option>)
                    }
                </div>
            </label>
        </div>
    )
};