import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function DateCard({ data }) {
    const [date, setDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const goToDetailPage = () => {
        navigate(`/detailEvent/${date.evenement.id}`);
    };
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/dates/getone/${data}`);
                setDate(response.data[0]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [data]);
    console.log(date)
    return (
        <div className="container mt-5">
            <div className="row">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : date ? (
                    <div className="col-md-4">
                        <div className="card">
                            <img src={date.evenement.image} className="card-img-top" alt="Event" />
                            <div className="card-body">
                                <h5 className="card-title">{date.evenement.nom}</h5>
                                <p className="card-text">{date.evenement.lieu}</p>
                                <p className="card-text">{date.places_rest}</p>
                                <p className="card-text">{new Date(date.date.date).toLocaleDateString()}</p>
                                <p className="card-text">{date.evenement.description}</p>
                                {date.evenement.annule ? <p className="text-danger">{date.evenement.raison_annulation}</p> : null}
                                <button onClick={goToDetailPage} className="btn btn-primary">En savoir plus</button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>

    );
}
