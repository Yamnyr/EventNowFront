import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function NewEvenement({ data }) {

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        "@context": "/api/contexts/Evenement",
        "@type": "Evenement",
        "nom": '',
        "description": '',
        "lieu": '',
        "age_requis": 0,
        "image": '',
        "type": '',
        "annule": false
    });

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/types');
                setTypes(response.data['hydra:member']);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            const response = await axios.post('http://127.0.0.1:8000/api/evenements', {
                "@context": "/api/contexts/Evenement",
                "@type": "Evenement",
                "nom": '',
                "description": '',
                "lieu": '',
                "age_requis": 0,
                "image": '',
                "type": '',
                "annule": false
            }, {
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            });
            console.log(response.data); // Gérer la réponse de l'API ici
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Nouvel événement</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="description">Description :</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="lieu">Lieu :</label>
                    <input type="text" id="lieu" name="lieu" value={formData.lieu} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="age_requis">Age requis :</label>
                    <input type="number" id="age_requis" name="age_requis" value={formData.age_requis} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="image">Image :</label>
                    <input type="text" id="image" name="image" value={formData.image} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="type">Type :</label>
                    <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                        <option value="">Sélectionnez un type</option>
                        {types.map(type => (
                            <option key={type.id} value={'/api/types/'+type.id}>{type.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
}
