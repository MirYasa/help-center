const React = require("react")
exports.createPages = async function ({actions, graphql}) {
    const categories = [
        'getting-started',
        'liquidity',
        'farm',
        'stake'
    ]

    const {data} = await graphql(`
    query {
        allMdx {
            nodes {
              frontmatter {
                category
                lang
                id
                title
                Is_FAQ
              }
              slug
            }
        }
    }
  `)

    let articlesIds = {}

    data.allMdx.nodes.forEach((_el, i) => {
        articlesIds = {
            ...articlesIds,
            [_el.frontmatter.ID]: {
                ...articlesIds[_el.frontmatter.ID],
                [_el.frontmatter.Lang]: _el.slug
            }
        }
    })

    const locals = ['en/', 'ru/', 'es/']
    
    locals.forEach(lang => {
        actions.createPage({
            path: `/${lang}`,
            context: { categoriesData: data.allMdx.nodes.filter( _el => _el.frontmatter.Lang === lang.slice(0,2) ) },
            component: require.resolve('./src/components/main/index.tsx'),
        })
    })

    categories.forEach(el => {

        locals.forEach(_lang => {

            actions.createPage({
                path: `/${_lang}${el}`,
                component: require.resolve('./src/components/articles/articles.tsx'),
                context: {category: el},
            })

            data.allMdx.nodes.forEach((_el, i) => {
                if (_el.frontmatter.Lang !== _lang.slice(0, 2)) return
                if (_el.frontmatter.category === el) {
                        actions.createPage({
                            path: `/${_lang}${el}/${_el.slug}`,
                            component: require.resolve(`./src/components/article/index.tsx`),
                            context: {slug: _el.slug, backlink: el, ids: articlesIds, otherArticles: data.allMdx.nodes.filter( node => node.frontmatter.Lang === _lang.slice(0,2) && node.frontmatter.category === el && node.frontmatter['Is_FAQ'] !== '1' )}
                        })
                }
            })
        })
    })

    actions.createRedirect({
        fromPath: '/',
        toPath: '/en/',
        isPermanent: true,
        redirectInBrowser: true,
     })

}