import React from 'react'
import './index.scss'

const languages = [
    {
        lang: 'en',
        title: "🇬🇧ㅤEnglish"
    },
    {
        lang: 'ru',
        title: "🇷🇺ㅤРусский"
    },
    {
        lang: 'es',
        title: "🇪🇸ㅤEspanol"
    }
]

export default function LangToggle() {

    const closeHandler = React.useCallback(e => {
        const target = e.target.control

        if (!target) return

        target.checked = false
    }, [])

    // const {language, setLanguage} = React.useContext(LanguageContext)

    const [language, setLanguage] = React.useState('en')

    const selectLang = languages.filter(el => el.lang === language)[0]

    React.useEffect(() => {

        const _lang = localStorage.getItem('lang')

        if (_lang) {
            setLanguage(_lang)
            return
        }
        
    }, [])

    React.useEffect(() => localStorage.setItem('lang', language), [language])

    return (
        <div className={'languages'}>
            <input type="checkbox" id="languages" className={'languages__checkbox'}/>
            <label htmlFor="languages" role={'button'} tabIndex={0} onBlur={closeHandler}
                   className={'languages__label'}>
                <span>{selectLang.title}</span>
                <div className={'languages__items'} onClick={(e) => e.preventDefault()}>
                    {
                        languages.map(el =>
                            <option
                                className={'languages__items__item'}
                                key={el.lang}
                                value={el.lang}
                                // @ts-ignore
                                onClick={(e) => setLanguage(e.target.value)}>
                                {el.title}
                            </option>)
                    }
                </div>
            </label>
        </div>
    )
};