import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Evenement from './evenement';

const mock = new MockAdapter(axios);

describe('Evenement Component', () => {
    it('renders loading state initially', () => {
        render(<Evenement />);
        expect(screen.getByText('Événements à venir')).toBeInTheDocument();
    });

    it('renders events after successful API call', async () => {
        const events = [
            { id: 1, title: 'Event 1', description: 'Description 1' },
            { id: 2, title: 'Event 2', description: 'Description 2' },
        ];
        mock.onGet('http://127.0.0.1:8000/evenements/getall').reply(200, events);

        render(<Evenement />);

        await waitFor(() => {
            expect(screen.getByText('Event 1')).toBeInTheDocument();
            expect(screen.getByText('Event 2')).toBeInTheDocument();
        });
    });

    it('renders error message on API call failure', async () => {
        mock.onGet('http://127.0.0.1:8000/evenements/getall').reply(500);

        render(<Evenement />);

        await waitFor(() => {
            expect(screen.getByText('An error occurred')).toBeInTheDocument();
        });
    });
});
