import React, { useContext, useState } from 'react';

// Conext Services
import serviceContext from '../../../context/services/serviceContext';
import alertContext from '../../../context/alerts/alertContext';
// Spin
import Spin from '../../Spin';
import Alert from '../../Alert';
const CreateService = () => {

    // Context de servicio
    const ServiceContext = useContext(serviceContext);
    const { categories, createService, loadService } = ServiceContext;

    // Context de alerta
    const AlertContext = useContext(alertContext);
    const {viewAlert, hiddenAlert, seconds, status, message} = AlertContext;

    // State de Create Service // lOCAL
    const [service, setService] = useState({
        name: '',
        price: '',
        category: ''
    })

    const handleChange = e => {
        setService({
            ...service,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (name === '' || price === '' || category === '') {
            viewAlert('Todos los campos deben estar completos');
            setTimeout( () => {
                hiddenAlert();
            }, seconds);
            return;
        }
        createService(service);
    }

    const { name, price, category }  = service;

    if (loadService) return <Spin />

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
                <div className="field">
                    <label htmlFor="price">Precio</label>
                    <input 
                        type="number"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        value={price}
                    />
                </div>    
                <div className="field">
                    <label htmlFor="category">Categoría</label>
                    <select
                        onChange={handleChange}
                        name="category"
                    >
                        <option value="" selected disabled>-- Selecciona la categoría --</option>
                        {categories.map(category => (
                            <option
                                key={category._id}
                                value={category._id}
                            >{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="box-submit">
                    <button
                        className="submit"
                        type="submit"
                    >Crear  </button>
                </div>
            </form>
        </div>
    );
}
export default CreateService;