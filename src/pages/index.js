import React, { Component } from 'react'
import { graphql } from 'gatsby'
import isNode from 'detect-node'

// Animate On Scroll library: https://github.com/michalsnik/aos
import AOS from 'aos';
import 'aos/dist/aos.css';

// Sass wrapper
import '../sass/wrapper.scss'

// Components
import Layout from '../components/layout'
import SEO from '../components/seo'
import Navbar from '../components/navbar'

// Sections
import Welcome from '../components/sections/welcome'
import About from '../components/sections/about'
import Work from '../components/sections/work'
import Skills from '../components/sections/skills'
import Contact from '../components/sections/contact'
import Game from '../components/game'

// Animate On Scroll initialization
if (!isNode) AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 70, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

 class Index extends Component {
  constructor(props) {
    super(props);

    this.files = props.data.allMarkdownRemark.edges;
    this.lang = this.files[0].node.frontmatter.lang;
  }

  render () {
    return (
      <Layout>

        <SEO lang={ this.lang }/>
        <Navbar/>

        <Game/>
        <Welcome files={ this.files } />
        <About files={ this.files } />
        <Work files={ this.files } />
        <Skills files={ this.files } />
        <Contact files={ this.files } />

      </Layout>
    )
  }
}

export default Index;

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
            beautifulTitle
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
