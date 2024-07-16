import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/button/button';

describe('Button', () => {
  it('renders the button with children text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
