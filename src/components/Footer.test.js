import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

test('Test des réseaux sociaux !', () => {
    const { getByRole } = render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

    const instagramLink = getByRole('link', { name: /instagram/i });
    const linkedinLink = getByRole('link', { name: /linkedin/i });
    const youtubeLink = getByRole('link', { name: /youtube/i });

    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/');

    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/');

    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/');
});
