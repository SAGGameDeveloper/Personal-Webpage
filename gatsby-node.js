/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const config = require('./gatsby-config.js');
const languages = config.siteMetadata.languages;
const defaultLanguage = languages[0];

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Create a different page for each language, the context delivers the
  // given language to the query, so it can retrieve the appropiate
  // files.

  return new Promise((resolve, reject) => {
    deletePage(page)
    languages.forEach((language) => {
      let newPage = Object.assign({}, page, {
        originalPath: page.path,
        path: language === defaultLanguage ? page.path : '/' + language + page.path,
        context: {
          lang: language
        }
      })

      createPage(newPage)
    })

    resolve()
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollmagic/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
