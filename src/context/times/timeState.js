import React, {useReducer} from 'react';
import timeContext from './timeContext';
import timeReducer from './timeReducer';
import axiosClient from '../../config/axios';
import {
    GET_TIMES,
    GET_TIMES_SUCCESS,
    GET_TIMES_FAILED
} from '../../types';

const TimeState = ({children}) => {

    const initialState = {
        times: [],
        loading: false,
        error: null
    }

    const [state, dispatch] = useReducer(timeReducer, initialState);

    const getTimes = async () => {
        dispatch({
            type: GET_TIMES
        })
        try {
            const response = await axiosClient.get('/api/times');
            dispatch({
                type: GET_TIMES_SUCCESS,
                payload: response.data.times
            });
        } catch(error) {
            console.log(error);
            dispatch({
                type: GET_TIMES_FAILED
            });
        }
    }

    return (
        <timeContext.Provider
            value={{
                times: state.times,
                loading: state.loading,
                error: state.error,
                getTimes
            }}
        >
            {children}
        </timeContext.Provider>
    )
}

export default TimeState;