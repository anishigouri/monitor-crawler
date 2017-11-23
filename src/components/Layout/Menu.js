import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import IconUserAdd from 'react-icons/lib/fa/user';
import IconDataSet from 'react-icons/lib/go/database';
import IconBag from 'react-icons/lib/fa/shopping-bag';
import IconKey from 'react-icons/lib/ti/key';
import IconMail from 'react-icons/lib/md/email';
import IconBooks from 'react-icons/lib/md/library-books';

import IconLandscape from 'react-icons/lib/md/landscape';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '30px'
  },
  bmBurgerBars: {
    background: 'white'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: '',
      isOpen: false
    };
  }

  onShowSubmenu(name) {
    this.setState({ menuVisible : name, isOpen: true });
  }

  onCloseMenu() {
    this.setState({isOpen: false});
  }

  render() {
    return (
      <Menu id={ 'stack' } pageWrapId={'page-wrap'} outerContainerId={'outer-container'} styles={styles} isOpen={ this.state.isOpen }>
        <div className='menu-title'>
          <img src='/img/reddrummer.svg' />
        </div>
        <hr />
        {
          /*
          <Link to='/clients' className='menu-item'>
            <IconBag size={30} /> <span className='text-menu-item'> Clients </span>
          </Link>
          <Link to='/accounts' className='menu-item'>
            <IconKey size={30} /> <span className='text-menu-item'> Accounts </span>
          </Link>
          <Link to='/landscapes' className='menu-item'>
            <IconLandscape size={30} /> <span className='text-menu-item'> Landscapes </span>
          </Link>
          <Link to='/dataset' className='menu-item'>
            <IconDataSet size={30} /> <span className='text-menu-item'> Data Set </span>
          </Link>*/
        }

        <Link onClick={this.onCloseMenu.bind(this)} to='/users' className='menu-item'>
          <IconUserAdd size={30} /> <span className='text-menu-item'> Users </span>
        </Link>

        <Link onClick={this.onCloseMenu.bind(this)} to='/kartodromos' className='menu-item'>
          <IconUserAdd size={30} /> <span className='text-menu-item'> Kartódromo </span>
        </Link>

        {/*

        <div className='menu-item-subitem' onMouseOver={this.onShowSubmenu.bind(this, 'reports')}>
          <IconBooks size={30} /> <span className='text-menu-item'> Reports </span>
        </div>

        <Link
          style={{'display': this.state.menuVisible === 'reports' ? 'block' : 'none'}}
          onClick={this.onCloseMenu.bind(this)}
          to='/reports/userAccess'
          className='submenu-item'>
          <IconKey size={25} /> <span className='text-menu-item'> User Access Report </span>
        </Link>

        */}
      </Menu>
    );
  }
}

export default MenuBar;
