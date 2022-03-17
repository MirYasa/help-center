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
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    'gatsby-remark-copy-linked-files',
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
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