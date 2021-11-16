import React, {useReducer} from 'react';
import {
    SHOW_ALERT,
    HIDDEN_ALERT
} from '../../types';

import alertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = ({children}) => {
    
    const initialState = {
        message: null,
        seconds: 2800,
        status: false
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);
    
    const viewAlert = (message) => {
        dispatch({
            type: SHOW_ALERT,
            payload: message
        })
    }

    const hiddenAlert = () => {
        dispatch({
            type: HIDDEN_ALERT
        })
    }


    return(
        <alertContext.Provider
            value={{
                message: state.message,
                seconds: state.seconds,
                status: state.status,
                hiddenAlert,
                viewAlert
            }}
        >{children}</alertContext.Provider>
    )
}

export default AlertState;