import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Evenement from './pages/evenement/evenement';
import EvenementCard from './components/EvenementCard';

jest.mock('axios');
jest.mock('./components/EvenementCard', () => () => <div>EvenementCard</div>);

describe('Evenement Component', () => {
  it('fetches events and displays them on successful load', async () => {
    const events = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' }
    ];
    axios.get.mockResolvedValue({ data: events });

    render(<Evenement />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
      events.forEach(event => {
        expect(screen.getByText('EvenementCard')).toBeInTheDocument();
      });
    });
  });

  it('displays an error message on API failure', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    render(<Evenement />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
      expect(screen.queryByText('EvenementCard')).not.toBeInTheDocument();
    });
  });
});
