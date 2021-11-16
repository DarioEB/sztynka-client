import React, { useContext } from 'react';

// Context Servicio
import serviceContext from '../../../context/services/serviceContext';
import alertContext from '../../../context/alerts/alertContext';

// Spin
import Spin from '../../Spin';
import Alert from '../../Alert';
const UpdateService = () => {
    
    // Context de servicio
    const ServiceContext = useContext(serviceContext);
    const { categories, services, loadService, serviceUpdate, setUpdateService, handleUpdateService, updateService } = ServiceContext;

    // Context de alerta
    const AlertContext = useContext(alertContext);
    const { viewAlert, hiddenAlert, seconds, status, message} = AlertContext;

    const handleChange = e => {
        handleUpdateService(e.target.name, e.target.value);
    }


    const handleSubmit = e => {
        e.preventDefault();

        if(serviceUpdate.name === '' || serviceUpdate.price === '' || serviceUpdate.category === '') {
            viewAlert('Todos los campos son obligatorios');
            setTimeout( () => {
                hiddenAlert();
            }, seconds);
            return;
        }
        updateService(serviceUpdate);
    }

    const handleChangeService = e => {
        setUpdateService(e.target.value);
    }

    if(loadService) return <Spin />

    return(

        <div className="form"> 
            <p>Selecciona el servicio a editar</p>
            <select
                className="select-services"
                name="service"
                onChange={handleChangeService}
            >
                <option value="" disabled selected>-- Selecciona el servivio a editar --</option>
                {services.map(service => (
                    <option
                        key={service._id}
                        value={service._id}
                    >{service.name}</option>
                ))}
            </select>
            
            { status && <Alert message={message} />}
            {
                serviceUpdate._id
                && (
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
                                value={serviceUpdate.name}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="price">Precio</label>
                            <input 
                                type="number"
                                name="price"
                                id="price"
                                onChange={handleChange}
                                value={serviceUpdate.price}
                            />
                        </div>    
                        <div className="field">
                            <label htmlFor="category">Categoría</label>
                            <select
                                onChange={handleChange}
                                name="category"
                            >
                                <option value="" >-- Selecciona la categoría --</option>
                                {categories.map(category => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                        selected={category._id === serviceUpdate.category}
                                    >{category.name}</option>
                                ))}
                            </select>
                        </div>
                        

                        <div className="container-switch">
                            <div className="box-switch"
                                onClick={() => handleUpdateService('enabled' ,  !(serviceUpdate.enabled))}
                            >
                                <button
                                    className={`switch ${serviceUpdate.enabled ? 'switch-enabled' : 'switch-disabled' }`}
                                    onClick={ (e) => e.preventDefault()}
                                >
                                </button>
                            </div>
                            <p 
                                className={`state ${serviceUpdate.enabled ? 'green' : 'red'}`}
                            >{serviceUpdate.enabled ? 'Habilitado' : 'Deshabilitado'}</p>
                        </div>

                        <div className="box-submit">
                            <button
                                className="submit"
                                type="submit"
                            >Guardar Cambios</button>
                        </div>
                    </form>
                )
            }
        </div>
    );
}

export default UpdateService;