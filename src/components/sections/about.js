import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

import Arrow from '../../components/arrow'

class About extends Component {
  render() {
    return (
      <div data-aos="fade-right" id="about-section" className = "container about">
        <hr/>
        <div className="section-title">
          <h1>Who I am</h1>
        </div>

        <div dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'about') }} />

        <Arrow target_id="work-section"/>
      </div>
    );
  }
}

About.propTypes = {
  files: PropTypes.array.isRequired,
}

export default About
