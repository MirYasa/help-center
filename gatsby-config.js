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
        "gatsby-plugin-mdx",
        {
            resolve: `gatsby-plugin-breadcrumb`,
            options: {
                defaultCrumb: {
                    // location: required and must include the pathname property
                    location: {
                        pathname: "/",
                    },
                    // crumbLabel: required label for the default crumb
                    crumbLabel: "Home",
                    // all other properties optional
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
                "path": `${__dirname}/blog/`
            }
        }
    ]
};