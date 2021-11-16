import React, { useReducer } from 'react';
import shiftContext from './shiftContext';
import shiftReducer from './shiftReducer';
import {
    CREATE_SHIFT,
    CREATE_SHIFT_SUCCESS,
    CREATE_SHIFT_FAILED,
    ADD_SERVICE_SHIFT,
    REMOVE_SERVICE_SHIFT,
    ADD_NAME_SHIFT,
    ADD_DATE_SHIFT,
    REMOVE_TIME_SHIFT,
    ADD_TIME_SHIFT,
    GET_SHIFTS_DATE,
    GET_SHIFTS_DATE_SUCCESS,
    GET_SHIFTS_DATE_FAILED,
} from '../../types';
import axiosClient from '../../config/axios';

import Swal from 'sweetalert2';

const ShiftState = ({children}) => {

    const initialState = {
        name: '',
        date: '',
        services: [],
        price: 0,
        time: null,
        timename: null,
        creating: null,
        error: null,
        shift: {
            name: '',
            date: '',
            time: '',
            timename: '',
            services: [],
            price: 0
        },
        msg: null,
        times: [],
        shifts: [],
        loadTimes: null,
        errorTimes: null
    }

    const [state, dispatch] = useReducer(shiftReducer, initialState);

    const createShift = async () => {
        dispatch({
            type: CREATE_SHIFT
        });
        try {
            
            const response = await axiosClient.post('/api/shifts', state.shift);
            dispatch({
                type: CREATE_SHIFT_SUCCESS,
                payload: response.data.msg
            });

            Swal.fire({
                title: 'Turno reservado',
                text: `Tu turno se reservoó correctamente. Gracias por elegir Sztynka Barbero`,
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
            }).then(value => {
                if(value.isConfirmed) {
                    window.location.href = process.env.REACT_APP_FRONTEND_URL
                }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: CREATE_SHIFT_FAILED,
                payload: error.response.msg
            })
        }
    }


    const addServiceShift = service => {
        dispatch({
            type: ADD_SERVICE_SHIFT,
            payload: service
        });
    }

    const removeServiceShift = service => {
        dispatch({
            type: REMOVE_SERVICE_SHIFT,
            payload: service
        })
    }

    const setNameShift = name => {
        dispatch({
            type: ADD_NAME_SHIFT,
            payload: name
        });
    }
    
    const setDateShift = date => {
        dispatch({
            type:ADD_DATE_SHIFT,
            payload: date
        })
    }

    const setTimeShift = time => {
        dispatch({
            type: ADD_TIME_SHIFT,
            payload: time
        });
    }

    const removeTimeShift = () => {
        dispatch({
            type: REMOVE_TIME_SHIFT
        })
    }

    const getTextResume = () => {
        const errors = [];
        let text = '';
        if(state.name === '' || state.name.length <= 3) errors.push('Nombre');
        if(state.date === '') errors.push('Fecha');
        if(!state.time) errors.push('Horarios');
        if(state.services.length === 0) errors.push('Servicios');
    
        if(errors.length === 0) {text = "Datos ingresados correctamente";}
        else if(errors.length === 1) {text = `Faltan datos de ${errors[0]}`;}
        else if(errors.length === 2) {text = `Faltan datos de ${errors[0]} y ${errors[1]}`;}
        else if(errors.length === 3) {text = `Faltan datos de ${errors[0]}, ${errors[1]} y ${errors[2]}`;}
        else if(errors.length === 4) {text = `Faltan datos de ${errors[0]}, ${errors[1]}, ${errors[2]} y ${errors[3]}`;}
        return text;
    }

    const getShiftsDate = async (date) => {
        dispatch({
            type: GET_SHIFTS_DATE
        });
        try {
            const response = await axiosClient.get(`/api/shifts/${date}`); 
            dispatch({
                type: GET_SHIFTS_DATE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_SHIFTS_DATE_FAILED
            })
        }
    }

    
    

    return(
        <shiftContext.Provider
            value={{
                name: state.name,
                date: state.date,
                services: state.services,
                price: state.price,
                time: state.time,
                shift: state.shift,
                timename: state.timename,
                times: state.times,
                creating: state.creating,
                error: state.error,
                loadTimes: state.loadTimes,
                errorTimes: state.errorTimes, 
                addServiceShift,
                removeServiceShift,
                setNameShift,
                setDateShift,
                setTimeShift,
                getTextResume,
                removeTimeShift,
                createShift,
                getShiftsDate
            }}
        >
            {children}
        </shiftContext.Provider>
    );
}

export default ShiftState;