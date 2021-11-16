import React, { useState, useEffect, useContext } from 'react';

// Break Actions
import CreateBreak from './breakActions/CreateBreak';
// Context Dates
import dateContext from '../../context/dates/dateContext';
// Scroll
import { animateScroll as scroll } from 'react-scroll';
import ListBreak from './breakActions/ListBreak';
const AdminBreaks = () => {
    
    // Context Dates
    const DateContext = useContext(dateContext);
    const { getDates } = DateContext;

    useEffect( () => {
        const downloadDates = () => {   
            getDates();
        }
        downloadDates();
        // eslint-disable-next-line
    }, [])

    const [action, setAction] = useState('');
    
    return(
        <div className="content-layout_setting">
            <h4>Administración de días de franco</h4>
            <div className="content-layout_setting_btn">
                <button
                    className="btn"
                    onClick={ () => {setAction('create'); scroll.scrollToBottom()}}
                >Deshabilitar una Fecha</button>
                <button
                    className="btn"
                    onClick={ () => {setAction('delete'); scroll.scrollToBottom()}}
                >Ver todas las fecha</button>
            </div>

            {action === 'create' &&  <CreateBreak />}
            {action === 'delete' && <ListBreak />}

        </div>
    );
}

export default AdminBreaks;