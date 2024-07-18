import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Navbar } from '../components/Navbar';
import * as nextNavigation from 'next/navigation';

// Mock the usePathname hook from next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navbar', () => {
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
    { name: 'Compare', href: '/compare' },
    { name: 'Charts', href: '/charts' },
  ];

  beforeEach(() => {
    (nextNavigation.usePathname as jest.Mock).mockClear();
  });

  navigationItems.forEach((item) => {
    it(`highlights "${item.name}" link as active when path is "${item.href}"`, () => {
      // Mock the usePathname return value for each test case
      (nextNavigation.usePathname as jest.Mock).mockReturnValue(item.href);

      render(<Navbar />);

      const linkElement = screen.getByRole('link', { name: item.name });
      expect(linkElement).toHaveClass('bg-gray-900 text-white');
      expect(linkElement).toHaveAttribute('aria-current', 'page');
    });
  });

  it('does not highlight any link when path does not match', () => {
    (nextNavigation.usePathname as jest.Mock).mockReturnValue(
      '/non-existent-path'
    );

    render(<Navbar />);

    navigationItems.forEach((item) => {
      const linkElement = screen.getByRole('link', { name: item.name });
      expect(linkElement).not.toHaveClass('bg-gray-900 text-white');
      expect(linkElement).not.toHaveAttribute('aria-current', 'page');
    });
  });
});
