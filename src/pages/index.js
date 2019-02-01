import React from 'react'
import { graphql } from 'gatsby'
//import Img from 'gatsby-image'

// Animate On Scroll library: https://github.com/michalsnik/aos
import AOS from 'aos';
import 'aos/dist/aos.css';

// Sass wrapper
import '../sass/wrapper.scss'

// Components
import Layout from '../components/layout'
import SEO from '../components/seo'
import Navbar from '../components/navbar'
import Flags from '../components/flags'

// Animate On Scroll initialization
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 80, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// Helper function to inject contents into the index from different files.
function inject(files, title) {
  var elementToInject = files.filter(file => file.node.frontmatter.title === title)[0];

  return elementToInject != null?  elementToInject.node.html : 'MISSING CONTENT!!!';
}

export default function Index ( {data} ) {
  const { edges: files } = data.allMarkdownRemark;
  const lang = files[0].node.frontmatter.lang;
  return (
    <Layout>
      <SEO lang={ lang }/>
      <Navbar/>

      <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
      data-aos-duration="1800" id="welcome-section" className="container welcome">
        <Flags/>
        <div className='title'>
          <h1>Sergio Abreu García</h1>

          <br/>
          <h2 dangerouslySetInnerHTML = {{ __html: inject(files, 'subhead') }}/>
        </div>

      </div>

      <div data-aos="fade-right" id="about-section"
      dangerouslySetInnerHTML = {{ __html: inject(files, 'about') }} className = "container about">

      </div>

      <div data-aos="fade-left" id="work-section" className = "container work">
        { files.filter(file=>file.node.frontmatter.tag==="work").map(file => {
          return (<div key={ file.node.frontmatter.title }
                    dangerouslySetInnerHTML = {{ __html: file.node.html }} />);
        }) }
      </div>

      <div data-aos="fade-right" id="skills-section"
      dangerouslySetInnerHTML = {{ __html: inject(files, 'skills') }} className = "container skills">

      </div>

      <div data-aos="fade-left" id="contact-section"
      dangerouslySetInnerHTML = {{ __html: inject(files, 'contact') }} className = "container contact">

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
