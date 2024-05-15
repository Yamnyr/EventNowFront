import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DateCard from "../../components/DateCard";

const Planing = () => {
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchEvents = async () => {
    //         try {
    //             // const response = await axios.get('http://127.0.0.1:8000/api/evenements?page=1');
    //             const response = await axios.get('http://127.0.0.1:8000/api/evenements?page=1');
    //             setEvents(response.data['hydra:member']);
    //             setLoading(false);
    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchEvents();
    // }, []);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // const response = await axios.get('http://127.0.0.1:8000/api/evenements?page=1');
                const response = await axios.get('http://127.0.0.1:8000/dates/getall');
                // console.log(response.data)
                setDates(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    return (
        <div className="container mt-5">
            <h1 className="mb-3">Événements à venir</h1>

            <div className="row">
                {dates.map(date => (
                    // <div>Date: {formatDate(date.date.date)}</div>
                    <DateCard key={date.id} data={date.id} className="col-md-4 mb-4" />
                    // <div key={event.id} className="col-md-4 mb-4">
                    //     <div className="card">
                    //         <div className="card-body">
                    //             <h5 className="card-title">{event.nom}</h5>
                    //             <p className="card-text">{event.description}</p>
                    //             <p className="card-text">
                    //                 <small>Date: {formatDate(event.date)}</small>
                    //             </p>
                    //             <a href="#" className="btn btn-primary">En savoir plus</a>
                    //         </div>
                    //     </div>
                    // </div>
                ))}
            </div>
        </div>
    );
};

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

export default Planing;
