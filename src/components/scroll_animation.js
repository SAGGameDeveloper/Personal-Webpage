import { Component } from 'react'
import * as ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax } from 'gsap/TweenMax'
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap"

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

// TEST OBJECT. CAN I USE CSS CLASS TO TRANSITION?????????? RESEARCH THIS YOU FOOL
const TEST_ANIMATION = {width: "10%", backgroundColor: "blue", scale: 0.7};

class ScrollAnimation extends Component {
  constructor(props){
    super(props);
    this.sm_controller = new ScrollMagic.Controller();
  }

  componentDidMount() {
    // TEST SCENE
    this.scene = new ScrollMagic.Scene({
      offset: 0,
      duration: 500
    }).setPin('#about-section')
      .setTween("#title", TEST_ANIMATION)
      .addTo(this.sm_controller);
  }

  componentWillUnmount() {
    this.scene.destroy(true);
    this.sm_controller.destroy(true);
  }

  render() { return null; }
}

export default ScrollAnimation
