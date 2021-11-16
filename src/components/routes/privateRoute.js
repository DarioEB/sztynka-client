import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import loginContext from '../../context/login/loginContext';

const PrivateRoute = ({ component: Component, ...props }) => {
    
    const LoginContext = useContext(loginContext);
    const { authenticated, load, authenticatedUser } = LoginContext;
    
    useEffect( () => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);
    
    return  (
        <Route 
            { ...props } 
            render  =   { props => !authenticated && !load
                ?   
                    (
                        <Redirect 
                            to="/login" 
                        />
                    ) 
                :   
                    (
                        <Component 
                            { ...props } 
                        />
                    )   
                        }   
        />
            )
}

export default PrivateRoute;