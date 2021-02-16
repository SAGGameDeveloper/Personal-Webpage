import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import '../assets/sass/stylish-portfolio.scss';
import previewImg from '../assets/images/preview.png';


class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'description', content: data.site.siteMetadata.description },
                { name: 'keywords', content: data.site.siteMetadata.keywords },
              ]}
            >
              <link rel="canonical" href="https://sergioabreu.me" />
              <html lang="en" />

              <meta property="og:title" content={data.site.siteMetadata.title}/>
              <meta property="og:description" content={data.site.siteMetadata.description}/>
              <meta property="og:image" content={previewImg}/>
              <meta property="og:url" content={previewImg}/>
              <meta name="twitter:card" content="summary_large_image"/>

            </Helmet>
            <div className={'page-top'}>{children}</div>
          </>
        )}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
