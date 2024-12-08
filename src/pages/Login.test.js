import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../Login';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

// Mock the necessary hooks and modules
jest.mock('react-firebase-hooks/auth', () => ({
  useSignInWithGoogle: jest.fn(),
}));

jest.mock('../../firebase-config', () => ({
  auth: {
    currentUser: null,
  },
}));

describe('Login Component', () => {
  it('calls onLogin after successful sign in', async () => {
    const mockSignInWithGoogle = jest.fn(() => Promise.resolve({ user: { uid: '123' } }));
    useSignInWithGoogle.mockImplementation(() => [mockSignInWithGoogle, undefined, false, undefined]);
    const onLoginMock = jest.fn();

    render(<Login onLogin={onLoginMock} />);
    const signInButton = screen.getByText('Sign In with Google');
    fireEvent.click(signInButton);

    await waitFor(() => expect(mockSignInWithGoogle).toHaveBeenCalled());
    await waitFor(() => expect(onLoginMock).toHaveBeenCalled());
  });

  // Additional tests can be added here to cover other scenarios
});