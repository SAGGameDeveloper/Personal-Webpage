import { Component } from 'react'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax } from 'gsap/TweenMax'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

class ScrollAnimation extends Component {
  constructor(props){
    super(props);
    this.sm_controller = new ScrollMagic.Controller();
  }

  componentDidMount() {
    this.scene = new ScrollMagic.Scene({
      offset: 0,
      duration: 500
    }).setPin('#about-section')
      .setTween("#contact-navelement", {borderTop: "30px solid white", backgroundColor: "blue", scale: 0.7})
      .addTo(this.sm_controller);
  }

  componentWillUnmount() {
    this.scene.destroy(true);
    this.sm_controller.destroy(true);
  }

  render() { return null; }
}

export default ScrollAnimation
