import React, {useContext, useEffect, useState} from 'react';
import serviceContext from '../../context/services/serviceContext';

// ServiceActions
import CreateService from './serviceActions/CreateService';
import UpdateService from './serviceActions/UpdateService';
// Scroll
import { animateScroll as scroll } from 'react-scroll';
const AdminServices = () => {

    const ServiceContext = useContext(serviceContext);
    const { getServices, getCategories } = ServiceContext;

    useEffect( () => {
        const downloadServices = () => {
            getServices();
            getCategories();
        }
        downloadServices();
        // eslint-disable-next-line
    }, []);

    const [action, setAction] = useState('');
    
    
    return(
        <div className="content-layout_setting">
            <h4>Administración de Servicios</h4>
            <div className="content-layout_setting_btn">
                <button
                    className="btn"
                    onClick={ () => {setAction('create'); scroll.scrollToBottom();}}
                >Crear Servicio</button>
                <button
                    className="btn"
                    onClick={ () => {setAction('update'); scroll.scrollToBottom()}}
                >Editar Servicio</button>
            </div>

            { action === 'create' && <CreateService />}
            { action === 'update' && <UpdateService />}
        </div>
    );
}

export default AdminServices;