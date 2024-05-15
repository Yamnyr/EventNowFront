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
            <h1 className="mb-4">{event.nom}</h1>
            <h2 className="mb-3">Informations sur l'événement</h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <strong>Lieu:</strong> {event.lieu}
                </li>
                {event.dates.map(date => (
                    <li key={date.id} className="list-group-item">
                        <strong>Date:</strong> {new Date(date.date).toLocaleDateString("fr-FR", {
                            year: 'numeric', month: 'long', day: 'numeric',
                            hour: '2-digit', minute: '2-digit', hour12: false
                        })}
                        <br />
                        <strong>Places restantes:</strong> {date.places_rest || 'Data not available'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DetailEvenement;