import React, { useMemo } from "react"
import { isBrowser } from "../utils/isBrowser"

export default function useLocale() {

    const localStorageLang = useMemo(() => {
        if (!isBrowser) return

        return localStorage.getItem('lang')
    }, [])

    const [lang, setLang] = React.useState(localStorageLang ??  'en')

    React.useEffect(() => {

        if (!isBrowser) return

        const _lang = localStorage.getItem('lang')
        if (_lang) localStorage.setItem('lang', _lang)
    }, [])

    React.useEffect(() => {

        if (!isBrowser) return

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