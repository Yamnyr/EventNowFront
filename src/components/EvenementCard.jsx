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
                setEvent(response.data[0]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [data]);
    console.log(event)
    return (
        <div className="container mt-5">
            <div className="row">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : event ? (
                    <div className="col-md-4">
                        <div className="card">
                            <img src={event.image} className="card-img-top" alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">{event.nom}</h5>
                                <p className="card-text">{event.lieu}</p>
                                <p className="card-text">
                                    {event.dates.map(date => (
                                        <div key={date.id}>Date: {new Date(date.date).toLocaleDateString()}</div>
                                    ))}
                                </p>
                                <p className="card-text">{event.description}</p>
                                {event.annule ? <p className="text-danger">{event.raison_annulation}</p> : null}
                                <button onClick={goToDetailPage} className="btn btn-primary">En savoir plus</button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>

    );
}
