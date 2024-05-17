import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Inscription = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        date_naissance: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Gère les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Vérifie que les données respectent les contraintes
    const validateFormData = () => {
        if (!formData.nom || formData.nom.length < 2 || formData.nom.length > 50) {
            return "Le nom doit comporter entre 2 et 50 caractères.";
        }
        if (!formData.prenom || formData.prenom.length < 2 || formData.prenom.length > 50) {
            return "Le prénom doit comporter entre 2 et 50 caractères.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            return "L'email doit être valide.";
        }
        if (!formData.password || formData.password.length < 8) {
            return "Le mot de passe doit comporter au moins 8 caractères.";
        }
        if (!formData.date_naissance) {
            return "La date de naissance est requise.";
        }
        const dateNaissance = new Date(formData.date_naissance);
        if (isNaN(dateNaissance.getTime())) {
            return "La date de naissance doit être une date valide.";
        }
        return null;
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateFormData();
        if (error) {
            setErrorMessage(error);
            return;
        }

        console.log("Données du formulaire envoyées :", formData);

        try {
            const response = await axios.post("http://127.0.0.1:8000/users/add", formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Inscription réussie:", response.data);

            // Stocker les informations de l'utilisateur dans le localStorage
            const userData = {
                id: response.data.id,
                nom: formData.nom,
                prenom: formData.prenom,
                email: formData.email,
                role: 'ROLE_USER', // Par défaut, l'utilisateur nouvellement inscrit est un utilisateur normal
                login: true
            };
            localStorage.setItem("userData", JSON.stringify(userData));

            // Rediriger l'utilisateur après l'inscription réussie
            navigate("/", { state: { message: "Inscription réussie ! Vous êtes maintenant connecté." } });
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center mb-4">Inscription</h1>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="prenom">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="date_naissance">
                            <Form.Label>Date de naissance</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_naissance"
                                value={formData.date_naissance}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            S'inscrire
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Inscription;
