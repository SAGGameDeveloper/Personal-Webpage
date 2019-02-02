import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../components/arrow'

class Work extends Component {
  render() {
    return (
      <div data-aos="fade-left" id="work-section" className = "container work">
        { this.props.files.filter(file=>file.node.frontmatter.tag==="work").map(file => {
          return (<div key={ file.node.frontmatter.title }
                    dangerouslySetInnerHTML = {{ __html: file.node.html }} />);
        }) }

        <Arrow target_id="skills-section"/>
      </div>
    );
  }
}

Work.propTypes = {
  files: PropTypes.isRequired,
}

export default Work
