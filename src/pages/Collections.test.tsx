import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    // Mock Firebase response
    (getDocs as jest.Mock).mockResolvedValue({
      docs: []
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic render test
  test('renders My Wardrobe title', async () => {
    render(<CollectionsPage />);
    const titleElement = await screen.findByText('My Wardrobe');
    expect(titleElement).toBeInTheDocument();
  });

  // Test 2: Verify at least one button is present
  test('displays New Outfit button', async () => {
    render(<CollectionsPage />);
    // Wait for loading to complete
    const button = await screen.findByText('New Outfit');
    expect(button).toBeInTheDocument();
  });
}); 
