import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../title'
import Flags from '../flags'
import Scroll from '../../utils/scroll'

class Welcome extends Component {
  componentDidMount() {
    this.welcome_section = document.querySelector("#welcome-section");
    this.welcome_section.addEventListener('click', this.onClick.bind(this));
    this.welcome_section.addEventListener('touchstart', this.onClick.bind(this));
  }

  onClick(e) {
    if (e.target === this.welcome_section)
      Scroll.scrollTo("#welcome-section", 0, true)
  }

  render() {
    return (
      <>
        <div id="welcome-section" className="container welcome">
          <Flags/>
          <Title files={ this.props.files } />
          <div className="fake-background">
            <div className="corner-text"/>
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
