import React, { useContext, useEffect } from 'react';
import serviceContext from '../../context/services/serviceContext';
import BoxCategory from './BoxCategory';
import Spin from '../Spin';
const Services = ({state}) => {

    // if(state !== 'services') return null;

    /* Service Context */
    const ServiceContext = useContext(serviceContext);
    const { getCategories, getServices, setGroups, loadServices, loadCategories } = ServiceContext;

    useEffect(() => {
        const downloadCategories = () => {
            getCategories();
            getServices();
        }
        downloadCategories();
        // eslint-disable-next-line
    }, []);

    let cs = setGroups();


    return(
        <div className={`content-section ${state === 'services' ? 'show' : 'hidden'}`}>
            <div className="title">
                <h2>Servicios</h2>
                { (loadServices || loadCategories)
                ? <span>Cargando servicios...</span>
                : <span>Elige los servicios que deseas</span>
                }
                
            </div>

            { (loadServices || loadCategories)
                ? <Spin />
                : 
                cs.map( cNs => (
                    <BoxCategory 
                        key={cNs.title}
                        cNs={cNs}
                    />
                ))
            }
            
        </div>
    );
}

export default Services;