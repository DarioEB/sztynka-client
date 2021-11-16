import React, { useContext, Fragment } from 'react';
import adminContext from '../../context/admin/adminContext';
import Shift from './Shift';
const BoxShifts = ({date}) => {

    const AdminContext = useContext(adminContext);
    const { shifts } = AdminContext;
    
    return (
        <Fragment>
            {shifts.length === 0 && (<p className="no-shifts">Aún no hay turnos registrados para esta fecha</p>)}
            <div className="box-shifts-admin">
                {shifts.map( shift => (
                    <Shift 
                        key={shift._id}
                        shift={shift}
                    />
                ))}
            </div>
        </Fragment>
    );
}

export default BoxShifts;