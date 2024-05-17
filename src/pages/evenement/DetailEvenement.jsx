import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const DetailEvenement = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState(null);
  const [raison, setRaison] = useState(null);
  const [nombrePers, setNombrePers] = useState(1); // État pour stocker le nombre de personnes
  const [certifyAge, setCertifyAge] = useState(false); // État pour certifier l'âge minimum

  const handleClose = () => setShow(false);
  const handleShow = (dateId) => {
    setSelectedDateId(dateId);
    setShow(true);
  };

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/evenements/getone/${id}`
        );
        if (response.data.length > 0) {
          setEvent(response.data[0]); // Si l'API retourne un tableau
          setLoading(false);
        } else {
          throw new Error("No data available");
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);


  const handleRegistration = async () => {
    if (!certifyAge) {
      alert("Vous devez certifier que tous les participants ont plus de l'âge minimum requis.");
      return;
    }

    try {
      const requestData = {
        user_id: 1,
        date_id: selectedDateId,
        certif: true,
        nombre_pers: nombrePers,
      };

      console.log("Données envoyées :", requestData);

      const response = await axios.post(
        "http://127.0.0.1:8000/inscriptions/add",
        requestData
      );

      console.log("Inscription réussie:", response.data);
      setShow(false);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    }
  };

  const handleCloseA = () => setShow2(false);
  const handleAnnulation = async () => {
    try {
      const requestData = {
        raison_annulation: raison
      };

      console.log("Données envoyées :", requestData);

      const response = await axios.put(
        `http://127.0.0.1:8000/evenements/annule/${id}`,
        requestData
      );

      console.log("Vous avez annulé l'événement:", response.data);
      setShow2(false);
    } catch (error) {
      console.error("Erreur lors de l'annulation:", error);
    }
  };

  const handleShowA = (dateId) => {
    setSelectedDateId(dateId);
    setShow2(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found.</div>;

  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <img
          src={event.image}
          className="card-img-top"
          alt="Event"
          style={{ maxHeight: "150px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h1 className="card-title">{event.nom}</h1>
          <p className="card-text">
            <strong>Type:</strong> {event.type}
          </p>
          <p className="card-text">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="card-text">
            <strong>Lieu:</strong> {event.lieu}
          </p>
          <p className="card-text">
            <strong>Âge requis:</strong> {event.age_requis} ans
          </p>
          <div className="list-group list-group-flush">
            {event.dates.map((date) => (
              <div key={date.id} className="list-group-item">
                <strong>Date:</strong>{" "}
                {new Date(date.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
                <br />
                <p>
                  <strong>Places restantes:</strong> {date.places_rest}
                </p>
                <button
                  className="btn btn-primary ml-3"
                  onClick={() => handleShow(date.id)}
                >
                  S'inscrire
                </button>
                <button
                  className="btn btn-primary ml-3"
                  onClick={() => handleShowA(date.id)}
                >
                  Annuler
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL INSCRIPTION */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation d'inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment vous inscrire à cet événement ?<br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nombre de personnes :</Form.Label>
            <Form.Control
              type="number"
              value={nombrePers}
              onChange={(e) => setNombrePers(e.target.value)}
              min="1"
              max="10" // Adaptez selon le maximum autorisé
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label={`Je certifie que tous les participants ont plus de ${event.age_requis} ans`}
              checked={certifyAge}
              onChange={(e) => setCertifyAge(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleRegistration}>
            S'inscrire
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL ANNULATION */}
      <Modal show={show2} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de l'annulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez-vous vraiment annuler cet événement ?<br />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Raison de l'annulation</Form.Label>
            <Form.Control
              type="text"
              value={raison}
              onChange={(e) => setRaison(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseA}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAnnulation}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailEvenement;
