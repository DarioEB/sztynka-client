import React from 'react';

import logo from '../img/logo-2.png';
const Header = ({name}) => {

    return (
        <header>
            <div className="box-name">
                <p>{name}</p>
            </div>
            <div className="box-logo">
                <img
                    src={logo}
                    alt="Logotipo Sztynka Barbero"
                />
            </div>
        </header>
    );
}

export default Header;