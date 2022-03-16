/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
    siteMetadata: {
        title: `Algebra Help Center`,
        siteUrl: `https://www.yourdomain.tld`
    },
    plugins: [
        "gatsby-plugin-netlify-cms",
        "gatsby-plugin-sass",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-remark",
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
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/icon.png"
            }
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "article",
                "path": `${__dirname}/blog`
            }
        }
    ]
};