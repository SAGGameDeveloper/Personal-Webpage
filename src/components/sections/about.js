import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'
import Arrow from '../../components/arrow'

class About extends Component {
  render() {
    return (
      <div id="about-section" className = "container about">
        <div data-aos="fade-down" className="section-title">
          <h1><span className="section-title-capital">W</span>ho I am</h1>
        </div>

        <div className="about-content">
          <div data-aos="fade-right" className="about-text" dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'about') }} />
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
