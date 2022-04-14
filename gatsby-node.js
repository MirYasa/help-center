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
                isFaq
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
            [_el.frontmatter.id]: {
                ...articlesIds[_el.frontmatter.id],
                [_el.frontmatter.lang]: _el.slug
            }
        }
    })

    const langArr = ['en/', 'ru/', 'es/', '']

    langArr.forEach(lang => {
        actions.createPage({
            path: `/${lang}`,
            context: { categoriesData: data.allMdx.nodes.filter( _el => _el.frontmatter.lang === lang.toUpperCase().slice(0,2)) },
            component: require.resolve('./src/pages/index.tsx'),
        })

    categories.forEach(el => {

            actions.createPage({
                path: `/${lang}${el}`,
                component: require.resolve('./src/components/articles/articles.tsx'),
                context: {category: el},
            })

            data.allMdx.nodes.forEach((_el, i) => {
                if (_el.frontmatter.lang !== lang.slice(0, 2)) return
                if (_el.frontmatter.category === el) {
                    actions.createPage({
                        path: `/${lang}${el}/${_el.slug}`,
                        component: require.resolve(`./src/components/article/index.tsx`),
                        context: {slug: _el.slug, backlink: el, ids: articlesIds, otherArticles: data.allMdx.nodes.filter( node => node.frontmatter.lang === lang.slice(0,2) && node.frontmatter.category === el )}
                    })
                }
            })
        })
    })
}