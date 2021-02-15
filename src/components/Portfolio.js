import React, { Component } from 'react';

import img_activeRagdolls from '../assets/images/activeRagdolls.jpg';
import img_tfg from '../assets/images/tfg.jpg';
import img_collisionSound from '../assets/images/collisionSound.png';
import img_openSource from '../assets/images/openSource.png';

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
              <a className="portfolio-item" href="/#">
                <span className="caption">
                  <span className="caption-content">
                    <h2>Active Ragdolls</h2>
                    <p className="mb-0">
                      A basic prototype on Physics-Based Animation with non-realistic
                      balance.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_activeRagdolls } alt="" />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="/#">
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
                <img className="img-fluid" src={ img_tfg } alt="" />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="/#">
                <span className="caption">
                  <span className="caption-content">
                    <h2>Sound on Collision in Unity</h2>
                    <p className="mb-0">
                      A system I made with a friend that allows to use
                      FMOD to play sounds when objects collide in Unity.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_collisionSound } alt="" />
              </a>
            </div>
            <div className="col-lg-6">
              <a className="portfolio-item" href="/#">
                <span className="caption">
                  <span className="caption-content">
                    <h2>Open Source</h2>
                    <p className="mb-0">
                      I'm an active open-source contributor.
                    </p>
                  </span>
                </span>
                <img className="img-fluid" src={ img_openSource } alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
