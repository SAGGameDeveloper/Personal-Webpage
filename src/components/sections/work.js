import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

import Arrow from '../../components/arrow'
import cross from '../../images/cross.svg'

class Work extends Component {

  componentDidMount() {
    this.work_elements = document.getElementsByClassName("work-element");
    this.work_overlay = document.querySelector(".work-overlay");
    this.overlay_cross = this.work_overlay.querySelector(".work-overlay-cross");
    this.overlay_active = false;

    // Set the onclick events
    Array.prototype.forEach.call(this.work_elements, (element) => (element.onclick = this.zoomElement.bind(this, element)));
    this.work_overlay.onclick = this.clickOutsideOverlay.bind(this);
    this.overlay_cross.onclick = this.setOverlayActive.bind(this, false);
  }

  zoomElement(element) {
    if (!this.overlay_active) {
      this.setOverlayActive(true);
    }
  }

  clickOutsideOverlay(e) {
    // Close the overlay when directly clicking on it
    // and not on its children, that means cliking the background
    if (e.target === this.work_overlay) {
      this.setOverlayActive(false);
    }
  }

  setOverlayActive(active) {
    if (!this.overlay_active && active){
      this.work_overlay.classList.add("work-overlay-active");
      this.overlay_active = true;
    }
    else if (this.overlay_active) {
      this.work_overlay.classList.remove("work-overlay-active");
      this.overlay_active = false;
    }
  }

  render() {
    return (
      <>
        <div className="work-overlay">
          <div className="work-overlay-cross"><img alt="cross" src={ cross } /></div>

          <div className="work-overlay-wrapper">
          </div>
        </div>

        <div data-aos="fade-left" id="work-section" className = "container work">
          <hr/>

          <div className="section-title">
            <h1><span className="section-title-capital">W</span>hat I've done</h1>
          </div>

          <div className="work-container">
            { this.props.files.filter(file=>file.node.frontmatter.tag==="work").map(file => {
              return (

                  <div data-aos="fade-left" key={ file.node.frontmatter.title } className="work-element-wrapper">
                    <div className="work-element">
                      <div className="work-element-content" dangerouslySetInnerHTML = {{ __html: file.node.html }} />
                      <div className="work-element-image">
                        <img alt={ file.node.frontmatter.title }  src={withPrefix('/images/work/'+file.node.frontmatter.title+'.png')} />
                      </div>
                    </div>
                  </div>

              );
            }) }
          </div>

          <Arrow target_id="skills-section"/>
        </div>
      </>
    );
  }
}

Work.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Work
