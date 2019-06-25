import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import Script from 'react-load-script'

class Game extends Component {
  constructor(props) {
    super(props);

    this.app = new PIXI.Application({width: 800, height: 600, transparent: true});
    this.app.renderer.autoResize = true;

    // Liquidfun load
    const liquidfunScript = document.createElement("script");
    liquidfunScript.src = "scripts/liquidfun.js";
    liquidfunScript.asyn = 'true';
    document.body.appendChild(liquidfunScript);
  }

  componentDidMount() {
    // Pixi initialization
    this.fake_background = document.getElementsByClassName("fake-background")[0];
    this.fake_background.appendChild(this.app.view);
    this.app.view.id = 'game-canvas';

    //load an image and run the `setup` function when it's done
    PIXI.Loader.shared
      .add("images/work/favicon.png")
      .load(setup.bind(this));

    //This `setup` function will run when the image has loaded
    function setup() {
      //Create the cat sprite
      let cat = new PIXI.Sprite(PIXI.Loader.shared.resources["images/work/favicon.png"].texture);
      //Add the cat to the stage
      this.app.stage.addChild(cat);
    }
  }

  physicsSetup() {
    var gravity = new window.b2Vec2(0, -9.81);
    this.world = new window.b2World(gravity);



    // Show the canvas only when the physics are completely loaded
    this.app.view.style.opacity = '1';
  }

  render(){
    return (<Script
              url="scripts/liquidfun.js"
              onLoad={this.physicsSetup.bind(this)}
            />)
  }
}

export default Game;
