import React, { Component } from 'react';

export default class YoutubeVideo extends Component {
  render() {
    return (
      <div className = "iframe-container">
        <iframe title="youtube" className="responsive-iframe" src="https://www.youtube.com/embed/pXQCasmBhY4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    );
  }
}
