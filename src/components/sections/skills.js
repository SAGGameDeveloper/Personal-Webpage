import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

import Arrow from '../../components/arrow'

var side = "left"
var oppositeSide = "right"

class Skills extends Component {
  render() {
    return (
      <div data-aos="fade-right" id="skills-section" className = "container skills">
        <hr/>
        <div className="section-title">
          <h1>What I can do</h1>
        </div>

        <div className="skills-wrapper">
          { this.props.files.filter(file=>file.node.frontmatter.tag==="skills").map(file => {
            let temp = oppositeSide;
            oppositeSide = side;
            side = temp;
            return (
                <div data-aos={ "fade-"+oppositeSide } key={ file.node.frontmatter.title } className={ "skills-element-wrapper-"+side }>
                  <div className="skills-element">
                    <div className={ "skills-element-content-"+side } dangerouslySetInnerHTML = {{ __html: file.node.html }} />
                    <div className="skills-element-image">
                      <img alt={ file.node.frontmatter.title }  src={withPrefix('/images/skills/'+file.node.frontmatter.title+'.png')} />
                    </div>
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
