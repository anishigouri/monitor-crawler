import React from 'react';
import { Link } from 'react-router-dom';

export const Layout = props => (
  <div className="app-container">
    <header>
      Header
    </header>
    <div className="app-content">{props.children}</div>
    <footer>
      Footer
    </footer>
  </div>
);

export default Layout;
