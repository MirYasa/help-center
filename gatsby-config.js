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
        "gatsby-plugin-netlify-cms",
    ]
};