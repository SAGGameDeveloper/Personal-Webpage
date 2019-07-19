import React, { Component } from 'react'
import Scroll from '../utils/scroll'

// Section parameters
const SECTIONS = ["welcome", "about", "work", "contact"];
const SECTION_SUFFIX = "-section";
const NAVELEMENT_SUFFIX = "-navelement";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.currentSection = 0;
    this.section_divs = [];
    this.section_navelements = [];
  }

  componentDidMount() {
    // The navbar doesn't need to update fast, a lower
    // interval time would slow down the browser for no reason
    setInterval(this.update.bind(this), 1000);

    this.section_divs = SECTIONS.map((section) =>
                (document.querySelector("#"+section+SECTION_SUFFIX)));
    this.section_navelements = SECTIONS.map((section) =>
                (document.querySelector("#"+section+NAVELEMENT_SUFFIX)));
    SECTIONS.forEach((section, i)=>(this.section_navelements[i].onclick =
                        this.navigationCallback.bind(this, section)));

    this.section_navelements[1].onclick = ()=>(Scroll.scrollTo("#welcome-section", 0, true));

    this.update();
  }

  navigationCallback(section, addExtra) {
    let bottom = this.section_divs[0].getBoundingClientRect().bottom;
    let extra = bottom > 0? bottom : 0;
    Scroll.scrollTo("#"+section+SECTION_SUFFIX, addExtra? extra : 0);
  }

  // Updates the navigation bar active element to fit the current section
  update() {
    // Check the position of every section until finding the current one
    for (var i = 0; i < this.section_divs.length; i++) {
      var section_pos = this.section_divs[i].getBoundingClientRect().top;

      // Updates the navbar and breaks the loop
      if (section_pos >= -window.innerHeight/2
              && section_pos < window.innerHeight/2 ){
        window.requestAnimationFrame(this.swapActiveNavbar.bind(this, i))
        break;
      }
    }
  }

  swapActiveNavbar(i) {
    let currentNavelement = this.section_navelements[this.currentSection];
    let nextNavelement = this.section_navelements[i];

    currentNavelement.classList.remove('active-navelement');
    nextNavelement.classList.add('active-navelement');

    this.currentSection = i;
  }

  render() {
    return (
        <div className = 'navbar'>
          { SECTIONS.map((section) => (
            <div
              key={ section+NAVELEMENT_SUFFIX }
              id={ section+NAVELEMENT_SUFFIX }
              className="navbar-element"/>
          )) }
        </div>
      );
    }
}

export default Navbar;
