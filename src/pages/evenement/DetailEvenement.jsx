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
                setEvent(response.data); // Supposition que l'API renvoie directement l'objet événement
                setLoading(false);
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
        <div className="container">
            <h1>{event.nom}</h1>
            <p>{event.description}</p>
            <p>Places Restantes: {event.places_rest}</p>
            {/* Afficher d'autres détails ici */}
        </div>
    );
};


export default DetailEvenement;
