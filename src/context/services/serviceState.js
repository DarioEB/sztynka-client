import React, {useReducer} from 'react';
import serviceReducer from './serviceReducer';
import serviceContext from './serviceContext';

import {
    GET_SERVICES,
    GET_SERVICES_SUCCESS,
    GET_SERVICES_FAILED,
    GET_CATEGORIES,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_SUCCESS,
    SET_UPDATE_SERVICE,
    HANDLE_UPDATE_SERVICE,
    CREATE_SERVICE,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILED,
    UPDATE_SERVICE,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAILED,
    CREATE_CATEGORY,
    CREATE_CATEGORY_FAILED,
    CREATE_CATEGORY_SUCCESS,
    SET_UPDATE_CATEGORY,
    HANDLE_UPDATE_CATEGORY,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED
} from '../../types';

import Swal from 'sweetalert2';

import axiosClient from '../../config/axios';

const ServiceState = ({children}) => {
    const initialState = {
        categories: [],
        services: [],
        loadCategories: false,
        loadServices: false,
        errorCategories: null,
        errorServices: null,
        groups: [],
        serviceUpdate: {
            name: '',
            price: '',
            category: '',
            enabled: null
        },
        loadServiceUpdate: null,
        errorServiceUpdate: null,
        categoryUpdate: {
            name: '',
            enabled: null
        },
        loadCategoryUpdate: null,
        errorCategoryUpdate: null
    }

    const [state, dispatch] = useReducer(serviceReducer, initialState);

    const createService = async (service) => {
        dispatch({
            type: CREATE_SERVICE
        });
        try {
            const response = await axiosClient.post('/api/services', service);
            dispatch({
                type: CREATE_SERVICE_SUCCESS,
                payload: response.data.msg
            });
            Swal.fire({
                title: 'Servicio Creado correctamente',
                text: `El servicio ${service.name} se creó correctamente`,
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
            console.log(error);
            dispatch({
                type: CREATE_SERVICE_FAILED
            });
            Swal.fire({
                title: 'Error al crear el servicio',
                text: `No se pudo crear el servicio, intentelo nuevamente más tarde`,
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

    const updateService = async (service) => {
        dispatch({
            type: UPDATE_SERVICE
        })
        try {
            const response = await axiosClient.put(`/api/services/${service._id}`, service);
            dispatch({
                type: UPDATE_SERVICE_SUCCESS,
                payload: response.data.service
            });
            Swal.fire({
                title: 'Servicio actualizado correctamente',
                text: `El servicio se actualizó a ${response.data.service.name} correctamente`,
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
            console.log(error);
            dispatch({
                type: UPDATE_SERVICE_FAILED
            });
            Swal.fire({
                title: 'El Servicio no se pudo actualizar',
                text: `No se pudo actualizar el servicio, intentelo nuevamente más tarde`,
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
            })
        }
    }

    const createCategory = async (category) => {
        dispatch({
            type: CREATE_CATEGORY
        })
        try {
            const response = await axiosClient.post('/api/categories', category);
            console.log(response);
            dispatch({
                type: CREATE_CATEGORY_SUCCESS,
                payload: response.data.category
            });
            Swal.fire({
                title: 'Categoría Creada correctamente',
                text: `La Categoría ${category.name} se creó correctamente`,
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
            console.log(error);
            dispatch({
                type: CREATE_CATEGORY_FAILED
            });
            Swal.fire({
                title: 'Error al crear la categoría',
                text: `No se pudo crear la categoría, intentelo nuevamente más tarde`,
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

    const updateCategory = async (category) => {
        dispatch({
            type: UPDATE_CATEGORY
        })
        try {
            const response = await axiosClient.put(`/api/categories/${category._id}`, category);
            dispatch({
                type: UPDATE_CATEGORY_SUCCESS,
                payload: response.data.category
            });
            Swal.fire({
                title: 'Categoría modificada correctamente',
                text: `La categoría ${category.name} se modificó correctamente`,
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
            console.log(error);
            dispatch({
                type: UPDATE_CATEGORY_FAILED
            });
            Swal.fire({
                title: 'Error al modificar la categoría',
                text: `No se pudo modificar la categoría, intentelo nuevamente más tarde`,
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

    const getCategories = async () => {
        dispatch({
            type: GET_CATEGORIES
        });

        try {
            const response = await axiosClient.get('/api/categories');
            // console.log(response);
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: response.data.categories
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_CATEGORIES_FAILED
            })
        }
    }

    const getServices = async () => {
        dispatch({
            type: GET_SERVICES
        });
        try {
            const response = await axiosClient.get('/api/services');
            // console.log(response);
            dispatch({
                type: GET_SERVICES_SUCCESS,
                payload: response.data.services
            });

            
        } catch(error) {
            dispatch({
                type: GET_SERVICES_FAILED
            })
        }
    }

    const setGroups = () => {
        const categories = state.categories;
        const services = state.services;
        let groups = [];
        categories.forEach(category => {
            let gr = services.filter(service => service.category === category._id);
            groups.push({title: category.name, services: gr});
        });
        
        return groups;
    }
    // Selecciona el servicio a modificar dentro del state
    const setUpdateService = (service) => { 
        dispatch({
            type: SET_UPDATE_SERVICE,
            payload: service
        })
    }

    const setUpdateCategory = (category) => {
        dispatch({
            type: SET_UPDATE_CATEGORY,
            payload: category
        })
    }

    // A partir de evento change cambio los valores del serviceUpdate
    const handleUpdateService = (name, value) => {
        dispatch({
            type: HANDLE_UPDATE_SERVICE,
            payload: {name, value}
        })
    }

    const handleUpdateCategory = (name, value) => {
        dispatch({
            type: HANDLE_UPDATE_CATEGORY,
            payload: {name, value}
        })
    }


    return(
        <serviceContext.Provider
            value={{
                categories: state.categories,
                services: state.services,
                serviceUpdate: state.serviceUpdate,
                loadServiceUpdate: state.loadServiceUpdate,
                errorServiceUpdate: state.loadServiceUpdate,
                loadCategories: state.loadCategories,
                loadServices: state.loadServices,
                errorCategories: state.errorCategories,
                errorServices: state.errorServices,
                categoryUpdate: state.categoryUpdate,
                loadCategoryUpdate: state.loadCategoryUpdate,
                errorCategoryUpdate: state.errorCategoryUpdate,
                getCategories,
                getServices,
                setGroups,
                setUpdateService,
                handleUpdateService,
                createService,
                updateService,
                createCategory,
                setUpdateCategory,
                handleUpdateCategory,
                updateCategory
            }}
        >
            {children}
        </serviceContext.Provider>
    )
}

export default ServiceState;