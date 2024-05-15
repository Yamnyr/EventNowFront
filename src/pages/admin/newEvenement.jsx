import React, {useEffect, useState} from 'react';
import axios from "axios";



const AddEventForm = () => {


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
            // Reset form fields if needed
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nom de l'événement:
                <input type="text" name="nom" value={eventData.nom}
                       onChange={(e) => setEventData({...eventData, nom: e.target.value})}/>
            </label>
            <label>
                Description:
                <input type="text" name="description" value={eventData.description}
                       onChange={(e) => setEventData({...eventData, description: e.target.value})}/>
            </label>
            <label>
                Type:
                <select name="type" value={eventData.type}
                        onChange={(e) => setEventData({...eventData, type: e.target.value})}>
                    <option value="">Sélectionnez un type</option>
                    {types.map(type => (
                        <option key={type.id} value={type.id}>{type.nom}</option>
                    ))}
                </select>
            </label>
            <label>
                Lieu:
                <input type="text" name="lieu" value={eventData.lieu}
                       onChange={(e) => setEventData({...eventData, lieu: e.target.value})}/>
            </label>
            <label>
                Âge requis:
                <input type="number" name="age_requis" value={eventData.age_requis}
                       onChange={(e) => setEventData({...eventData, age_requis: e.target.value})}/>
            </label>
            <label>
                Image:
                <input type="text" name="image" value={eventData.image}
                       onChange={(e) => setEventData({...eventData, image: e.target.value})}/>
            </label>
            {eventData.dates.map((dateData, index) => (
                <div key={index}>
                    <label>
                        Date:
                        <input type="date" name="date" value={dateData.date} onChange={(e) => handleChange(index, e)}/>
                    </label>
                    <label>
                        Places restantes:
                        <input type="number" name="places_rest" value={dateData.places_rest}
                               onChange={(e) => handleChange(index, e)}/>
                    </label>
                </div>
            ))}
            <button type="button" onClick={handleAddDate}>Ajouter une date</button>
            <button type="submit">Ajouter l'événement</button>
        </form>
    );
};

export default AddEventForm;
