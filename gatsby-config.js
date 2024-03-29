const _ = require("lodash")

module.exports = {
  siteMetadata: {
    title: `jyoon blog version2`,
    description: `jyoon blog version2`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          maxDepth: 3,
        },
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: fluidResult =>
                `flex:${_.round(fluidResult.aspectRatio, 2)};`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
            },
          },
          {
            resolve: "gatsby-remark-emojis",
            options: {
              active: true,
              class: "emoji-icon",
              size: 64,
              styles: {
                display: "inline",
                margin: "0",
                "margin-top": "1px",
                position: "relative",
                top: "5px",
                width: "25px",
              },
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-katex`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/_posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/_posts/_images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/devto.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
