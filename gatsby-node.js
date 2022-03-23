const React = require("react")
exports.createPages = async function ({actions, graphql}) {
    const categories = [
        'getting-started',
        'swap',
        'liquidity',
        'farm',
        'stake',
        'faq'
    ]

    const {data} = await graphql(`
    query {
        allMdx {
            nodes {
              frontmatter {
                category
                lang
                id
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

    categories.forEach(el => {
        ['en/', 'ru/', 'es/', ''].forEach(lang => {
            actions.createPage({
                path: `/${lang}`,
                component: require.resolve('./src/pages/index.tsx'),
            })

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
                        context: {slug: _el.slug, backlink: el, ids: articlesIds}
                    })
                }
            })
        })
    })
}