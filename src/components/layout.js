import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../components/footer'

const Layout = ({ children }) => {
  return (
    <div className="layout" id="layout">
      { children }
      < Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
