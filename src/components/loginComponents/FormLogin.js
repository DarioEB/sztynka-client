import React, { useState, useContext } from 'react';
import Spin from '../Spin';

import loginContext from '../../context/login/loginContext';
const FormLogin = () => {

    // Context autenticación
    const LoginContext = useContext(loginContext);
    const { login, load } = LoginContext; 

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        login(user);
    }


    const { username, password } = user;

    if(load) return <Spin />

    return (
        <div className="content-login">
            <div className="title">
                <h2>Login</h2>
                <span>Acceso administración</span>
            </div>
            <form
                onSubmit={handleSubmit}
            >
                <div className="field">
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        value={username}
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                    />
                </div>

                <div className="box-submit">
                    <button
                        className="submit"
                        type="submit"
                        value="Ingresar"
                    >Ingresar</button>
                </div>


            </form>
        </div>
    );
}

export default FormLogin;