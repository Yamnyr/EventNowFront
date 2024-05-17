import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Inscription from './inscription';
describe('Inscription Component', () => {
    test('renders the form correctly', () => {
        render(
            <MemoryRouter>
                <Inscription />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /S'inscrire/i })).toBeInTheDocument();
    });

    test('shows error message if validation fails', async () => {
        render(
            <MemoryRouter>
                <Inscription />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'A' } });
        fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: 'B' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: '123' } });
        fireEvent.change(screen.getByLabelText(/Date de naissance/i), { target: { value: 'invalid-date' } });

        fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

        expect(await screen.findByText(/Le nom doit comporter entre 2 et 50 caractères./i)).toBeInTheDocument();
        expect(screen.getByText(/Le prénom doit comporter entre 2 et 50 caractères./i)).toBeInTheDocument();
        expect(screen.getByText(/L'email doit être valide./i)).toBeInTheDocument();
        expect(screen.getByText(/Le mot de passe doit comporter au moins 8 caractères./i)).toBeInTheDocument();
        expect(screen.getByText(/La date de naissance doit être une date valide./i)).toBeInTheDocument();
    });

    test('updates form fields correctly', () => {
        render(
            <MemoryRouter>
                <Inscription />
            </MemoryRouter>
        );

        const nomInput = screen.getByLabelText(/Nom/i);
        const prenomInput = screen.getByLabelText(/Prénom/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Mot de passe/i);
        const dateNaissanceInput = screen.getByLabelText(/Date de naissance/i);

        fireEvent.change(nomInput, { target: { value: 'Doe' } });
        fireEvent.change(prenomInput, { target: { value: 'John' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'SecurePassword123' } });
        fireEvent.change(dateNaissanceInput, { target: { value: '1990-01-01' } });

        expect(nomInput.value).toBe('Doe');
        expect(prenomInput.value).toBe('John');
        expect(emailInput.value).toBe('john.doe@example.com');
        expect(passwordInput.value).toBe('SecurePassword123');
        expect(dateNaissanceInput.value).toBe('1990-01-01');
    });
});
