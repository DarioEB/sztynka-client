import React, { useState, useContext } from 'react';
import shiftContext from '../../context/shifts/shiftContext';
import alertContext from '../../context/alerts/alertContext';
const BtnTime = ({timeBtn}) => {

    let currectTime = new Date();
    let day = new Date();
    let strTime = `${(currectTime.getHours() < 10) ? `0${currectTime.getHours()}` : `${currectTime.getHours()}`}`;
    let strDay = `${day.getFullYear()}-${(day.getMonth()+1) < 10 ? `0${day.getMonth()+1}` : day.getMonth()+1}-${day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()}`;

    // Context Shifts
    const ShiftContext = useContext(shiftContext);
    const { timename, setTimeShift, removeTimeShift, date } = ShiftContext;

    // Alerts Context
    const AlertContext = useContext(alertContext);
    const {viewAlert, hiddenAlert, seconds} = AlertContext;

    // State Local
    const [selectTime, setSelectTime] = useState(false);

    // Evento de click en el horario habilitado
    const handleTime = (timeSelect) => {
        if(!timename) {
            setSelectTime(!selectTime);
            setTimeShift(timeSelect);
        }
        if(timename === timeSelect.time) {
            setSelectTime(!selectTime);
            removeTimeShift();
            hiddenAlert();
        }
        if(timename !== null && timename !== timeSelect.time) {
            viewAlert('Desmarque el horario actual para seleccionar otro.')
            setTimeout(() => {
                hiddenAlert();
            }, seconds)
        }
    }

    // Eventos de click en el horarios no habilitado
    const handleNo = (timeBtn) => {
        viewAlert('Ese horario no está disponible, elige otro');
        setTimeout(() => {
            hiddenAlert();
        }, seconds)
    }

    const handleImposible = () => {
        viewAlert('Ya no es posible elegir este horarario')
    }   


    if (parseInt(timeBtn.time) <= parseInt(strTime) && strDay === date) {
        return(
            <div
                className="btn-time btn-imposible"
                onClick={ () => handleImposible()}
            >
                {timeBtn.time}
            </div>
        )
    }

    if (!timeBtn.enabled) {
        return(
            <div
                className="btn-time btn-no"
                onClick={() => handleNo(timeBtn)}
            >
                {timeBtn.time}
            </div>
        )
    }

    return(
        
        <div
            onClick={() => handleTime(timeBtn)}
            className={`btn-time ${(timename && timeBtn.time !== timename)  && 'btn-no'} ${selectTime ? 'btn-time_select' : ''}`}
        >
            {timeBtn.time}
        </div>
    );
}

export default BtnTime;