import React from "react"

export default function useLocale() {

    const [lang, setLang] = React.useState(localStorage.getItem('lang') ??  'en')

    React.useEffect(() => {
        const _lang = localStorage.getItem('lang')
        if (_lang) localStorage.setItem('lang', _lang)
    }, [])

    React.useEffect(() => {
        const _lang = localStorage.getItem('lang')
        if (_lang !== lang) {
            localStorage.setItem('lang', lang)
            window.location.href = `http://${window.location.host}${window.location.pathname}`
        }
    },[lang])

    return {
        lang,
        setLang
    }
}