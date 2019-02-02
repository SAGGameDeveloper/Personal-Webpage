import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

class Contact extends Component {
  render() {
    return (
      <div data-aos="fade-left" id="contact-section" className = "container contact">
        <div dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'contact') }} />
      </div>
    );
  }
}

Contact.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Contact
