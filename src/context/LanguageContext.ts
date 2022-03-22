import React from "react";

export const LanguageContext = React.createContext({
    language: 'en',
    setLanguage: (lang: string) => {}
})