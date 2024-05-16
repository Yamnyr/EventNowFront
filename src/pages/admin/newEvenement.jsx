import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";



const AddEventForm = () => {

    const navigate = useNavigate();

    const [types, setTypes] = useState([]);
    const [eventData, setEventData] = useState({
        nom: '',
        description: '',
        lieu: '',
        type: '',
        age_requis: '',
        image: '',
        dates: [{ date: '', places_rest: '' }]
    });

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/types/getall');
                setTypes(response.data);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };
        fetchTypes();
    }, []);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...eventData.dates];
        list[index][name] = value;
        setEventData({ ...eventData, dates: list });
    };

    const handleAddDate = () => {
        setEventData({ ...eventData, dates: [...eventData.dates, { date: '', places_rest: '' }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/evenements/add', eventData);
            console.log('Event added successfully:', response.data);

            navigate(`/evenement/`);
            // Reset form fields if needed
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <label>Nom de l'événement:</label>
                    <input type="text" name="nom" value={eventData.nom}
                           onChange={(e) => setEventData({...eventData, nom: e.target.value})}
                           className="form-control mb-3"/>
                </div>
                <div className="col-md-6">
                    <label>Description:</label>
                    <input type="text" name="description" value={eventData.description}
                           onChange={(e) => setEventData({...eventData, description: e.target.value})}
                           className="form-control mb-3"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label>Type:</label>
                    <select name="type" value={eventData.type}
                            onChange={(e) => setEventData({...eventData, type: e.target.value})}
                            className="form-control mb-3">
                        <option value="">Sélectionnez un type</option>
                        {types.map(type => (
                            <option key={type.id} value={type.id}>{type.nom}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label>Lieu:</label>
                    <input type="text" name="lieu" value={eventData.lieu}
                           onChange={(e) => setEventData({...eventData, lieu: e.target.value})}
                           className="form-control mb-3"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label>Âge requis:</label>
                    <input type="number" name="age_requis" value={eventData.age_requis}
                           onChange={(e) => setEventData({...eventData, age_requis: e.target.value})}
                           className="form-control mb-3"/>
                </div>
                <div className="col-md-6">
                    <label>Image:</label>
                    <input type="text" name="image" value={eventData.image}
                           onChange={(e) => setEventData({...eventData, image: e.target.value})}
                           className="form-control mb-3"/>
                </div>
            </div>
            {eventData.dates.map((dateData, index) => (
                <div className="row" key={index}>
                    <div className="col-md-6">
                        <label>Date:</label>
                        <input type="date" name="date" value={dateData.date} onChange={(e) => handleChange(index, e)}
                               className="form-control mb-3"/>
                    </div>
                    <div className="col-md-6">
                        <label>Places restantes:</label>
                        <input type="number" name="places_rest" value={dateData.places_rest}
                               onChange={(e) => handleChange(index, e)} className="form-control mb-3"/>
                    </div>
                </div>
            ))}
            <div className="row">
                <div className="col-md-12">
                    <button type="button" onClick={handleAddDate} className="btn btn-primary mr-2">Ajouter une date
                    </button>
                    <button type="submit" className="btn btn-success">Ajouter l'événement</button>
                </div>
            </div>
        </form>

    );
};

export default AddEventForm;
