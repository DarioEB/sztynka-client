import {
    SHOW_ALERT,
    HIDDEN_ALERT
} from '../../types';

const alertReducer = (state, action) => {
    switch(action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message: action.payload,
                status: true
            }
        case HIDDEN_ALERT:
            return {
                ...state,
                message: null,
                status: false
            }
        default:
            return state;
    }
}

export default alertReducer;