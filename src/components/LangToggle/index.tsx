import React from 'react'
import { LanguageContext } from '../Header/Header'
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

    const {language, setLanguage} = React.useContext(LanguageContext)

    return (
        <div className={'languages'}>
            <input type="checkbox" id="languages" className={'languages__checkbox'}/>
            <label htmlFor="languages" role={'button'} tabIndex={0} onBlur={closeHandler} className={'languages__label'}>
                Select Language
                <div className={'languages__items'} onClick={(e) => e.preventDefault()} >
                    {
                        languages.map(el =>
                            <div className={'languages__items__item'} key={el.lang}>
                                {el.title}
                            </div>)
                    }
                </div>
            </label>
        </div>
    )
};