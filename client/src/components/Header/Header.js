import React, { useState } from 'react';

const Header = () => {

  const [activeItem, setActiveItem ] = useState('');

  const handleItemClick = (item) => {
    console.log('clicado, ativo:', item);
    setActiveItem(item);
  }


  return (
    <div></div>
  );
}



export default Header;