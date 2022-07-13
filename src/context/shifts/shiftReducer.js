import {
    CREATE_SHIFT,
    ADD_SERVICE_SHIFT,
    REMOVE_SERVICE_SHIFT,
    ADD_NAME_SHIFT,
    ADD_DATE_SHIFT,
    ADD_TIME_SHIFT,
    REMOVE_TIME_SHIFT,
    CREATE_SHIFT_SUCCESS,
    CREATE_SHIFT_FAILED,
    GET_SHIFTS_DATE,
    GET_SHIFTS_DATE_FAILED,
    GET_SHIFTS_DATE_SUCCESS
} from '../../types';

const shiftReducer = (state, action) => {
    switch(action.type) {
        case ADD_SERVICE_SHIFT:
            return {
                ...state,
                services: [...state.services, action.payload],
                price:  state.price + action.payload.price,
                shift: {...state.shift, services: [...state.shift.services, action.payload], price: state.shift.price + action.payload.price }
            }
        case REMOVE_SERVICE_SHIFT:
            return {
                ...state,
                services: state.services.filter( service => service._id !== action.payload._id ),
                price: state.price - action.payload.price,
                shift: { ...state.shift, services: state.shift.services.filter( service => service._id !== action.payload._id), price: state.shift.price - action.payload.price} 
            }
        case ADD_NAME_SHIFT:
            return {
                ...state,
                name: action.payload,
                shift: { ...state.shift, name: action.payload}
            }
        case ADD_DATE_SHIFT:
            return {
                ...state,
                date: action.payload,
                time: null,
                timename: null,
                shift: { ...state.shift, date: action.payload, time: '', timename: '' }
            }
        case ADD_TIME_SHIFT:
            return {
                ...state,
                time: action.payload._id,
                timename: action.payload.time,
                shift: {...state.shift, time: action.payload._id, timename: action.payload.time }
            }
        case REMOVE_TIME_SHIFT:
            return {
                ...state,
                time: null,
                timename: null,
                shift: { ...state.shift, time: null, timename: null }
            }
        case CREATE_SHIFT:
            return {
                ...state,
                creating: true,
                error: false
            }
        case CREATE_SHIFT_SUCCESS:
            return {
                ...state,
                creating: false,
                error: null,
                msg: action.payload
            }
        case CREATE_SHIFT_FAILED:
            return {
                ...state,
                msg: action.payload,
                error: true,
                creating: false, 
                date: '',
                time: null,
                timename: null,
                shift: { ...state.shift, date: '', time: null, timename: null },
                times: [],
            }
        case GET_SHIFTS_DATE:
            return {
                ...state,
                loadTimes: true
            }
        case GET_SHIFTS_DATE_FAILED:
            return {
                ...state,
                loadTimes: false,
                errorTimes: true 
            }
        case GET_SHIFTS_DATE_SUCCESS:
            return {
                ...state,
                times: action.payload.times.map(time => action.payload.shifts.map(shift => shift.time).includes(time._id) ? {...time, enabled: false} : {...time} ),
                shifts: action.payload.shifts.map(shift => shift.time),
                loadTimes: false,
                errorTimes: true
            }
        default:
            return state
    }
}

export default shiftReducer;
