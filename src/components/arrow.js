import React from 'react'
import Navbar from './navbar.js'
import PropTypes from 'prop-types'

const Arrow = ( {target_id} ) => (
  <div onClick={ () => (Navbar.scrollTo("#"+target_id)) } className="section-arrow" />
)

Arrow.propTypes = {
  target_id: PropTypes.string.isRequired,
}

export default Arrow
