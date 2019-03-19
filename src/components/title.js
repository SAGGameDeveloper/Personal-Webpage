import React, { Component } from 'react'
import inject from '../utils/injector'

import Scroll from '../utils/scroll'

class Title extends Component {
  constructor(props) {
    super(props);

    window.addEventListener('scroll', () => (this.onScroll()));
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

    this.sections = document.getElementsByClassName("container");
    this.welcome_section = document.querySelector("#welcome-section");
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
      </>
    );
  }
}

export default Title;
