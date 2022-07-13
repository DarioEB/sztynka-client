import React, { useState } from 'react';
import ImageHome from './homeComponents/ImageHome';
import Header from './Header';
import Services from './homeComponents/Services';
import Resume from './homeComponents/Resume';
import Shifts from './homeComponents/Shifts';
const Home = () => {

    const [section, setSection] = useState('services');
    const [paginator, setPaginator] = useState(1); 

    // Disabled date
    const dateNow = new Date();
    const disabled = `${dateNow.getFullYear()}-${(dateNow.getMonth() + 1) < 10 ? `0${(dateNow.getMonth() + 1)}` : dateNow.getMonth()}-${dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate()}`;

    const handleService = () => {
        setSection('services');
        setPaginator(1);
    }

    const handleShifts = () => {
        setSection('shifts');
        setPaginator(2);
    }

    const handleResume = () => {
        setSection('resume');
        setPaginator(3);
    }

    const handlePrev = () => {
        let page = paginator;
        page--;
        setPaginator(page);
        if (page === 1) {
            setSection('services');
        } else if (page === 2) {
            setSection('shifts');
        } else if (page === 3) {
            setSection('resume');
        }
    }

    const handleNext = () => {
        let page = paginator;
        page++;
        setPaginator(page);
        if (page === 1) {
            setSection('services');
        } else if (page === 2) {
            setSection('shifts');
        } else if (page === 3) {
            setSection('resume');
        }
    }

    return (
        <main className="container">
            <div className="content-part">
                <ImageHome />
                <section className="content-layout">
                    <Header name={'Sztynka Barbero'} />
                    <div className="buttons">
                        <button
                            className={`btn ${section === 'services' && 'btn-select'}`}
                            onClick={() => handleService()}
                        >Servicios</button>
                        <button
                            className={`btn ${section === 'shifts' && 'btn-select'}`}
                            onClick={() => handleShifts()}
                        >Turnos</button>
                        <button
                            className={`btn ${section === 'resume' && 'btn-select'}`}
                            onClick={() => handleResume()}
                        >Resumen</button>
                    </div>

                    <div className="tired">
                        <Services
                            state={section}
                        />
                        <Shifts
                            state={section}
                            disabled={disabled}
                        />

                        {
                            /* Resumen se renderiza cada vez que se hace click */
                            section === 'resume'
                            && <Resume
                                state={section}
                                disabled={disabled}
                            />
                        }


                        <div className="paginator">
                            <button
                                className={` btn-prev ${paginator === 1 && 'hidden-button'}`}
                                onClick={() => handlePrev()}
                            ><i className="fas fa-chevron-left"></i></button>
                            <button
                                className={` btn-next ${paginator === 3 && 'hidden-button'}`}
                                onClick={() => handleNext()}
                            ><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </div>


                </section>

            </div>
        </main>
    );
}

export default Home;