import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('renders EventNOW brand link', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
    const brandLink = getByText('EventNOW');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink.closest('a')).toHaveAttribute('href', '/');
});

test('renders all navigation links', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );

    const planingLink = getByText('PLANING');
    const evenementsLink = getByText('EVENEMENTS');
    const connexionLink = getByText('CONNEXION');

    expect(planingLink).toBeInTheDocument();
    expect(planingLink.closest('a')).toHaveAttribute('href', '/planing');
    expect(evenementsLink).toBeInTheDocument();
    expect(evenementsLink.closest('a')).toHaveAttribute('href', '/evenement');
    expect(connexionLink).toBeInTheDocument();
    expect(connexionLink.closest('a')).toHaveAttribute('href', '/connexion');
});

test('renders search form elements', () => {
    const { getByPlaceholderText, getByRole } = render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );

    const searchInput = getByPlaceholderText('Search');
    const searchButton = getByRole('button', { name: /search/i });

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
});
