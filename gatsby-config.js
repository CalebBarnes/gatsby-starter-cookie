module.exports = {
  siteMetadata: {
    title: `Logo`,
    description: `A simple Gatsby theme with my essentials preconfigured.`,
    author: `Caleb Barnes`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-layout`,
    `gatsby-plugin-styled-components`,
  ],
}
