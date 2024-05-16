import React, { useEffect, useState } from 'react';
import '../index.css';
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
    }, []);
    return (
        <div className="container mt-5">
            <div className="row">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : date ? (
                    <div className="col-12 mb-3">
                        <div className="event-ticket card mb-3">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img 
                                        src={date.evenement.image}
                                        className="card-img rounded-end border border-dark" 
                                        alt="Event" 
                                        style={{ objectFit: 'cover', height: '100%' }} 
                                    />
                                </div> 
                                <div className="col-md-8">
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title">{date.evenement.nom}</h5>
                                            <p className="card-text">
                                                {new Date(date.date.date).toLocaleDateString('fr-FR', { 
                                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                                                })}
                                            </p>
                                            <p className="card-text">{date.evenement.lieu}</p>
                                            <span className="badge bg-warning text-dark">Encore {date.places_rest} places restantes !</span>

                                            <p className="card-text">{date.evenement.description}</p>
                                            {date.evenement.annule && (
                                                <p className="text-danger">{date.evenement.raison_annulation}</p>
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center position-absolute bottom-0 end-0 p-3">
                                            <button onClick={goToDetailPage} className="btn btn-info ms-auto">
                                                Pour plus d'info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
