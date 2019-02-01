import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../components/footer'
import './layout.css'

const Layout = ({ children }) => (
  <div className="layout">
    { children }
    < Footer />
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
