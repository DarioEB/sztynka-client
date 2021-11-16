import React,{ useContext } from 'react';

// Context Date
import dateContext from '../../../context/dates/dateContext';

const ListBreak = () => {

    // Context de fecha
    const DateContext = useContext(dateContext);
    const { dates, deleteDate } = DateContext;

    const format = (date) => {
        const dateF = new Date(date);
        let newDate = `${(dateF.getDate()+1 < 10 ? `0${dateF.getDate()+1}` : dateF.getDate()+1)}-${(dateF.getMonth()+1 < 10 ? `0${dateF.getMonth()+1}` : dateF.getMonth()+1)}-${dateF.getFullYear()}`
        return newDate;
    }

    const handleEnable = (date) => {
        deleteDate(date);
    };

    return(
        <div className="list-date-disable">
            <h4>Fechas deshabilitadas</h4>
            <ul>
                {dates.map(date => (
                    <li
                        key={date._id}
                    >
                        <p>{format(date.date)}</p>
                        <button
                            className="btn-enable-date"
                            onClick={ () => handleEnable(date)}
                        >Habilitar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListBreak;