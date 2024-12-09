import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CollectionsPage from './Collections';
import { getDocs } from 'firebase/firestore';

// Mock Firebase
jest.mock('../firebase-config');
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
  collection: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('CollectionsPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test 1: Basic render test
  test('renders My Wardrobe title', async () => {
    render(<CollectionsPage />);
    const titleElement = await screen.findByText('My Wardrobe');
    expect(titleElement).toBeInTheDocument();
  });

  // Test 2: Verify New Outfit button is present
  test('displays New Outfit button', async () => {
    render(<CollectionsPage />);
    await waitFor(() => {
      expect(screen.getByText('New Outfit')).toBeInTheDocument();
    });
  });

  // Test 3: Verify Add Item button is present and clickable
  test('displays Add Item button and it is clickable', async () => {
    render(<CollectionsPage />);
    const addItemButton = await screen.findByText('Add Item');
    expect(addItemButton).toBeInTheDocument();

    // Simulate a click event
    fireEvent.click(addItemButton);

    // You can add more assertions here if clicking the button triggers any specific behavior
  });
}); 
