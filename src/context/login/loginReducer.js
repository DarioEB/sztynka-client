import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTHENTICATED_USER,
    LOGOUT
} from '../../types';



const loginReducer = (state, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                load: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);    
            return {
                    ...state,
                    token: action.payload,
                    authenticated: true,
                    load: false
                }
        case LOGIN_FAILED:
            return {
                ...state,
                load: false,
                error: true,
                msg: action.payload
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: null
            }
        default:
            return state;
    }
} 

export default loginReducer;