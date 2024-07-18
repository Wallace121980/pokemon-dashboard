import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorMessage } from '../components/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the error message passed to it', () => {
    const testMessage = 'This is a test error message';
    render(<ErrorMessage message={testMessage} />);

    // Check if the message is in the document
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test error message')
    ).toBeInTheDocument();
  });
});
