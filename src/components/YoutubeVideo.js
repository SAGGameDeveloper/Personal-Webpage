import React, { Component } from 'react';

export default class YoutubeVideo extends Component {
  render() {
    return (
      <div class = "iframe-container">
        <iframe title="youtube" class="responsive-iframe" src="http://www.youtube.com/embed/videoseries?list=UUUddl_zx5SHrn4csHj_r4xQ" frameborder="0" allowfullscreen></iframe>
      </div>
    );
  }
}
