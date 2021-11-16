import React, {useReducer} from 'react';
import adminContext from './adminContext';
import adminReducer from './adminReducer';

import {
    GET_SHIFTS_DATE_ADMIN,
    GET_SHIFTS_DATE_ADMIN_FAILED,
    GET_SHIFTS_DATE_ADMIN_SUCCESS,
    UPDATE_SHIFT,
    UPDATE_SHIFT_FAILED,
    UPDATE_SHIFT_SUCCESS
} from '../../types';

import axiosClient from '../../config/axios';

const AdminState = ({children}) => {

    const initialState = {
        shifts: [],
        loadShifts: null,
        errorShifts: null,
        loadUpdate: null,
        errorUpdate: null
    }

    const [state, dispatch] = useReducer(adminReducer, initialState);

    const getShiftsDate = async (date) => {
        dispatch({
            type: GET_SHIFTS_DATE_ADMIN
        })
        try {
            const response = await axiosClient.get(`/api/shifts/${date}`);
            dispatch({
                type: GET_SHIFTS_DATE_ADMIN_SUCCESS,
                payload: response.data
            })
        } catch (error) {   
            
            dispatch({
                type: GET_SHIFTS_DATE_ADMIN_FAILED
            });
        }
    }

    const updateShift = async (shift) => {
        dispatch({
            type: UPDATE_SHIFT
        });
        
        try {
            const response = await axiosClient.put(`/api/shifts/${shift._id}`, shift);
            dispatch({
                type: UPDATE_SHIFT_SUCCESS,
                payload: response.data.shift
            })
        } catch (error) {
            dispatch({
                type: UPDATE_SHIFT_FAILED
            })
        }
    }

    return(
        <adminContext.Provider
            value={{
                shifts: state.shifts,
                loadShifts: state.loadShifts,
                errorShifts: state.errorShifts,
                getShiftsDate,
                updateShift
            }}
        >{children}</adminContext.Provider>
    )
}
export default AdminState;