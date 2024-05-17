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

    test('submits the form successfully when validation passes', async () => {
        const mockNavigate = jest.fn();
        render(
            <MemoryRouter>
                <Inscription navigate={mockNavigate} />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'SecurePassword123' } });
        fireEvent.change(screen.getByLabelText(/Date de naissance/i), { target: { value: '1990-01-01' } });

        fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

        expect(mockNavigate).toHaveBeenCalledWith("/", { state: { message: "Inscription réussie ! Vous êtes maintenant connecté." } });
    });

    test('shows error message if submission fails', async () => {
        render(
            <MemoryRouter>
                <Inscription />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Prénom/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'SecurePassword123' } });
        fireEvent.change(screen.getByLabelText(/Date de naissance/i), { target: { value: '1990-01-01' } });

        fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

        expect(await screen.findByText(/Erreur lors de l'inscription. Veuillez réessayer./i)).toBeInTheDocument();
    });
});
