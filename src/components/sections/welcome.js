import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Flags from '../flags'
import Title from '../title'

class Welcome extends Component {
  render() {
    return (
      <>

        <Title files={ this.props.files } />

        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
        data-aos-duration="1800" id="welcome-section" className="container welcome">
          <Flags/>
          <div className='fake-background'>
            <hr/>
          </div>
        </div>


      </>
    );
  }
}

Welcome.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Welcome
