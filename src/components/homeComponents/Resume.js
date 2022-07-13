import React, { useState, useEffect, useContext } from 'react';
import shiftContext from '../../context/shifts/shiftContext';
import Spin from '../Spin';
const Resume = ({ state }) => {

    const ShiftContext = useContext(shiftContext);
    const { name, date, services, timename, price, getTextResume, createShift, creating } = ShiftContext;

    const [text, setText] = useState('');

    useEffect(() => {
        if(!creating) { 
            setText(getTextResume());
        }
        // eslint-disable-next-line
    }, [creating])
    

    const handleShift = () => {
        createShift();
    }

    if(creating) return <Spin />

    return (
        <div className={`content-section ${state === 'resume' ? 'show' : 'hidden'}`}>
            <div className="title">
                <h2>Resumen</h2>
                <span>{text}</span>
            </div>

            <div className="content-layout">

                <div className="show-resume">
                    <div>
                        <h4>Información del turno</h4>
                        <p>Nombre:  <span> {name}</span></p>
                        <p>Fecha:  <span> {date}</span></p>
                        <p>Horario elegido:  <span> {timename}</span></p>
                    </div>

                    {services.length === 0 ? null :
                    (
                        <div>
                            <h4>Información de servicios</h4>
                            {services.map(service => (
                                <div
                                    key={service._id}
                                    className="resume-services"
                                ><p>{service.name}</p> <p>${service.price}</p></div>
                            ))}
                            <p>Total a pagar:  <span>$ {price}</span></p>
                        </div>
                    )}
                </div>

                <div className="box-submit">

                    {text === "Datos ingresados correctamente"
                        ?
                        (
                            <button
                                className={`submit btn-enabled`}
                                
                                onClick={() => handleShift()}
                            >Confirmar Turno</button>
                        )
                        :
                        (
                            <>
                                <p>
                                    (Completa los datos para confirmar el turno)
                                </p>
                                <button
                                    className={`submit btn-disabled`}
                                >Confirmar Turno</button>
                            </>

                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default Resume;