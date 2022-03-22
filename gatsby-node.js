const React = require("react")
exports.createPages = async function ({actions, graphql}) {
    const categories = [
        {
            title: 'Getting Started',
            description: 'Learn the basics about the Algebra',
            category: 'getting-started'
        },
        {
            title: 'Swap',
            description: 'Learn how to swap tokens on Algebra',
            category: 'swap'
        },
        {
            title: 'Provide Liquidity',
            description: 'Learn how to earn yield by providing liquidity on Algebra',
            category: 'liquidity'
        },
        {
            title: 'FAQ',
            description: 'Frequently asked questions',
            category: 'faq'
        }
    ]

    const {data} = await graphql(`
    query {
        allMdx {
            nodes {
              frontmatter {
                category
                lang
              }
              slug
            }
        }
    }
  `)

    categories.forEach(el => {
        ['en/', 'ru/', 'es/', ''].forEach(lang => {
            actions.createPage({
                path: `/${lang}`,
                component: require.resolve('./src/pages/index.tsx'),
            })

            actions.createPage({
                path: `/${lang}${el.category}`,
                component: require.resolve('./src/components/articles/articles.tsx'),
                context: {category: el.category},
            })

            data.allMdx.nodes.forEach((_el, i) => {
                if (_el.frontmatter.lang !== lang.slice(0,2)) return
                if (_el.frontmatter.category === el.category) {
                    actions.createPage({
                        path: `/${lang}${el.category}/${_el.slug}`,
                        component: require.resolve(`./src/components/article/index.tsx`),
                        context: {slug: _el.slug, backlink: el.category}
                    })
                }
            })
        })
    })
}