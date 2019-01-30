import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import '../sass/wrapper.scss'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Flags from '../components/flags'

// Helper function to inject contents into the index from different files.
function inject(files, title) {
  var elementToInject = files.filter(file => file.node.frontmatter.title === title)[0];

  return elementToInject != null?  elementToInject.node.html : 'MISSING CONTENT!!!';
}

export default function Index ( {data} ) {
  const { edges: files } = data.allMarkdownRemark;
  return (
    <Layout>


      <div id="welcome-section" class="container welcome">

        <div id="welcomeImage"> <Img  fluid={data.welcomeImage.childImageSharp.fluid}/></div>

        <Flags/>

        <Navbar/>

        <div class='title'>
          <h1>Sergio Abreu García</h1>
          <br/>
          <h2 dangerouslySetInnerHTML = {{ __html: inject(files, 'subhead') }}/>
        </div>

      </div>

      <div id="about-section" dangerouslySetInnerHTML = {{ __html: inject(files, 'about') }} class = "container about">

      </div>

      <div id="work-section" class = "container work">
        { files.filter(file=>file.node.frontmatter.tag==="work").map(file => {
          return (<div key={ file.node.frontmatter.title } dangerouslySetInnerHTML = {{ __html: file.node.html }} />);
        }) }
      </div>

      <div id="skills-section" dangerouslySetInnerHTML = {{ __html: inject(files, 'skills') }} class = "container skills">

      </div>

      <div id="contact-section" dangerouslySetInnerHTML = {{ __html: inject(files, 'contact') }} class = "container contact">

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
