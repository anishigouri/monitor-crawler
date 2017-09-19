import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Alert from './Alert';
import Loading from './Loading';

export const Layout = props => (
  <div>
    <Header />
    <div className="container-fluid">{props.children}</div>
    <Loading />
    <Alert />
  </div>
);

export default Layout;
