import React, {useState, useContext} from 'react';

// Context de alertas
import alertContext from '../../../context/alerts/alertContext';
// Context Dates
import dateContext from '../../../context/dates/dateContext';

// Alert component
import Alert from '../../Alert';

// Spin
import Spin from '../../Spin';
const CreateBreak = () => {

    // Context de alertas
    const AlertContext = useContext(alertContext); 
    const { viewAlert, hiddenAlert, seconds, message, status } = AlertContext;
    
    // Context de dates
    const DateContext = useContext(dateContext);
    const { createDate, loadDate, dates } = DateContext;

    const [date, setDate] = useState({
        date: ''
    });


    const handleChange = e => {
        const day = new Date(e.target.value).getUTCDay();
        const datesDisable = dates.map( date => date.date);
        if([0].includes(day)) {
            e.preventDefault();
            viewAlert('La fecha que seleccionó es un domingo y no se puede modificar');
            setTimeout( () => {
                hiddenAlert();
            }, seconds);
            return;
        } else if (datesDisable.includes(e.target.value)){
            viewAlert('La fecha seleccionada ya está deshabilitada');
            setTimeout( () => {
                hiddenAlert();
            }, seconds);
            return;
        } else {
            setDate({
                ...date,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        if(date.date === '') {
            viewAlert('Debes seleccionar una fecha primero.');
            setTimeout( () => {
                hiddenAlert();
            }, seconds);    
            return ;
        }
        createDate(date);
    }

    if (loadDate) return <Spin />

    return(
        <div className="form">
            { status && <Alert message={message} />}
            <form
                onSubmit={handleSubmit}
            >
                <div className="field">
                    <label htmlFor="date">Fecha</label>
                    <input 
                        type="date"
                        name="date"
                        id="date"
                        onChange={handleChange}
                    />
                </div>

                <div
                    className="box-submit"
                >
                    <button
                        className="submit"
                        type="submit"
                    >Deshabilitar Fecha</button>
                </div>
            </form>
        </div>
    );
}

export default CreateBreak;