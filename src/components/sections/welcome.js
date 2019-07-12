import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../title'
import Flags from '../flags'

class Welcome extends Component {
  componentDidMount() {
    this.corner_text = document.querySelector(".corner-text");
    this.fake_background = document.querySelector(".fake-background");
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize();
  }

  onResize() {
    let ratio = this.fake_background.getBoundingClientRect().height/this.fake_background.getBoundingClientRect().width;
    this.corner_text.style.left = ratio * this.fake_background.getBoundingClientRect().width/2 + 'px';
    console.log(ratio);
  }

  render() {
    return (
      <>
        <Title files={ this.props.files } />

        <div id="welcome-section" className="container welcome">
          <Flags/>
          <div className="fake-background">
            <div className="corner-text">
              <span>WELCOME</span>
              <br/>
              <span>SCROLL</span>
            </div>
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
