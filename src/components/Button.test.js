// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
    const buttonText = 'Click me';
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>{buttonText}</Button>);
    const button = getByText(buttonText);

    expect(button).toBeInTheDocument();
});

test('triggers onClick event when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    const button = getByText('Click me');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
});
