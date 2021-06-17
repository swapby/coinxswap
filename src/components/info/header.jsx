import React, { useState } from 'react';

import { Link } from "react-router-dom"
import logoImage from '../../images/ic_logo_dark.png'

export const Header = (props) => {
  const [isActive, setIsActive] = useState(true);

  const handleIsActiveClick = (event) => {
    setIsActive(!isActive);
  } 

  return (
    <div>
      <header>
        <div className="inner_header">
            <h1>
                <a href='#!'><img src={logoImage} alt='logo'/></a>
            </h1>
            
            <ul>
                <li><a href="#project">Project</a></li>
                <li><a href="#allocation">Token Allocation</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
                <li>
                <Link to={'/app'} className="header_btn" >Launch App</Link>
                </li>
            </ul>
            
        </div>
      </header>
      <div className={isActive? "menu-section": "menu-section on"}>
        
        <div className="menu-toggle" onClick={handleIsActiveClick}>
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
        
        <nav>
          <ul role="navigation" className={isActive? "hidden": null}>
            <li><a href='#!'>Project</a></li>
            <li><a href='#allocation'>Token Allocation</a></li>
            <li><a href='#roadmap'>Roadmap</a></li>
            <li><Link to={'/app'} className="header_btn" >Launch App</Link></li>
            <li>ⓒ 2020 CoinSwap corp.</li>
          </ul>
        </nav>
        
      </div>
    </div>
    
    );
};
