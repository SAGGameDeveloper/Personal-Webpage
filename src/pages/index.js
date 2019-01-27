import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

// Helper function to inject contents into the index from different files.
function inject(files, title) {
  return files.filter(file => file.node.frontmatter.title === title)[0].node.html;
}

export default function Index ( {data} ) {
  const { edges: files } = data.allMarkdownRemark;
  return (
    <Layout>
      <div class="container">
        <h1>Sergio Abreu García</h1>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Link to="/gl"> <Image /> </Link>
        </div>

        { inject(files, 'about') }

      </div>
    </Layout>
  )
}

// Queries every content file, those will be used to build the final index
// through the 'inject' function. The language is given by the context on
// page creation (see 'gatsby-node.js' for more details).
export const pageQuery = graphql`
  query ($lang: String!) {
    allMarkdownRemark ( filter: {frontmatter: {lang: {eq: $lang}}} ) {
      edges {
        node {
          html
          frontmatter {
            title
            lang
          }
        }
      }
    }
  }
`
