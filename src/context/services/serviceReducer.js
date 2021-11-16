import {
    GET_SERVICES,
    GET_SERVICES_FAILED,
    GET_SERVICES_SUCCESS,
    GET_CATEGORIES,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_SUCCESS,
    SET_UPDATE_SERVICE,
    CREATE_SERVICE,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILED,
    HANDLE_UPDATE_SERVICE,
    UPDATE_SERVICE,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAILED,
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,
    SET_UPDATE_CATEGORY,
    HANDLE_UPDATE_CATEGORY,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED
} from '../../types';

const serviceReducer = (state, action) => {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                loadCategories: true
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loadCategories: false,
                categories: action.payload,
                errorCategories: null
            }
        case GET_CATEGORIES_FAILED:
            return {
                ...state,
                loadCategories: false,
                errorCategories: true
            }
        case GET_SERVICES:
            return {
                ...state,
                loadServices: true
            }
        case GET_SERVICES_SUCCESS:
            return {
                ...state,
                loadServices: false,
                services: action.payload,
                errorServices: null
            }
        case GET_SERVICES_FAILED:
            return {
                ...state,
                loadServices: false,
                errorServices: true
            }
        case SET_UPDATE_SERVICE:
            return {
                ...state,
                serviceUpdate: state.services.find(service => service._id === action.payload)
            }
        case SET_UPDATE_CATEGORY:
            return {
                ...state,
                categoryUpdate: state.categories.find( category => category._id === action.payload)
            }
        case CREATE_SERVICE:
            return {
                ...state,
                loadServiceUpdate: true                
            }
        case CREATE_SERVICE_SUCCESS:
            return {
                ...state,
                loadServiceUpdate: false,
                errorServiceUpdate: null,
                services: [...state.services, action.payload]
            }
        case CREATE_SERVICE_FAILED:
            return {
                ...state,
                loadServiceUpdate: false,
                errorServiceUpdate: true
            }
        case HANDLE_UPDATE_SERVICE:
            return {
                ...state,
                serviceUpdate: {...state.serviceUpdate, [action.payload.name]: action.payload.value}
            }
        case HANDLE_UPDATE_CATEGORY:
            return {
                ...state,
                categoryUpdate: { ...state.categoryUpdate, [action.payload.name]: action.payload.value}
            }
        case UPDATE_SERVICE: 
            return {
                ...state,
                loadServiceUpdate: true
            }
        case UPDATE_SERVICE_SUCCESS:
            return {
                ...state,
                loadServiceUpdate: false,
                errorServiceUpdate: null,
                services: state.services.map( service => service._id === action.payload._id ? action.payload : service),
                serviceUpdate: {
                    name: '',
                    price: '',
                    category: '',
                    enabled: null
                }
            }
        case UPDATE_SERVICE_FAILED:
            return {
                ...state,
                loadServiceUpdate: false,
                errorServiceUpdate: true,
                serviceUpdate: null
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                loadCategoryUpdate: true
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loadCategoryUpdate: false,
                errorCategoryUpdate: null,
                categories: [...state.categories, action.payload]
            }
        case CREATE_CATEGORY_FAILED:
            return {
                ...state,
                loadCategoryUpdate: false,
                errorCategoryUpdate: true
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                loadCategoryUpdate: true
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loadCategoryUpdate: false,
                errorCategoryUpdate: false,
                categories: state.categories.map( category => category._id === action.payload._id ? action.payload : category),
                categoryUpdate: {
                    name: '',
                    enabled: null
                }
            }
        case UPDATE_CATEGORY_FAILED:
            return {
                ...state,
                loadCategoryUpdate: false,
                errorCategoryUpdate: true
            }
        default:
            return state;
    }
}

export default serviceReducer;