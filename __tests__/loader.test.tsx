import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loader } from '../components/Loader';

describe('Loader', () => {
  it('renders successfully', () => {
    const { container } = render(<Loader />);

    // Check if the loader is in the document
    expect(container.firstChild).toHaveClass(
      'flex justify-center items-center'
    );
    expect(container.querySelector('.animate-spin')).toHaveClass(
      'rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'
    );
  });
});
