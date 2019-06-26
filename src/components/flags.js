import React from 'react'
import { Link } from 'gatsby'

import galicianFlag from '../images/galicianFlag.svg'
import englishFlag from '../images/englishFlag.svg'
import spanishFlag from '../images/spanishFlag.svg'

const Flags = () => (
  <div className = 'flags'>
    <Link to="/"> <img alt="en" className='flag' src={englishFlag} /> </Link>
    <Link to="/gl"> <img alt="gl" className='flag' src={galicianFlag} /> </Link>
    <Link to="/es"> <img alt="es" className='flag' src={spanishFlag} /> </Link>
  </div>
)

export default Flags
