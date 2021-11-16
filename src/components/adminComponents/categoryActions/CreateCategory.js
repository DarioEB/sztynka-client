import React, { useContext, useState } from 'react';

// Context Services
import serviceContext from '../../../context/services/serviceContext';
// Context de alertas
import alertContext from '../../../context/alerts/alertContext';
// Componente de carga
import Spin from '../../Spin';
import Alert from '../../Alert';
const CreateCategory = () => {

    // Context de servicios
    const ServiceContext = useContext(serviceContext);
    const { createCategory, loadCategoryUpdate } = ServiceContext;
    // Context de alertas 
    const AlertContext = useContext(alertContext);
    const { viewAlert, hiddenAlert, seconds, status, message } = AlertContext;

    const [category, setCategory] = useState({
        name: ''
    });

    const { name } = category;

    const handleChange = e => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(name === '') {
            viewAlert('El campo debe estar completo');
            setTimeout( () => {
                hiddenAlert();
            }, seconds);
            return null;
        } 
        createCategory(category);
    }

    if(loadCategoryUpdate) return <Spin />

    return(
        <div className="form">
            { status && <Alert message={message} />}
            <form
                onSubmit={handleSubmit}
            >
                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={name}
                    />
                </div>

                <div
                    className="box-submit"
                >
                    <button
                        className="submit"
                        type="submit"
                    >Crear</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCategory;