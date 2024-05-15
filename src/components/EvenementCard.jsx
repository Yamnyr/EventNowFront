import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function EvenementCard({ data }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/evenements/getone/${data}`);
                setEvent(response.data[0]); // Assure-toi que la réponse est correctement structurée pour cet index
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [data]);

    const goToDetailPage = () => {
        navigate(`/detailEvent/${event.id}`);
    };

    return (
        <div>
            {loading ? <div>Loading...</div> :
                error ? <div>Error: {error}</div> :
                    event ? (
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{event.nom}</h5>
                                <p className="card-text">{event.description}</p>
                                {event.dates && event.dates.map(date => (
                                    <div key={date.id}>{new Date(date.date).toLocaleDateString()}</div>
                                ))}
                                <button onClick={goToDetailPage} className="btn btn-primary">En savoir plus</button>
                            </div>
                        </div>
                    ) : <div>No event found.</div>}
        </div>
    );
}
