import {
    GET_SHIFTS_DATE_ADMIN,
    GET_SHIFTS_DATE_ADMIN_FAILED,
    GET_SHIFTS_DATE_ADMIN_SUCCESS,
    UPDATE_SHIFT,
    UPDATE_SHIFT_FAILED,
    UPDATE_SHIFT_SUCCESS
} from '../../types';

const adminReducer = (state, action) => {
    switch(action.type) {
        case GET_SHIFTS_DATE_ADMIN:
            return {
                ...state,
                loadShifts: true
            }
        case GET_SHIFTS_DATE_ADMIN_SUCCESS:
            return {
                ...state,
                loadShifts: false,
                errorShifts: null,
                shifts: action.payload.shifts
            }
        case GET_SHIFTS_DATE_ADMIN_FAILED:
            return {
                ...state,
                loadShifts: false,
                errorShifts: true
            }
        case UPDATE_SHIFT:
            return {
                ...state,
                loadUpdate: true
            }
        case UPDATE_SHIFT_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                shifts: state.shifts.map( shift => shift._id === action.payload._id ? action.payload : shift ),
                loadUpdate: null,
                errorUpdate: null
            }
        case UPDATE_SHIFT_FAILED:
            return {
                ...state,
                loadUpdate: null,
                errorUpdate: true
            }
        default:
            return state;
    }
} 

export default adminReducer;