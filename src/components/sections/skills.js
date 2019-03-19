import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

import Arrow from '../../components/arrow'

var odd = true;

class Skills extends Component {
  render() {
    return (
      <div id="skills-section" className = "container skills">
        <hr/>
        <div data-aos="fade-down" className="section-title">
          <h1><span className="section-title-capital">W</span>hat I can do</h1>
        </div>

        <div className="skills-wrapper">
          { this.props.files.filter(file=>file.node.frontmatter.tag==="skills").map(file => {
            odd = !odd;
            return (
                <div data-aos="fade-right" key={ file.node.frontmatter.title } className="skills-element-wrapper">
                  <div className={ "skills-element " + (odd? "skills-odd-element" : "") }>
                    <div className="skills-element-image">
                      <img alt={ file.node.frontmatter.title } src={withPrefix('/images/skills/'+file.node.frontmatter.title+'.png')} />
                    </div>
                    <div className="skills-element-content" dangerouslySetInnerHTML = {{ __html: file.node.html }} />
                  </div>
                </div>
            );
          }) }
        </div>
        <Arrow target_id="contact-section"/>
      </div>
    );
  }
}

Skills.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Skills
