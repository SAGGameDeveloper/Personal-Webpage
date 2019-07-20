import { Component } from 'react'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax, Linear } from 'gsap/TweenMax'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"
import Scroll from '../utils/scroll'


ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

class ScrollAnimation extends Component {
  constructor(props){
    super(props);
    this.sm_controller = new ScrollMagic.Controller();
  }

  componentDidMount() {
    this.setupWelcomeScenes();
    this.setupAboutScenes();
    this.setupWorkScenes();
    this.setupContactScenes();

    this.setupScrollSnap();
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

  setupScrollSnap() {
    let sections = document.getElementsByClassName('container');
    let body = document.querySelector('body');
    for (let i=0; i<sections.length; i++) {
      new ScrollMagic.Scene({
                triggerElement: sections[i],
                offset: 10,
                triggerHook: 1,
              })
              .on('start', (e)=>{
                if (e.scrollDirection === 'FORWARD')
                  Scroll.scrollTo('#'+sections[i].id);
              })
              .on('enter', (e) => {
                body.classList.add('body-locked');
                setTimeout(() => {
                    body.classList.remove('body-locked');
                },1200)
              })
              .addTo(this.sm_controller);

      if (i === 0) continue;
      new ScrollMagic.Scene({
                triggerElement: sections[i],
                offset: -10,
                triggerHook: 0,
              })
              .on('start', (e)=>{
                if (e.scrollDirection === 'REVERSE')
                  Scroll.scrollTo('#'+sections[i-1].id);
              })
              .on('enter', (e) => {
                body.classList.add('body-locked');
                setTimeout(() => {
                    body.classList.remove('body-locked');
                },1200)
              })
              .addTo(this.sm_controller);
    }
  }

  setupAboutScenes() {
    let skills = document.getElementsByClassName('skills-element');
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
              triggerElement: skills[0],
              offset: '5%',
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

  }

  setupContactScenes() {

  }

  componentWillUnmount() {
    this.sm_controller.destroy(true);
  }

  render() { return null; }
}

export default ScrollAnimation
