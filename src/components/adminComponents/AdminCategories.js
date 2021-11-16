import React, { useContext, useEffect, useState } from 'react';

// Category Actions
import CreateCategory from './categoryActions/CreateCategory';
// Scroll
import { animateScroll as scroll } from 'react-scroll';
import serviceContext from '../../context/services/serviceContext';
import UpdateCategory from './categoryActions/UpdateCategory';

const AdminCategories = () => {
    
    const ServiceContext = useContext(serviceContext);
    const { getServices, getCategories } = ServiceContext;

    useEffect(() => {
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
            <h4>Administración de Categorías</h4>
            <div className="content-layout_setting_btn">
                <button
                    className="btn"
                    onClick={ () => {setAction('create'); scroll.scrollToBottom()}}
                >Crear Categoría</button>
                <button
                    className="btn"
                    onClick={ () => {setAction('update'); scroll.scrollToBottom()}}
                >Editar Categoría</button>
            </div>

            { action === 'create' && <CreateCategory /> }
            { action === 'update' && <UpdateCategory /> }
        </div>
    );
}

export default AdminCategories;