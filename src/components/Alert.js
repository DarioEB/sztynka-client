import React from 'react';

const Alert = ({message}) => {
    return(
        <div className="box-alert">
            <p>{message}</p>
        </div>
    );
}

export default Alert;