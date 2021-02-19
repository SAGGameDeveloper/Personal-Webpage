import React from 'react';

import Layout from '../components/Layout';

import config from '../../config';
import Footer from '../components/Footer';
import Portfolio from '../components/Portfolio';
import YoutubeVideo from '../components/YoutubeVideo';
import Icon from '../components/Icon';

import portrait from '../assets/images/portrait.png';

const IndexPage = () => (
  <Layout>

    <header className="masthead d-flex">
      <div className="text-center my-auto col-lg">
      <h3 className="mb-1">
        <em>{config.subHeading}</em>
      </h3>
        <h1 className="mb-1">{config.heading}</h1>
        <div className="portrait-img"><img alt="Sergio Abreu" className="img-fluid" src={portrait}/></div>
      </div>
      <div className="youtube-container text-center my-auto col-lg">
        <YoutubeVideo/>
      </div>

      <div className="social-links">
        <ul className="list-inline">
          {config.socialLinks.map(social => {
            const { icon, name, url } = social;
            return (
              <li key={name} className="list-inline-item">
                <Icon icon={ icon } name = { name } url = { url }/>
              </li>
            );
          })}
        </ul>
      </div>
    </header>

    <section className="content-section bg-light" id="about">
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h2>
              Hi, I'm Sergio, a game developer from Galicia, Spain.
            </h2>
            <p className="lead" style={{ marginBottom: 0 }}>
              I've always had a passion for technology and games, which led
              me to study Videogame Development in Madrid. Still, I was curious
              about many other different topics, so I spent my college years
              messing around with web development, cryptocurrencies, and AI.

              <br/><br/>But nothing could beat videogames :)
              <br/><br/> <span id="cv-icon"><Icon icon="cv" name = "Resume" url = "/resume.pdf"/></span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <Portfolio/>

    <section className="content-section bg-light text-white">
      <div className="container text-center contact-links">
        <h2 className="text-dark mb-4">Get in touch!</h2>
        <ul className="list-inline">
          {config.contactLinks.map(social => {
            const { icon, name, url } = social;
            return (
              <li key={name} className="list-inline-item">
                <Icon icon={ icon } name = { name } url = { url }/>
              </li>
            );
          })}
        </ul>
      </div>
    </section>

    <Footer />
  </Layout>
);

export default IndexPage;
