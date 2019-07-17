import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

import Icon from '../svgIcon'

class Contact extends Component {
  render() {
    return (
      <div id="contact-section" className = "container contact">
        <div className="ornament"/>
        <div className="vertical-ornament"/>

        <div className="section-title">
          <h1><span className="section-title-capital">C</span>ontact me!</h1>
        </div>

        <div className="contact-wrapper">
          <div className="contact-email"> <a href="mailto:sergio@sag-dev.com" rel="noopener noreferrer"> <Icon name="mail"/> </a> </div>

          <div className="contact-right-wrapper">
            <div dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'contact') }} />
            <div className="contact-icons">
              <a href="https://t.me/sag_dev" target="_blank" rel="noopener noreferrer"> <Icon name="telegram"/> </a>
              <a href="https://www.linkedin.com/in/sergio-abreu-garc%C3%ADa-826520159/" target="_blank" rel="noopener noreferrer"> <Icon name="linkedin"/> </a>
              <a href="https://github.com/sag-dev" target="_blank" rel="noopener noreferrer"> <Icon name="github"/> </a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

Contact.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Contact
