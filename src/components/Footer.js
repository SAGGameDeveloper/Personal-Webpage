import React from 'react';
import config from '../../config';

export default function Footer() {
  return (
    <footer className="footer text-center bg-dark">
      <div className="container">
        <p className="text-muted small mb-0">
          Copyright &copy; Sergio Abreu García
          <br/> Powered by <a href="https://www.gatsbyjs.com/" target="_blank">Gatsby</a>
        </p>
      </div>
    </footer>
  );
}
