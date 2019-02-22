import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'

import Arrow from '../../components/arrow'

class Work extends Component {
  render() {
    return (
      <div data-aos="fade-left" id="work-section" className = "container work">
        <hr/>
        <div className="section-title">
          <h1>What I've done</h1>
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
    );
  }
}

Work.propTypes = {
  files: PropTypes.array.isRequired,
}

export default Work
