import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

class Contact extends Component {
  render() {
    return (
      <div data-aos="fade-left" id="contact-section" className = "container contact">
        <hr/>
        <div className="section-title">
          <h1>How to contact me</h1>
        </div>

        <div dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'contact') }} />
      </div>
    );
  }
}

Contact.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Contact
