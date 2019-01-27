import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'

import '../sass/wrapper.scss'

// Helper function to inject contents into the index from different files.
function inject(files, title) {
  return files.filter(file => file.node.frontmatter.title === title)[0].node.html;
}

export default function Index ( {data} ) {
  const { edges: files } = data.allMarkdownRemark;
  return (
    <Layout>
      <div class="container welcome">

      <div id="welcomeImage"> <Img  fluid={data.welcomeImage.childImageSharp.fluid}/> </div>

        <h1>Sergio Abreu García</h1>
        <h2 dangerouslySetInnerHTML = {{ __html: inject(files, 'subhead') }}/>
      </div>

      <div dangerouslySetInnerHTML = {{ __html: inject(files, 'about') }} class = "container about">

      </div>

      <div class = "container work">
        { files.filter(file=>file.node.frontmatter.tag==="work").map(file => {
          return (<div dangerouslySetInnerHTML = {{ __html: file.node.html }} />);
        }) }
      </div>

      <div dangerouslySetInnerHTML = {{ __html: inject(files, 'skills') }} class = "container skills">

      </div>

      <div dangerouslySetInnerHTML = {{ __html: inject(files, 'contact') }} class = "container contact">

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
            tag
          }
        }
      }
    }

    welcomeImage: file( relativePath: { eq: "welcomeImage.jpg" } ) {
      childImageSharp {
        fluid( quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
