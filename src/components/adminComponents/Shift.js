import React,{useState, useContext} from 'react';
import adminContext from '../../context/admin/adminContext';

import Spin from '../Spin';
const Shift = ({shift}) => {

    const AdminContext = useContext(adminContext);
    const { updateShift, loadUpdate } = AdminContext;

    const [ ss, setSs] = useState(false);
    const { name , timename, services, price, done } = shift;

    const handleUpdate = shift => {
        if(shift.done ) {
            shift.done = false
        } else {
            shift.done = true;
        }
        updateShift(shift);
    }
    
    return(
        <div className="shift">
            <div className="content-shift">
                <div className="shift-info">
                    <div>
                        <p>{timename}</p>
                        <p>{name}</p>
                    </div>
                    <div className="shift-box-button">
                        <button
                            onClick={() => setSs(!ss)}
                            className={`${ss && 'pressed'}`}
                        >
                            <i className={`fas ${ss ? 'fa-chevron-up' : 'fa-chevron-down' }`}></i>
                        </button>
                    </div>
                </div>
                <div className={`${ss ? 'shift-services' : 'no-ss'}`}>
                    <p>Servicios:</p>
                    <ul>
                        {services.map( service => (
                            <li
                                key={service._id}
                            ><p>{service.name}</p> <p>$ {service.price}</p></li>
                        ))}
                    </ul>
                    <div  className="total-price">
                        <p>Precio total:</p>
                        <span>$ {price}</span>
                    </div>
                </div>

            </div>  
            
            {loadUpdate ?
                (
                    <Spin />
                ) : (
                    <div className={`btn-shift`}>
                    <button 
                        className={`${done ? 'done' : 'no-done'}`}
                        onClick={() => handleUpdate(shift)}
                    >
                        {done ? 'Realizado' : 'Pendiente'}
                    </button>
                </div>
                )
            }

            
        </div>
    );
}

export default Shift;