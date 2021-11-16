import React,{ useState } from 'react';

import AdminServices from './AdminServices';
import { animateScroll as scroll } from 'react-scroll';
import AdminCategories from './AdminCategories';
import AdminBreaks from './AdminBreaks';
const Settings = () => {

    const [section, setSection] = useState('');

    const handleSection = sec => {
        setSection(sec);
        scroll.scrollToBottom();    
    }

    return(
        <div className="content-section">
            <div className="title">
                <h2>Configuración</h2>
                <span>Edita las categorías, servicios y días de descanso</span>
            </div>

            <div className="content-settings">
                <div>
                    <div className="content-settings_buttons">  
                        <button 
                            className={`btn ${section === 'services' && 'btn-select'}`}
                            onClick={() => handleSection('services')}    
                        >Servicios</button>
                        <button 
                            className={`btn ${section === 'categories' && 'btn-select'}`}
                            onClick={() => handleSection('categories')}    
                        >Categorías</button>
                        <button 
                            className={`btn ${section === 'breaks' && 'btn-select'}`}
                            onClick={() => handleSection('breaks')}    
                        >Días de descanso</button>
                    </div>
                </div>
                
                { section === 'services' && <AdminServices /> }
                { section === 'categories' && <AdminCategories />}
                { section === 'breaks' && <AdminBreaks />}
            </div>

        </div>
    );
}

export default Settings;