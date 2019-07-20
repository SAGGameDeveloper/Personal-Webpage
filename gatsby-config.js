module.exports = {
  pathPrefix: `/Personal-Webpage`,

  siteMetadata: {
    title: { en: `Sergio Abreu García | Software developer`,
              es: `Sergio Abreu García | Desarrollador de software`,
              gl: `Sergio Abreu García | Desarrollador de software`,
            },
    author: `Sergio Abreu García`,
    languages: ['en', 'gl', 'es'],
    description: { en: `Portfolio website of Sergio Abreu García, software developer.`,
                   gl: `Páxina portfolio de Sergio Abreu García, desarrollador de software`,
                   es: `Página portfolio de Sergio Abreu García, desarrollador de software`,
                 },
    url: 'https://sag-dev.com',
    keywords:{ general: ["sergio", "abreu", "garcía", "software",
                        "blockchain", "portfolio", "frontend", "backend", "cv"],
               en: ["english", "developer"],
               gl: ["galego", "desarrollador"],
               es: ["español", "desarrollador"],
             },
  },
  plugins: [
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
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        include_favicon: true,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,

    'gatsby-plugin-sass',

    {
      resolve: `gatsby-plugin-layout`,
      options: {
          component: require.resolve(`./src/components/layout.js`)
      }
    },
  ],
}
