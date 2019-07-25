import React from 'react'
import { Link } from 'gatsby'

const Flags = () => (
  <div className = 'flags'>
    <Link to="/" activeClassName='active-flag'><div className='flag'>en</div></Link>
    <Link to="/es" activeClassName='active-flag'><div className='flag'>es</div></Link>
    <Link to="/gl" activeClassName='active-flag'><div className='flag'>gl</div></Link>
  </div>
)

export default Flags
