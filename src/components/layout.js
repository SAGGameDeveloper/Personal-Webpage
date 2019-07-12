import React from 'react'
import PropTypes from 'prop-types'

import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Flags from './flags'

const Layout = ({ children }) => {
  return (
    <div className="layout" id="layout">
      <Navbar/>
      <Flags/>

      { children }

      < Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
