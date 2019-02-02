import React from 'react'
import PropTypes from 'prop-types'

import Scroll from '../utils/scroll'

const Arrow = ( {target_id} ) => (
  <div onClick={ () => (Scroll.scrollTo("#"+target_id)) } className="section-arrow" />
)

Arrow.propTypes = {
  target_id: PropTypes.string.isRequired,
}

export default Arrow
