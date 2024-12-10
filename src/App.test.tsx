import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Use MemoryRouter instead of BrowserRouter
import { useAuthState } from 'react-firebase-hooks/auth';
import App from './App';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state', () => {
    (useAuthState as jest.Mock).mockReturnValue([null, true, null]);
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });


});