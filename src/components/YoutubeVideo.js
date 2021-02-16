import React, { Component } from 'react';

export default class YoutubeVideo extends Component {
  render() {
    return (
      <div className = "iframe-container">
        <iframe title="youtube" className="responsive-iframe" src="http://www.youtube.com/embed/videoseries?list=UUUddl_zx5SHrn4csHj_r4xQ" frameBorder="0" allowFullScreen></iframe>
      </div>
    );
  }
}
