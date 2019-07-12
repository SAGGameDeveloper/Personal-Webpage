import React, { Component } from 'react'
import Scroll from '../utils/scroll'
import inject from '../utils/injector'

class Title extends Component {
  componentDidMount() {
    window.addEventListener('scroll', () => (this.onScroll()));

    this.title = document.querySelector(".title");
    this.title_lower_caps = this.title.getElementsByClassName("title-lower-caps");
    this.subtitle = this.title.querySelector(".subtitle");
    this.title_placeholder = document.querySelector(".title-placeholder");
    this.title_as_logo = false;

    this.title.onclick = () => (Scroll.scrollTo("#welcome-section"));
    this.welcomeImage = document.querySelector(".welcome-image");

    this.sections = document.getElementsByClassName("container");
    this.welcome_section = document.querySelector("#welcome-section");
  }

  title_to_logo() {
    this.title.classList.add('title-logo');
    [].forEach.call(this.title_lower_caps,  (text) => (text.classList.add('inactive-title')));
    this.subtitle.classList.add('inactive-title');
    this.title.classList.add('title-clickable');

    this.title_as_logo = true;
  }

  logo_to_title() {
    this.title.classList.remove('title-logo');
    [].forEach.call(this.title_lower_caps,  (text) => (text.classList.remove('inactive-title')));
    this.subtitle.classList.remove('inactive-title');
    this.title.classList.remove('title-clickable');

    this.title_as_logo = false;
  }

  onScroll() {
    let titleY = this.title.getBoundingClientRect().top;
    let placeholderY = this.title_placeholder.getBoundingClientRect().top;

    if (titleY < 0 && !this.title_as_logo)
      window.requestAnimationFrame(this.title_to_logo.bind(this));
    else if (placeholderY > -20 && this.title_as_logo)
      window.requestAnimationFrame(this.logo_to_title.bind(this));
  }

  render() {
    return (
      <>
        <div className = "title-placeholder"/>

        <div data-aos="zoom-out" data-aos-once="true" data-aos-mirror="false"
          data-aos-duration="1800" className='title'>
          <h1 className='maintitle'>
              <span className='title-upper-caps'>S</span>
              <span className='title-lower-caps'>ERGIO </span>
              <span className='title-upper-caps'>A</span>
              <span className='title-lower-caps'>BREU </span>
              <span className='title-upper-caps'>G</span>
              <span className='title-lower-caps'>ARCÍA</span>
          </h1>
          <h2 className='subtitle' dangerouslySetInnerHTML = {{ __html: inject(this.props.files, 'subtitle') }}/>
        </div>
      </>
    );
  }
}

export default Title;
