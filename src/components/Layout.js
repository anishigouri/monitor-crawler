import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export const Layout = props => (
  <div>
    <header>
      <Header />
    </header>
    <div className="container-fluid">{props.children}</div>
  </div>
);

export default Layout;
