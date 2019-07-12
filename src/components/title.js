import React, { Component } from 'react'
import inject from '../utils/injector'
import Scroll from '../utils/scroll'

class Title extends Component {
  render() {
    return (
      <>
        <div id ='title' className='title' onClick={ ()=>(Scroll.scrollTo('#welcome-section')) }>
          <h1 className='maintitle'>
              <span className='title-upper-caps'>S</span>
              <span className='title-lower-caps'>ERGIO </span>
              <span className='title-upper-caps'>A</span>
              <span className='title-lower-caps'>BREU </span>
              <span className='title-upper-caps'>G</span>
              <span className='title-lower-caps'>ARCÍA</span>
          </h1>
          <h2 id='subtitle' className='subtitle'
          dangerouslySetInnerHTML =
                      {{ __html: inject(this.props.files, 'subtitle') }}/>
        </div>
      </>
    );
  }
}

export default Title;
