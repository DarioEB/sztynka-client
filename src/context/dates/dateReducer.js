import {
    DATE_DISABLE,
    DATE_DISABLE_FAILED,
    DATE_DISABLE_SUCCESS,
    DATE_ENABLE,
    DATE_ENABLE_FAILED,
    DATE_ENABLE_SUCCESS,
    GET_DATES_DISABLE,
    GET_DATES_DISABLE_FAILED,
    GET_DATES_DISABLE_SUCCESS
} from '../../types';

const dateReducer = (state, action) => {
    switch(action.type) {
        case GET_DATES_DISABLE:
            return {
                ...state,
                loadDates: true
            }
        case GET_DATES_DISABLE_SUCCESS:
            return {
                ...state,
                loadDates: false,
                errorDates: null,
                dates: action.payload
            }
        case GET_DATES_DISABLE_FAILED:
            return {
                ...state,
                loadDates: false,
                errorDates: true
            }
        case DATE_DISABLE:
            return {
                ...state,
                loadDate: true
            }
        case DATE_DISABLE_SUCCESS:
            return {
                ...state,
                loadDate: false,
                errorDate: null,
                dates: [...state.dates, action.payload]
            }
        case DATE_DISABLE_FAILED:
            return {
                ...state,
                loadDate: false,
                errorDate: true
            }
        case DATE_ENABLE:
            return {
                ...state,
                loadDate: false
            }
        case DATE_ENABLE_SUCCESS:
            return {
                ...state,
                loadDate: false,
                errorDate: null,
                dates: state.dates.filter( date => date._id !== action.payload._id)
            }
        case DATE_ENABLE_FAILED:
            return {
                ...state,
                loadDate: false,
                errorDate: true
            }
        default:
            return state;
    }
}

export default dateReducer;