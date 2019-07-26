module.exports = {
  siteMetadata: {
    title: { en: `Sergio Abreu García`,
              es: `Sergio Abreu García`,
              gl: `Sergio Abreu García`,
            },
    author: `Sergio Abreu García`,
    languages: ['en', 'gl', 'es'],
    description: { en: `Sergio Abreu García, software developer`,
                   gl: `Sergio Abreu García, desarrollador de software`,
                   es: `Sergio Abreu García, desarrollador de software`,
                 },
    url: 'https://sag-dev.com',
    keywords:{ general: ["sergio", "abreu", "garcía", "software",
                        "portfolio", "frontend", "backend", "cv", "resume",
                        "web"],
               en: ["english", "developer", "programmer", "coder"],
               gl: ["galego", "desarrollador", "programador"],
               es: ["español", "desarrollador", "programador"],
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
        icon: `src/images/favicon.png`, // Relative to the root of the site.
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
