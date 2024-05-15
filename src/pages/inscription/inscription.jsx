import React, { useState } from 'react';

function Form() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        date_naissance: '',
        name: '',
    });

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
        console.log(formState);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users?page=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
        });
    
        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
        }
    
        const data = await response.json();
        console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>
            Nom:
            <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
            Email:
            <input type="email" name="email" onChange={handleChange} />
        </label>
        <label>
            Mot de passe:
            <input type="password" name="password" onChange={handleChange} />
        </label>
        <label>
            Date de naissance:
            <input type="date" name="birthday" onChange={handleChange} />
        </label>
        <input type="submit" value="Soumettre" style={{ width: 'auto' }} />
        </form>
    );
}

export default Form;

