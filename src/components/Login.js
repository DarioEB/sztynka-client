import React, {useContext, useEffect} from 'react';
import FormLogin from './loginComponents/FormLogin';
// import Header from './Header';
import ImageLogin from './loginComponents/ImageLogin';

import loginContext from '../context/login/loginContext';

const Login = (props) => {

    const LoginContext = useContext(loginContext);
    const { authenticated } = LoginContext;

    useEffect( () => {
        if(authenticated) {
            props.history.push('/admin');
        }
        // eslint-disable-next-line
    }, [authenticated]);

    return(
        <main className="container">
            <div className="content-part">
                <ImageLogin />
                <section className="content-layout">
                    <FormLogin />
                </section>
            </div>
        </main>
    );
}

export default Login;