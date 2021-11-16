import React from 'react';

import BtnService from './BtnService';

const BoxCategory = ({cNs}) => {

    const { title, services } = cNs;

    return(
        <div className="box-category">
            <h4>{title}</h4>
            <div className="show-services">
                {services.map( service => (
                    <BtnService 
                        key={service._id}
                        service={service}
                    />
                ))}
            </div>
        </div>
    );
}

export default BoxCategory;