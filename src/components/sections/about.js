import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

import Arrow from '../../components/arrow'

class About extends Component {
  render() {
    return (
      <div data-aos="fade-right" id="about-section" className = "container about">
        <div dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'about') }} />

        <Arrow target_id="work-section"/>
      </div>
    );
  }
}

About.propTypes = {
  files: PropTypes.isRequired,
}

export default About
