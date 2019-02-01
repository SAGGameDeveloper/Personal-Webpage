import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {

        const metaDescription = description || data.site.siteMetadata.description[lang];
        keywords = keywords.concat(data.site.siteMetadata.keywords.general).concat(data.site.siteMetadata.keywords[lang]);
        title = title || data.site.siteMetadata.title[lang];

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={ title }
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:url`,
                content: data.site.siteMetadata.url,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:site_name`,
                content: title,
              },
              {
                name: `og:image`,
                content: `MISSING`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                name: `twitter:image`,
                content: `MISSING`,
              },
              {
                name: `robots`,
                content: `index, follow`,
              },
              {
                name: `viewport`,
                content: `width=device-width,initial-scale=1`,
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
            >
            <link rel="canonical" href="https://sag-dev.com"/>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title {
          en
          es
          gl
        }
        description {
          en
          es
          gl
        }
        author
        url
        keywords {
          general
          en
          gl
          es
        }
      }
    }
  }
`
