import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../title'

class Welcome extends Component {
  render() {
    return (
      <>
        <Title files={ this.props.files } />

        <div id="welcome-section" className="container welcome"/>
      </>
    );
  }
}

Welcome.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Welcome
