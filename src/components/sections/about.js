import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'
import Arrow from '../../components/arrow'
import Icon from '../svgIcon'


class About extends Component {
  render() {
    let odd = true;
    let title_file = this.props.files.filter(file =>
      file.node.frontmatter.title === 'about_title')[0];
    let title = title_file.node.frontmatter.beautifulTitle;

    return (
      <div id="about-section" className = "container about">
        <div className="about-fake-background"/>
        <div className="section-title about-title">
          <h1 className="glitch" data-text={ title }>{ title }</h1>
        </div>

        <div className="about-content">
          <div className="about-description" dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'about') }} />

          <div id="about-skills" className = "skills-wrapper">
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

        </div>

        <Arrow target_id="work-section"/>
      </div>
    );
  }
}

About.propTypes = {
  files: PropTypes.array.isRequired,
}

export default About
