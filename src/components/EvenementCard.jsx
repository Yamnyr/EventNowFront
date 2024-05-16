import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function EvenementCard({ data }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const goToDetailPage = () => {
        navigate(`/detailEvent/${event.id}`);
    };

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/evenements/getone/${data}`);
                setEvent(response.data[0]); // Assume response.data directly returns the event object
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvent();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!event) return <div>No event found.</div>;

    return (
        <div className="col-md-3 mb-4">
            <div className={`card ${event.annule ? 'bg-danger' : ''}` }>
            <h4 className="card-title">Catégorie : {event.type}</h4>
                <img src={event.image} className="card-img-top" alt="Event" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h5 className="card-title">{event.nom}</h5>
                    <p className="card-text">{event.lieu}</p>
                    <p className="card-text mh-75">
                        {event.dates.map(date => (
                            <div key={date.id}>Date: {new Date(date.date).toLocaleDateString()}</div>
                        ))}
                    </p>
                    <p className="card-text">{event.description}</p>
                    {event.annule && (
                        <p className="text-danger text-white" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            Evenements annulé : {event.raison_annulation}
                        </p>
                    )}
                    <button onClick={goToDetailPage} className="btn btn-primary">En savoir plus</button>
                </div>
            </div>
        </div>
    );
}
