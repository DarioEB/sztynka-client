import React,{ useContext, useEffect } from 'react';

import shiftContext from '../../context/shifts/shiftContext';
import alertContext from '../../context/alerts/alertContext';
import dateContext from '../../context/dates/dateContext';

import BtnTime from './BtnTime';
import Spin from '../Spin';
import Alert from '../Alert';
const Shifts = ({state, disabled}) => {
    
    // Context ShiftContext
    const ShiftContext = useContext(shiftContext);
    const {name, setNameShift, date, setDateShift, getShiftsDate, times, loadTimes} = ShiftContext;
    
    // Context alertas
    const AlertContext = useContext(alertContext);
    const {viewAlert, hiddenAlert, seconds, status, message } = AlertContext;

    // Context fechas deshablitas
    const DateContext = useContext(dateContext);
    const { getDates, dates } = DateContext;

    useEffect( () => {
        const downloadDates = () => {
            getDates();
        }
        downloadDates();
        // eslint-disable-next-line
    }, []);

    const handleName = (e) => {
        if(e.target.value.length <= 3) {
            viewAlert('El nombre ingresado es muy corto');
        }
        hiddenAlert();
        setNameShift(e.target.value);
    }
    
    const handleDate = (e) => {
        const day = new Date(e.target.value).getUTCDay();
        const datesDisable = dates.map(date => date.date);
        if([0].includes(day)) { // Anular turnos día domingo
            e.preventDefault();
            setDateShift('');
            viewAlert('La barbería no trabaja los días domingos');
            setTimeout( () => {
                hiddenAlert();
            }, seconds)
        } else if(datesDisable.includes(e.target.value)) {
            e.preventDefault();
            setDateShift('');
            viewAlert('La barbería no trabaja en esa fecha, intente con otra por favor. Gracias.');
            setTimeout( () => {
                hiddenAlert();
            }, seconds)
        } else {
            setDateShift(e.target.value);
            getShiftsDate(e.target.value);
        }
    }

    return(
        <div className={`content-section ${state === 'shifts' ? 'show' : 'hidden'}`}>
            <div className="title">
                <h2>Turnos</h2>
                <span>Ingresa tu nombre y selecciona la fecha y hora del turno</span>
            </div>
            {
                status ? <Alert message={message}/> : null
            }
            <div className="form">

                <form className="">

                    <div className="field">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Tu Nombre"
                            onChange={handleName}
                            value={name}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="date">Fecha</label>
                        <input 
                            type="date"
                            name="date"
                            id="date"
                            onChange={handleDate}
                            min={disabled}
                            value={date}
                        />
                    </div>

                    <div className="field">
                        <label>Hora</label>
                            {loadTimes
                            ? (<Spin />)
                            :   <div className="box-times">
                                    {times.map(time => (
                                        <BtnTime 
                                            key={time._id}
                                            timeBtn={time}
                                        />
                                    ))}
                                </div>
                            }                        
                    </div>

                </form>
            </div>
                        
            
        </div>
    )
}

export default Shifts;