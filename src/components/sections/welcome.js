import React, { Component } from 'react'
import PropTypes from 'prop-types'
import inject from '../../utils/injector'

import Arrow from '../../components/arrow'
import Flags from '../../components/flags'

import Scroll from '../../utils/scroll'

import welcome_image from '../../images/welcome-image.svg'

const welcome_image_anchor = 50;
const welcome_image_threshold = 300;

class Welcome extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('scroll', () => (this.onScroll()));
    window.addEventListener('scroll', () => (this.welcomeImage_update_opacity()));
    window.addEventListener('resize', () => (this.welcomeImage_update_opacity()));
  }

  componentDidMount() {
    this.title = document.querySelector(".title");
    this.title_lower_caps = this.title.getElementsByClassName("title-lower-caps");
    this.subtitle = this.title.querySelector(".subtitle");

    this.title_placeholder = document.querySelector(".title-placeholder");

    this.title_as_logo = false;

    this.maintitle_helper = this.title.querySelector(".maintitle-helper");
    this.maintitle_helper.onclick = () => (Scroll.scrollTo("#welcome-section"));

    this.welcomeImage = document.querySelector(".welcome-image");
  }

  title_to_logo() {
    this.title.classList.add('title-logo');
    [].forEach.call(this.title_lower_caps,  (text) => (text.classList.add('inactive-title')));
    this.subtitle.classList.add('inactive-title');
    this.maintitle_helper.classList.add('maintitle-clickable');

    this.title_as_logo = true;
  }

  logo_to_title() {
    this.title.classList.remove('title-logo');
    [].forEach.call(this.title_lower_caps,  (text) => (text.classList.remove('inactive-title')));
    this.subtitle.classList.remove('inactive-title');
    this.maintitle_helper.classList.remove('maintitle-clickable');

    this.title_as_logo = false;
  }

  welcomeImage_update_opacity() {
    window.requestAnimationFrame(() => {
      var welcome_imageY = this.welcomeImage.getBoundingClientRect().top;
      this.welcomeImage.style.opacity = (welcome_imageY+welcome_image_anchor) / welcome_image_threshold;
    })
  }

  onScroll() {
    var titleY = this.title.getBoundingClientRect().top;
    var placeholderY = this.title_placeholder.getBoundingClientRect().top;

    if (titleY <= 0 && !this.title_as_logo)
      window.requestAnimationFrame(this.title_to_logo.bind(this));
    else if (placeholderY > 0 && this.title_as_logo)
      window.requestAnimationFrame(this.logo_to_title.bind(this));
  }

  render() {
    return (
      <>
        <div className = "title-placeholder"/>

        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
        data-aos-duration="1800" className='title'>
          <h1 className='maintitle'>
            <div className='maintitle-helper'>
              <span className='title-upper-caps'>S</span>
              <span className='title-lower-caps'>ergio </span>
              <span className='title-upper-caps'>A</span>
              <span className='title-lower-caps'>breu </span>
              <span className='title-upper-caps'>G</span>
              <span className='title-lower-caps'>arcía</span>
            </div>
          </h1>
          <br/>
          <h2 className='subtitle' dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'subtitle') }}/>
        </div>

        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
        data-aos-duration="1800" id="welcome-section" className="container welcome">
          <Flags/>
          <Arrow target_id="about-section"/>
          <div className='fake-background'/>
          <img alt="Welcome" className='welcome-image' src={ welcome_image } />

        </div>
      </>
    );
  }
}

Welcome.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Welcome
