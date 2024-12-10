import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { auth } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import App from './App';
import { mockUser } from './test-utils'; // Correct import

// Mock react-firebase-hooks/auth for controlling user state
jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn(),
}));

// Mock for firebase auth instance
jest.mock('./firebase-config', () => ({
  auth: {
    currentUser: { uid: 'test-user-id' }, // Mocked user
    signInWithEmailAndPassword: jest.fn(),
  },
}));

describe('App Component', () => {
  it('renders the loading state while authentication is loading', () => {
    // Mocking useAuthState to simulate the loading state
    (useAuthState as jest.Mock).mockReturnValue([null, true, null]);
    
    render(<App />);
    
    // Check if "Loading..." is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('shows an error message when there is an authentication error', () => {
    // Mocking useAuthState to simulate an error
    (useAuthState as jest.Mock).mockReturnValue([null, false, new Error('Authentication Error')]);
    
    render(<App />);
    
    // Check if the error message is shown
    expect(screen.getByText(/Error: Authentication Error/i)).toBeInTheDocument();
  });

  it('redirects to the homepage if the user is authenticated', async () => {
    // Mocking useAuthState to simulate a logged-in user
    (useAuthState as jest.Mock).mockReturnValue([mockUser, false, null]);

    render(
      <Router>
        <App />
      </Router>
    );

    // Check if the user is redirected to /homepage
    await waitFor(() => expect(screen.getByText(/Homepage/i)).toBeInTheDocument());
  });

  it('redirects to login if the user is not authenticated', async () => {
    // Mocking useAuthState to simulate no user (logged out)
    (useAuthState as jest.Mock).mockReturnValue([null, false, null]);

    render(
      <Router>
        <App />
      </Router>
    );

    // Check if the user is redirected to the login page
    await waitFor(() => expect(screen.getByText(/Login/i)).toBeInTheDocument());
  });

  it('renders the correct components based on routes', async () => {
    // Mocking useAuthState to simulate a logged-in user
    (useAuthState as jest.Mock).mockReturnValue([mockUser, false, null]);

    render(
      <Router>
        <App />
      </Router>
    );

    // Navigate to /WeatherPage route
    fireEvent.click(screen.getByText(/Weather/i)); // Assuming there's a link/button for WeatherPage

    // Check if the Weather component is rendered
    await waitFor(() => expect(screen.getByText(/Weather for the Day!/i)).toBeInTheDocument());
  });

  it('renders TaskBar component on all pages where it should appear', async () => {
    // Mocking useAuthState to simulate a logged-in user
    (useAuthState as jest.Mock).mockReturnValue([mockUser, false, null]);

    render(
      <Router>
        <App />
      </Router>
    );

    // Check if TaskBar is rendered on homepage
    await waitFor(() => expect(screen.getByText(/TaskBar/i)).toBeInTheDocument());

    // Check if TaskBar is rendered on calendar
    fireEvent.click(screen.getByText(/Calendar/i)); // Assuming there's a link/button for Calendar
    await waitFor(() => expect(screen.getByText(/TaskBar/i)).toBeInTheDocument());
  });
});
