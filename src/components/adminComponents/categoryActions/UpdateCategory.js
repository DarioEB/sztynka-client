import React, { useContext } from 'react';

// Context Servicio
import serviceContext from '../../../context/services/serviceContext';
import alertContext from '../../../context/alerts/alertContext';

// Spin
import Spin from '../../Spin';

import Alert from '../../Alert';
const UpdateCategory = () => {

    // Context de servicio
    const ServiceContext = useContext(serviceContext);
    const { categories, categoryUpdate, loadCategoryUpdate , setUpdateCategory, handleUpdateCategory, updateCategory } = ServiceContext;

    // Context de alerta
    const AlertContext = useContext(alertContext);
    const { viewAlert, hiddenAlert, seconds, status, message } = AlertContext;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (categoryUpdate.name === '') {
            viewAlert('Todos los campos son obligatorios');
            setTimeout(() => {
                hiddenAlert()
            }, seconds);
            return;
        }
        updateCategory(categoryUpdate);
    }

    const handleChange = e => {
        handleUpdateCategory(e.target.name, e.target.value);
    }

    const handleChangeCategory = e => {
        setUpdateCategory(e.target.value);
    }

    if(loadCategoryUpdate) return <Spin />

    return (
        <div className="form">
            <p>Selecciona la Categoría a editar</p>
            <select
                className="select-services"
                name="category"
                onChange={handleChangeCategory}
            >
                <option value="" disabled selected>-- Selecciona la categoría a editar --</option>
                {categories.map(category => (
                    <option
                        key={category._id}
                        value={category._id}
                    >{category.name}</option>
                ))}
            </select>
            
            { status && <Alert message={message} />}
            {categoryUpdate._id
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
                                value={categoryUpdate.name}
                            />
                        </div>

                        <div className="container-switch">
                            <div className="box-switch"
                                onClick={() => handleUpdateCategory('enabled', !(categoryUpdate.enabled))}
                            >
                                <button
                                    className={`switch ${categoryUpdate.enabled ? 'switch-enabled' : 'switch-disabled'}`}
                                    onClick={(e) => e.preventDefault()}
                                >
                                </button>
                            </div>
                            <p
                                className={`state ${categoryUpdate.enabled ? 'green' : 'red'}`}
                            >{categoryUpdate.enabled ? 'Habilitado' : 'Deshabilitado'}</p>
                        </div>

                        <div
                            className="box-submit"
                        >
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

export default UpdateCategory;