import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Icon from '../svgIcon'
import Arrow from '../../components/arrow'

var odd = true;

class Skills extends Component {
  render() {
    return (
      <div id="skills-section" className = "container skills">
        <div className="section-title">
          <h1><span className="section-title-capital">W</span>hat I can do</h1>
        </div>

        <div className="skills-wrapper">
          { this.props.files.filter(file=>file.node.frontmatter.tag==="skills").map(file => {
            odd = !odd;
            return (
                <div key={ file.node.frontmatter.title } className="skills-element-wrapper">
                  <div className={ "skills-element " + (odd? "skills-odd-element" : "") }>
                    <div className="skills-element-image">
                      <Icon name={ file.node.frontmatter.title } />
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
