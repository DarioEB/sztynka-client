import React,{ useState, useEffect, useContext } from 'react';
import BoxShift from './BoxShifts';

import Spin from '../Spin';
import adminContext from '../../context/admin/adminContext';
const Shifts = () => {
    
    let d = new Date();
    const [date, setDate] = useState(`${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? `0${(d.getMonth() + 1)}` : d.getMonth()}-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`);
    
    const AdminContext = useContext(adminContext);
    const { getShiftsDate, loadShifts } = AdminContext;

    useEffect( () => {
        getShiftsDate(date);
        // eslint-disable-next-line
    }, [date])

    const handleDate = e => {
        setDate(e.target.value);
    }

    if(loadShifts) return <Spin />

    return(
        <div className="content-section">
            <div className="title">
                <h2>Turnos</h2>
                <span>Selecciona la fecha para los turnos en ese día</span>
            </div>

            <div className="form">
                
                <form>
                    <div className="field">
                        <label>Fecha</label>
                        <input 
                            type="date"
                            name="date"
                            id="date"
                            onChange={handleDate}
                            value={date}
                        />
                    </div>
                </form>
            </div>

            <BoxShift date={date}/>
            
            
            
        </div>
    );
}

export default Shifts;