import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

// Mock the modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-firebase-hooks/auth', () => ({
  useSignInWithGoogle: jest.fn(),
}));

jest.mock('../firebase-config', () => ({
  auth: {
    currentUser: null,
  },
}));

describe('Login Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    useSignInWithGoogle.mockReturnValue([jest.fn(), null, false, null]);
  });

  test('renders login button', () => {
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    );
    expect(screen.getByText('Sign In with Google')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    useSignInWithGoogle.mockReturnValue([null, null, true, null]);
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles sign in click', async () => {
    const mockSignIn = jest.fn().mockResolvedValue(undefined);
    useSignInWithGoogle.mockReturnValue([mockSignIn, null, false, null]);
    
    render(
      <BrowserRouter>
        <Login onLogin={mockOnLogin} />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Sign In with Google'));
    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalled();
    });
  });
});