import { Link } from "gatsby"
import React, { useCallback, useMemo } from 'react'
import { ChevronDown, Menu, X } from "react-feather"
import { categories } from "../../i18n"
import './index.scss'

export default function SideMenu ({articles, guides, faq, slug, title, lang, category}: any) {

    const [menu, toggleMenu] = React.useState(false)

    const currentCategory = useMemo(() => {
        //@ts-ignore
        return categories[category]['en']
    }, [category])

    const otherCategories = useMemo(() => {
        return Object.entries(categories).filter(([_category]: any) => _category !== category && _category !== 'faq' ).map(([_category, _title]: any) => ({
            title: _title['en'],
            link: _category
        }))
    }, [])

    function renderMenu() {
        return <div>
        <div className="side-menu__category-title b m-b-05">{currentCategory}</div>
        <div style={{paddingLeft: '1rem'}}>
            <div className="b" style={{padding: '8px 0 8px 0'}}>Essentials</div>
            <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
            {
                articles.length && articles.map((article: any) => <li className={`article__side-link ${slug === article.slug ? 'active' : '' }`} key={article.id}>
                      <Link className={'articles__link m-t-0'} style={{ padding: '8px 1rem', display: 'block', color: 'black', textDecoration: 'none'}} to={`/${lang}/${article.frontmatter.category}/${article.slug}`}>{article.frontmatter.title}</Link>
                </li>)
            }
            </ul>
        </div>
        <div style={{paddingLeft: '1rem'}}>
            <div className="b" style={{padding: '8px 0rem 8px 0rem'}}>Guides</div>
            <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
            {
                guides.length && guides.map((guide: any) => <li className={`article__side-link ${slug === guide.slug ? 'active' : '' }`} key={guide.id}>
                      <Link className={'articles__link m-t-0'} style={{ padding: '8px 1rem', display: 'block', color: 'black', textDecoration: 'none'}} to={`/${lang}/${guide.frontmatter.category}/${guide.slug}`}>{`${guide.frontmatter.title}`}</Link>
                </li>)
            }
            </ul>
        </div>
        <div className="m-b-1" style={{paddingLeft: '1rem'}}>
            <div className="b" style={{padding: '8px 0 8px 0'}}>FAQ</div>
            <ul style={{margin: '0', paddingLeft: '0', listStyleType: 'none'}}>
            {
                faq.length && faq.map((question: any) => <li className={`article__side-link ${slug === question.slug ? 'active' : '' }`} key={question.id}>
                      <Link className={'articles__link m-t-0'} style={{ padding: '8px 1rem', display: 'block', color: 'black', textDecoration: 'none'}} to={`/${lang}/${question.frontmatter.category}/${question.slug}`}>{question.frontmatter.title}</Link>
                </li>)
            }
            </ul>
        </div>
        {
            otherCategories.map((_category, i) => <div className="m-b-1" key={i}> 
            <Link to={`/en/${_category.link}`} className="side-menu__category-title other b" >{_category.title}</Link>
            </div>
            )
        }
    </div>
    }

    const handleToggler = useCallback(() => {
        if (menu) {
            document.body.style.overflow = 'auto'
            toggleMenu(false)
        } else {
            document.body.style.overflow = 'hidden'
            toggleMenu(true)
        }
    }, [menu])

    return <>
    <div className="side-menu-wrapper full-h m-l-a p-t-1" style={{minWidth: '300px', maxWidth: '300px', position: 'sticky', top: 0}}>
    {renderMenu()} 
    </div>
    <div className="side-menu-wrapper--mobile ac jb" style={{display: menu ? 'none' : ''}}>
        <span className="side-menu-full-menu__title">{title}</span>
        <span><Menu display={'block'} size={'18px'} onClick={handleToggler}/></span>
    </div>
    { menu && <div className={`side-menu-full-menu f c`}>
            <div className="side-menu-full-menu__header f jb full-w p-2">
                <span className="side-menu-full-menu__title b">{title}</span>
                <X display={'block'} size={'18px'} onClick={handleToggler}/>
            </div>
            <div className="p-2 p-t-1" style={{overflow: 'auto'}}>
            {renderMenu()}
            </div>
        </div>
}
    </>
}