import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Alert from '../shared/Alert';
import Loading from '../shared/Loading';
import Menu from './Menu';

export const Layout = props => (
  <div id='outer-container'>
    <Header />
    <Menu pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } />
    <div id='page-wrap' className='container'>{props.children}</div>
    <Loading />
    <Alert />
  </div>
);

export default Layout;
