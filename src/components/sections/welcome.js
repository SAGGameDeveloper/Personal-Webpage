import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../utils/getEmPixels'

import Arrow from '../arrow'
import Flags from '../flags'
import Title from '../title'
import Particles from '../particles'

import welcome_image from '../../images/welcome-image.svg'

class Welcome extends Component {
  render() {
    return (
      <>
        <Particles/>

        <Title files={ this.props.files } />

        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
        data-aos-duration="1800" id="welcome-section" className="container welcome">
          <Flags/>
          <div className='fake-background'/>
        </div>

        <div className="welcome-image-wrapper">
          <div className="welcome-image">
            <img alt="Welcome" src={ welcome_image } />
          </div>
          <Arrow target_id="about-section"/>
        </div>
      </>
    );
  }
}

Welcome.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Welcome
