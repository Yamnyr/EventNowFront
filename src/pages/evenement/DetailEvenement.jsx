import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailEvenement = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/evenements/getone/${id}`);
                if (response.data.length > 0) {
                    setEvent(response.data[0]); // Si l'API retourne un tableau
                    setLoading(false);
                } else {
                    throw new Error('No data available');
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEventDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!event) return <div>No event found.</div>;

    return (
        <div className="container mt-5">
            <div className="card mb-3">
                <img
                    src={event.image}
                    className="card-img-top custom-img"
                    alt="Event"
                    style={{
                        maxHeight: '300px', objectFit: 'cover',
                        width: "100%"
                    }} />

                <div className="card-body">
                    <h1 className="card-title">{event.nom}</h1>
                    <p className="card-text"><strong>Type:</strong> {event.type}</p>
                    <p className="card-text"><strong>Description:</strong> {event.description}</p>
                    <p className="card-text"><strong>Lieu:</strong> {event.lieu}</p>
                    <p className="card-text"><strong>Âge requis:</strong> {event.age_requis} ans</p>
                    <div className="list-group list-group-flush">
                        {event.dates.map(date => (
                            <div key={date.id} className="list-group-item">
                                <strong>Date:</strong> {new Date(date.date).toLocaleDateString("fr-FR", {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                    hour: '2-digit', minute: '2-digit', hour12: false
                                })}
                                <br />
                                <strong>Places restantes:</strong> {date.places_rest || 'Data not available'}
                            </div>
                        ))}
                    </div>
                    {event.annule && <p className="text-danger">Annulé: {event.raison_annulation}</p>}
                </div>
            </div>
        </div>
    );
};

export default DetailEvenement;
