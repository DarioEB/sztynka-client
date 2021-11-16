import React from 'react';

import { useHistory } from 'react-router-dom';

const ImageHome = (props) => {

    const history = useHistory();

    return(
        <div className="image-home">
            <div>
                <button 
                    onClick={() => history.push('/login')}
                    className="image-home_btn">
                    <i className="fas fa-user-cog"></i>
                </button>
            </div>
        </div>
    );
}

export default ImageHome;