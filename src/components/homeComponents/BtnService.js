import React, {useState, useContext } from 'react';
import shiftContext from '../../context/shifts/shiftContext';
const BtnService = ({service}) => {
    
    const {name, price} = service;
    const [select, setSelect] = useState(false);
    
    // Context de Turnos
    const ShiftContext = useContext(shiftContext);
    const { addServiceShift, removeServiceShift } = ShiftContext;

    const handleService = () => {
        setSelect(!select);
        
        if(!select) {
            addServiceShift(service)
        } else {
            removeServiceShift(service);
        }   
    }

    

    return(
        <button
            className={`btn-service ${select ? 'select-service' : ''}`}
            onClick={() => handleService()}
        >
            <p className="btn-service_name">{name}</p>
            <p className="btn-service_price">$ {price}</p>
            <span className="fas fa-check"></span>
        </button>
    );
}

export default BtnService;