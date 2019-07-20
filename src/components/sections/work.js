import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

import Arrow from '../../components/arrow'
import cross from '../../images/cross.svg'
import Icon from '../svgIcon'

class Work extends Component {

  componentDidMount() {
    this.work_elements = document.getElementsByClassName("work-element");

    // Work overlay variables
    this.work_overlay = document.querySelector(".work-overlay");
    this.work_overlay_wrapper = document.querySelector(".work-overlay-wrapper");
    this.work_overlay_title = this.work_overlay.querySelector(".work-overlay-title");
    this.work_overlay_description = this.work_overlay.querySelector(".work-overlay-description");
    this.work_overlay_image = this.work_overlay.querySelector(".work-overlay-image img");
    this.work_overlay_links = this.work_overlay.querySelector(".work-overlay-links");
    this.overlay_cross = this.work_overlay.querySelector(".work-overlay-cross");
    this.overlay_active = false;

    // Set the onclick event for each work element
    Array.prototype.forEach.call(this.work_elements, (element) => (element.onclick = this.zoomElement.bind(this, element)));

    // Set the onclik event for the overlay exit cross
    this.overlay_cross.onclick = this.setOverlayActive.bind(this, false);

    //Disable the overlay on 'Escape' press
    window.addEventListener('keydown', (event) => {
      if (this.overlay_active && event.key === "Escape") this.setOverlayActive(false);
    });

    this.work_overlay.addEventListener('click', (e) => {
      if (e.target === this.work_overlay
            || e.target === this.work_overlay_wrapper)
        this.setOverlayActive(false)
    });
  }

  zoomElement(element) {
    if (!this.overlay_active) {
      this.setOverlayActive(true, element);
    }
  }

  setOverlayActive(active, work_element) {
    if (!this.overlay_active && active){
      // Activates the overlay
      this.work_overlay.classList.add("work-overlay-active");
      this.overlay_active = true;

      // Sets the contents of the overlay to the ones of the selected element
      this.work_overlay_title.innerHTML = work_element.querySelector(".work-element-title").innerHTML;
      this.work_overlay_description.innerHTML = work_element.querySelector(".work-element-content").innerHTML;
      this.work_overlay_image.src = work_element.querySelector(".work-element-image img").src;

      this.updateLinks(work_element);
    }
    else if (this.overlay_active && !active) {
      this.work_overlay.classList.remove("work-overlay-active");
      this.overlay_active = false;
    }
  }

  updateLinks(work_element) {
    let links_element = work_element.querySelector(".work-element-links");
    let source_string = links_element.getAttribute('source');
    let demo_string = links_element.getAttribute('demo');
    let source_link = this.work_overlay_links.children[0];
    let demo_link = this.work_overlay_links.children[1];

    if (source_string && source_string !== '') {
      source_link.href = source_string;
      source_link.style.display = 'block';
    }
    else source_link.style.display = 'none';

    if (demo_string && demo_string !== '') {
      demo_link.href = demo_string;
      demo_link.style.display = 'block';
    }
    else demo_link.style.display = 'none';
  }

  render() {
    return (
      <>
        <div className="work-overlay">
          <div className="work-overlay-cross"><img alt="cross" src={ cross } /></div>

          <div className="work-overlay-wrapper">
            <div className="work-overlay-image"><img alt="Project" src=""/></div>
            <div className="work-overlay-text">
              { /*eslint-disable-next-line*/ }
              <h1 className="work-overlay-title"/>
              <p className="work-overlay-description"/>
              <div className="work-overlay-links">
                <a id="source-link" alt="source_link" href="/">
                  <Icon name="github"/></a>
                <a id="demo-link" alt="demo_link" href="/">
                  <Icon name="demo"/></a>
              </div>
            </div>
          </div>
        </div>

        <div id="work-section" className = "container work">
          <div className="section-title">
            <h1><span className="section-title-capital">L</span>et the work do the talk</h1>
          </div>

          <div className="work-container">
            { this.props.files.filter(file=>file.node.frontmatter.tag==="work").map(file => {
              return (

                  <div key={ file.node.frontmatter.title } className="work-element-wrapper">
                    <div className="work-element" id={ file.node.frontmatter.title }>
                      <div className="work-element-content" dangerouslySetInnerHTML = {{ __html: file.node.html }}/>
                      <div className="work-element-title" dangerouslySetInnerHTML = {{ __html: file.node.frontmatter.beautifulTitle }} />
                      <div className="work-element-image">
                        <img alt={ file.node.frontmatter.title }  src={withPrefix('/images/work/'+file.node.frontmatter.title+'.png')} />
                      </div>

                      <div className="work-element-links"
                        source={file.node.frontmatter.source}
                        demo={file.node.frontmatter.demo}/>

                    </div>
                  </div>

              );
            }) }
          </div>

          <Arrow target_id="contact-section"/>
        </div>
      </>
    );
  }
}

Work.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Work
