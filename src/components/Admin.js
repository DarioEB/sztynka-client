import React, { useEffect, useContext, useState } from 'react';
import loginContext from '../context/login/loginContext';
import Header from './Header';

import ImageLogin from './loginComponents/ImageLogin';

import Shifts from './adminComponents/Shifts';
import Settings from './adminComponents/Settings';

const Admin = (props) => {

    const LoginContext = useContext(loginContext);
    const { authenticatedUser, logout } = LoginContext;

    const [section, setSection] = useState('shifts');

    useEffect( () => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    const handleSection = sec => {
        if(sec === 'shifts') {
            setSection(sec);
        } else if(sec === 'settings') {
            setSection(sec);
        } 
    }

    return(
        <main className="container">
            <div className="content-part">
                <ImageLogin />
                <section className="content-layout">
                    <Header name={"Sztynka Barbero - Administración"}/>
                    <div className="buttons">
                        <button
                            className={`btn ${section === 'shifts' && 'btn-select'}`}
                            onClick={() => handleSection('shifts')}
                        >Turnos</button>
                        <button 
                            className={`btn ${section === 'settings' && 'btn-select'}`}
                            onClick={() => handleSection('settings')}
                        >Configurar</button>
                        <button
                            className={`btn`}
                            onClick={() => logout() }
                        >Cerrar</button>
                    </div>

                    <div className="tired">
                        { section === 'shifts' && <Shifts />}
                        { section === 'settings' && <Settings />}
                    </div>

                </section>
            </div>
        </main>
    );
}

export default Admin