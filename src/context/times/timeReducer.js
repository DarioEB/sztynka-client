import {
    GET_TIMES,
    GET_TIMES_SUCCESS,
    GET_TIMES_FAILED
} from '../../types';

const timeReducer = (state, action) => {
    switch(action.type) {
        case GET_TIMES:
            return{
                ...state,
                loading: true
            }
        case GET_TIMES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                times: action.payload
            }
        case GET_TIMES_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            }

        default:
            return state
    }
}

export default timeReducer;