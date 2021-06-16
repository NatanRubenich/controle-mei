import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react'

const Header = () => {

  const [activeItem, setActiveItem ] = useState('');

  const handleItemClick = (item) => {
    console.log('clicado, ativo:', item);
    setActiveItem(item);
  }


  return (
    <Menu className="header-menu">
      <Menu.Item 
        position="right"
        className="header-item"
        name='Login'
        active={activeItem === 'login'}
        onClick={() => handleItemClick('login')}
      >
        Login
      </Menu.Item>

      <Menu.Item
        className="header-item"
        name='Cadastro'
        active={activeItem === 'cadastro'}
        onClick={() => handleItemClick('cadastro')}
      >
        Cadastro
      </Menu.Item>
    </Menu>
  );
}



export default Header;