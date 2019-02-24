import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

import email_icon from '../../images/emailIcon.svg'
import github_icon from '../../images/githubIcon.svg'
import telegram_icon from '../../images/telegramIcon.svg'
import linkedin_icon from '../../images/linkedinIcon.svg'

class Contact extends Component {
  render() {
    return (
      <div data-aos="fade-left" id="contact-section" className = "container contact">
        <hr/>
        <div className="section-title">
          <h1><span className="section-title-capital">C</span>ontact me!</h1>
        </div>

        <div className="contact-wrapper">
          <div className="contact-email"> <a href="mailto:sergio@sag-dev.com" target="_blank" rel="noopener noreferrer"> <img alt="email_icon" src={email_icon} /> </a> </div>

          <div className="contact-right-wrapper">
            <div dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'contact') }} />
            <div className="contact-icons">
              <a href="https://t.me/sag_dev" target="_blank" rel="noopener noreferrer"> <img alt="telegram_icon" src={telegram_icon} /> </a>
              <a href="https://www.linkedin.com/in/sergio-abreu-garc%C3%ADa-826520159/" target="_blank" rel="noopener noreferrer"> <img alt="linkedin_icon" src={linkedin_icon} /> </a>
              <a href="https://github.com/sag-dev" target="_blank" rel="noopener noreferrer"> <img alt="github_icon" src={github_icon} /> </a>
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
