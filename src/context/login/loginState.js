import React, { useReducer } from 'react';
import loginContext from './loginContext';
import loginReducer from './loginReducer';

import axiosClient from '../../config/axios';

import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTHENTICATED_USER,
    LOGOUT
} from '../../types';
import tokenAuth from '../../config/tokenAuth';

import Swal from 'sweetalert2'
const LoginState = ({children}) => {

    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        authenticated: null,
        user: null,
        load: null,
        error: null,
        msg: null
    }

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const login = async user => {
        dispatch({
            type: LOGIN
        })
        try {
            const response = await axiosClient.post('/api/auth', user);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.token
            });
            Swal.fire({
                title: 'Usuario correcto',
                text: `Redirigiendo...`,
                type: 'success',
                background: '#000',
                allowOutsideClick: false,
                confirmButtonText: 'OK',
                customClass: {
                    popup: 's-container',
                    title: 's-title',
                    htmlContainer: 's-text',
                    confirmButton: 's-btn'
                }
            });
        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: error.response.data.msg
            });
            Swal.fire({
                title: 'Datos no válidos',
                text: `Los datos ingresados son incorrectos, intente nuevamente`,
                type: 'error',
                background: '#000',
                allowOutsideClick: false,
                confirmButtonText: 'OK',
                customClass: {
                    popup: 's-container-error',
                    title: 's-title',
                    htmlContainer: 's-text',
                    confirmButton: 's-btn-error'
                }
            });
        }
    }

    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            if(response.data.user) {
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                });
            }
        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: error.response.data.msg
            });
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    return(
        <loginContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                load: state.load,
                error: state.error,
                login,
                authenticatedUser,
                logout
            }}
        >
            {children}
        </loginContext.Provider>
    )
}

export default LoginState;