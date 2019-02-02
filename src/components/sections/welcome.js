import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

import Arrow from '../../components/arrow'
import Flags from '../../components/flags'

class Welcome extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('scroll', () => (this.onScroll()));
  }

  componentDidMount() {
    this.title = document.querySelector("#title");
  }

  onScroll() {
    if (this.title.getBoundingClientRect().top <= 50) {
      this.title.classList.add('title-logo');
    }
  }

  render() {
    return (
      <>
        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
        data-aos-duration="1800" className='title' id='title'>
          <h1>Sergio Abreu García</h1>
          <br/>
          <h2 dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'subtitle') }}/>
        </div>

        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
        data-aos-duration="1800" id="welcome-section" className="container welcome">
          <Flags/>

          <Arrow target_id="about-section"/>
        </div>
      </>
    );
  }
}

Welcome.propTypes = {
  files: PropTypes.isRequired,
}

export default Welcome
