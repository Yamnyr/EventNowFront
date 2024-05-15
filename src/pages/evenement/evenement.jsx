import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EvenementCard from "../../components/EvenementCard";

const Evenement = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/evenements/getall');
                setEvents(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-3">Événements à venir</h1>
            <div className="row">
                {events.map(event => (
                    <EvenementCard key={event.id} data={event.id} />
                ))}
            </div>
        </div>
    );
};

export default Evenement;
