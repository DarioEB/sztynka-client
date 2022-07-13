import React, { useReducer } from 'react';

import {
    DATE_DISABLE,
    DATE_DISABLE_SUCCESS,
    DATE_DISABLE_FAILED,
    GET_DATES_DISABLE,
    GET_DATES_DISABLE_FAILED,
    GET_DATES_DISABLE_SUCCESS,
    DATE_ENABLE,
    DATE_ENABLE_FAILED,
    DATE_ENABLE_SUCCESS
} from '../../types';

// Reducer / context
import dateReducer from './dateReducer';
import dateContext from './dateContext';

// Cliente axios
import axiosClient from '../../config/axios';
// Sweetalert
import Swal from 'sweetalert2';
const DateState = ({children}) => {
    
    const initialState = {
        dates: [],
        date: {},
        loadDates: null,
        errorDates: null,
        loadDate: null,
        errorDate: null
    }

    const [state, dispatch] = useReducer(dateReducer, initialState);

    const createDate = async (date) => {
        dispatch({
            type: DATE_DISABLE
        });

        try {
            const response = await axiosClient.post('/api/dates', date);
            dispatch({
                type: DATE_DISABLE_SUCCESS,
                payload: response.data.date
            });
            Swal.fire({
                title: 'La fecha se deshabilitó correctamente',
                text: `La fecha ${date.date} se deshabilitó correctamente.`,
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
                type: DATE_DISABLE_FAILED
            });
            Swal.fire({
                title: 'Error al deshabilitar la fecha.',
                text: `La fecha ${date.date} no se pudo deshabilitar, intente nuevamente más tarde`,
                type: 'error',
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
        }
    }

    const getDates = async () => {
        dispatch({
            type: GET_DATES_DISABLE
        });
        try {
            const response = await axiosClient.get('/api/dates');
            dispatch({
                type: GET_DATES_DISABLE_SUCCESS,
                payload: response.data.dates
            });
        } catch ( error ) {
            dispatch({
                type: GET_DATES_DISABLE_FAILED
            });
        }
    }

    const deleteDate = async (date) => {
        dispatch({
            type: DATE_ENABLE
        });
        try {
            const response = await axiosClient.delete(`/api/dates/${date._id}`);
            dispatch({
                type: DATE_ENABLE_SUCCESS,
                payload: date
            });
            Swal.fire({
                title: 'Fecha habilitada nuevamente',
                text: `La fecha ${response.data.date} se habilitó nuevamente`,
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
                type: DATE_ENABLE_FAILED
            });
            Swal.fire({
                title: 'Error al intentar habilitar la fecha',
                text: `La fecha no se pud habilitar, intentelo más tarde nuevamente`,
                type: 'error',
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
        }
    }

    return (
        <dateContext.Provider
            value={{
                dates: state.dates,
                date: state.date,
                loadDates: state.loadDates,
                errorDates: state.errorDates,
                loadDate: state.loadDate,
                errorDate: state.errorDaate,
                createDate,
                getDates,
                deleteDate
            }}
        >{children}</dateContext.Provider>    
    );
}

export default DateState;