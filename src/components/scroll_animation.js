import { Component } from 'react'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax, Linear } from 'gsap/TweenMax'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

class ScrollAnimation extends Component {
  constructor(props){
    super(props);
    this.sm_controller = new ScrollMagic.Controller();
  }

  componentDidMount() {
    this.setupWelcomeScene();
    this.setupAboutScene();
  }

  setupWelcomeScene() {
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

  setupAboutScene() {

  }

  componentWillUnmount() {
    this.welcome_scene.destroy(true);

    this.sm_controller.destroy(true);
  }

  render() { return null; }
}

export default ScrollAnimation
