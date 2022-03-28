/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
    siteMetadata: {
        title: `Algebra Help Center`,
        siteUrl: `https://www.yourdomain.tld`
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/assets`,
                name: 'assets'
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "article",
                "path": `${__dirname}/blog`
            }
        },
        `gatsby-plugin-sharp`,
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            maxWidth: 590,
                        }
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 700,
                        },
                    },
                ]
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/icon.png"
            }
        },
        {
            resolve: `gatsby-plugin-breadcrumb`,
            options: {
                useAutoGen: true,
                defaultCrumb: {
                    location: {
                        pathname: "/",
                    },
                    crumbLabel: "Home",
                    crumbSeparator: " / ",
                }
            }
        },
        {
            resolve: 'gatsby-plugin-local-search',
            options: {
                name: 'pages',
                engine: 'flexsearch',
                engineOptions: {
                    language: "ru",
                    // split: /[a-z, A-Z, а-я , А-Я]/gm,
                },
                query: `
                  query Search {
                      allMdx {
                        nodes {
                        excerpt
                        slug
                          frontmatter {
                            title
                            date(formatString: "MMMM D, YYYY")
                            lang
                            category
                          }
                        }
                      }
                    }
                `,
                ref: 'slug',
                index: ['title', 'excerpt'],
                store: ['date', 'title', 'slug', 'excerpt', 'lang', 'category'],
                normalizer: ({data}) =>
                    data.allMdx.nodes.map((node) => ({
                        title: node.frontmatter.title,
                        date: node.frontmatter.date,
                        excerpt: node.excerpt,
                        slug: node.slug,
                        lang: node.frontmatter.lang,
                        category: node.frontmatter.category,
                    })),
            },
        },
        "gatsby-plugin-anchor-links",
        "gatsby-plugin-netlify-cms",
    ]
};