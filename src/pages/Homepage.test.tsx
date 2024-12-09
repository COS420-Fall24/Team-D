import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Homepage from './Homepage';

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Homepage', () => {
  // Before each test, render the Homepage component wrapped in a BrowserRouter
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
  });

  // Test 1: Verify that the welcome message and tagline are rendered correctly
  // This ensures that the main heading and subheading of the homepage are present
  test('renders the welcome message', () => {
    expect(screen.getByText('Welcome to StyleNest')).toBeInTheDocument();
    expect(screen.getByText('Style your life, one outfit at a time!')).toBeInTheDocument();
  });

  // Test 2: Ensure that all the features are listed on the homepage
  // This checks if each of the main features of StyleNest is displayed to the user
  test('displays the list of features', () => {
    expect(screen.getByText('Organize your wardrobe')).toBeInTheDocument();
    expect(screen.getByText('Plan your outfits with the calendar')).toBeInTheDocument();
    expect(screen.getByText('Track how confident your looks make you feel')).toBeInTheDocument();
  });

  // Test 3: Verify that clicking on the calendar feature navigates to the calendar page
  // This test simulates a user clicking on the calendar feature and checks if it triggers navigation
  test('navigates to calendar page when clicking on calendar feature', () => {
    const calendarLink = screen.getByText('Plan your outfits with the calendar');
    fireEvent.click(calendarLink);
    expect(mockNavigate).toHaveBeenCalledWith('/calendar');
  });

  // Test 4: Check if the footer with copyright information is displayed
  // This ensures that the copyright information is present at the bottom of the page
  test('displays the footer with copyright information', () => {
    expect(screen.getByText('StyleNest © 2024')).toBeInTheDocument();
  });
});