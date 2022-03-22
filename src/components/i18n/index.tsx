import React from 'react'
import { LanguageContext } from "../../context/LanguageContext"

export default function I18NProvider({children}: any) {

    return <LanguageContext.Provider value={{
        language: 'en'
    }}>
        {children}
    </LanguageContext.Provider>
}