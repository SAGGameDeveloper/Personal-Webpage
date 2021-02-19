import React, { Component } from 'react';

import img_activeRagdolls from '../assets/images/activeRagdolls.jpg';
import img_tfg from '../assets/images/tfg.jpg';
import img_collisionSound from '../assets/images/collisionSound.png';
import img_engine from '../assets/images/engine.jpg';

export default class Icon extends Component {
  render() {
    return (
      <section className="content-section bg-dark" id="portfolio">
        <div className="container">
          <div className="content-section-heading text-center">
            <h3 className="text-secondary mb-0">Portfolio</h3>
            <h2 className="mb-5 text-white">Featured Projects</h2>
          </div>
          <div className="row no-gutters">
            <div className="col-lg-6">
              <a className="portfolio-item" href="https://github.com/sergioabreu-g/active-ragdolls" target="_blank" rel="noreferrer">
                <span className="caption">
                  <span className="caption-content">
                    <h2>Active Ragdolls</h2>
                    <p className="mb-0">
                      A basic prototype on Physics-Based Animation with non-realistic
                      balance.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_activeRagdolls } alt="Active Ragdolls" />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="#Portfolio" rel="noreferrer">
                <span className="caption">
                  <span className="caption-content">
                    <h2>Physics-Based Animation through Reinforcement Learning</h2>
                    <p className="mb-0">
                      As my bachelors final project, I'm currently working on
                      making physically simulated characters that follow animations
                      while balancing themselves.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_tfg } alt="Galaxy" />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="https://github.com/sergioabreu-g/collision-sound" target="_blank" rel="noreferrer">
                <span className="caption">
                  <span className="caption-content text-dark">
                    <h2>Sound on Collision in Unity</h2>
                    <p className="mb-0">
                      A system I made with a friend that allows to use
                      FMOD to play sounds when objects collide in Unity.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_collisionSound } alt="Collision Sound" />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="https://github.com/freesstylers/Untitled-Motor" target="_blank" rel="noreferrer">
                <span className="caption">
                  <span className="caption-content text-dark">
                    <h2>C++ Game Engine from Scratch</h2>
                    <p className="mb-0">
                      A game engine made in college by a team of 8 people. I was
                      focused on coding the engine arquitecture and abstract
                      functionality.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_engine } alt="GitHub" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
