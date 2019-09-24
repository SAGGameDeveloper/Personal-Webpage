import { Component } from 'react'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax, Linear } from 'gsap/TweenMax'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

if (typeof(window) !== 'undefined' && window) {
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
}

class ScrollAnimation extends Component {
  constructor(props){
    super(props);

    if (typeof(window) !== 'undefined' && window) {
      this.sm_controller = new ScrollMagic.Controller();
    }
  }

  componentDidMount() {
    this.setupWelcomeScenes();
    this.setupAboutScenes();
    this.setupWorkScenes();
    this.setupContactScenes();
  }

  setupWelcomeScenes() {
    let tween = new TimelineMax ()
    .add([
      TweenMax.to("#title", 1, { className: "+=title-logo" }),
      TweenMax.to("#subtitle", 1, { className: "+=inactive-title" }),
      TweenMax.to(".title-lower-caps", 1, { className: "+=inactive-title" }),
      TweenMax.fromTo("#welcome-section", 1, {y: "0%", x: "0%"}, {y: "-100%", x: "100%", ease: Linear.easeInOut}),
      TweenMax.fromTo("#about-section", 1, {y: "100%", x: "-100%"}, {y: "0%", x: "0%", ease: Linear.easeInOut}),
    ]);

    this.welcome_scene = new ScrollMagic.Scene({
      offset: 0,
      duration: '100%'
    }).setPin('#layout')
      .setTween(tween)
      .addTo(this.sm_controller);
  }

  setupAboutScenes() {
    let skills = document.getElementsByClassName('skills-element');
    let about_section = document.querySelector('#about-section');

    for (let i=0; i < skills.length; i++) {
      new ScrollMagic.Scene({
								triggerElement: skills[i],
								offset: '15%',
								triggerHook: 0.9,
							})
							.setClassToggle(skills[i], "display-on-scroll")
							.addTo(this.sm_controller);
    }

    let about_title = document.querySelector('.about-title');
    new ScrollMagic.Scene({
              triggerElement: about_section,
              offset: '100%',
              triggerHook: 0.9,
            })
            .setClassToggle(about_title, "display-on-scroll")
            .addTo(this.sm_controller);

    let about_fakeback = document.querySelector('.about-fake-background');
    new ScrollMagic.Scene({
              triggerElement: skills[0],
              offset: '10%',
              triggerHook: 0.9,
            })
            .setClassToggle(about_fakeback, "display-on-scroll")
            .addTo(this.sm_controller);

    let about_description = document.querySelector('.about-description');
    new ScrollMagic.Scene({
              triggerElement: skills[0],
              offset: '10%',
              triggerHook: 0.9,
            })
            .setClassToggle(about_description, "display-on-scroll")
            .addTo(this.sm_controller);
  }

  setupWorkScenes() {
    let works = document.getElementsByClassName('work-element-wrapper');
    let work_section = document.querySelector('#work-section');

    for (let i=0; i < works.length; i++) {
      new ScrollMagic.Scene({
								triggerElement: works[i],
								offset: '65%',
								triggerHook: 0.9,
							})
							.setClassToggle(works[i], "display-on-scroll")
							.addTo(this.sm_controller);
    }

    let work_title = document.querySelector('.work-title');
    new ScrollMagic.Scene({
              triggerElement: work_section,
              offset: '50%',
              triggerHook: 0.9,
            })
            .setClassToggle(work_title, "display-on-scroll")
            .addTo(this.sm_controller);
  }

  setupContactScenes() {
    let contact_section = document.querySelector('#contact-section');
    let contact_title = document.querySelector('.contact-title');

    new ScrollMagic.Scene({
              triggerElement: contact_section,
              offset: '50%',
              triggerHook: 0.9,
            })
            .setClassToggle(contact_title, "display-on-scroll")
            .addTo(this.sm_controller);

    let contact_email = document.querySelector('.contact-email');
    new ScrollMagic.Scene({
              triggerElement: contact_title,
              offset: '60%',
              triggerHook: 0.5,
            })
            .setClassToggle(contact_email, "display-on-scroll")
            .addTo(this.sm_controller);

    let contact_text = document.querySelector('.contact-text');
    new ScrollMagic.Scene({
              triggerElement: contact_title,
              offset: '60%',
              triggerHook: 0.5,
            })
            .setClassToggle(contact_text, "display-on-scroll")
            .addTo(this.sm_controller);

    let contact_icons = document.querySelector('.contact-icons');
    new ScrollMagic.Scene({
              triggerElement: contact_title,
              offset: '60%',
              triggerHook: 0.5,
            })
            .setClassToggle(contact_icons, "display-on-scroll")
            .addTo(this.sm_controller);

  }

  componentWillUnmount() {
    this.sm_controller.destroy(true);
  }

  render() { return null; }
}

export default ScrollAnimation
