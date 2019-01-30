import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import galicianFlag from '../images/galicianFlag.svg'
import englishFlag from '../images/englishFlag.svg'
import spanishFlag from '../images/spanishFlag.svg'

const Footer = () => (
  <div class = 'flags'>
    <Link to="gl"> <img className='flag' src={galicianFlag} /> </Link>
    <Link to=""> <img className='flag' src={englishFlag} /> </Link>
    <Link to="es"> <img class='flag' src={spanishFlag} /> </Link>
  </div>
)

export default Footer
