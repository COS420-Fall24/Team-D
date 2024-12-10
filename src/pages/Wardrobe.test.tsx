import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WardrobePage from './Wardrobe';
import { getClothingItems } from '../firebaseService';

jest.mock('../firebaseService');

const mockClothingItems = [
  {
    id: '1',
    name: 'Blue Jeans',
    category: 'Pants',
    tags: ['casual', 'denim'],
    color: 'Blue',
    size: 'M',
    brand: 'Levi\'s',
    imageURL: 'http://example.com/blue-jeans.jpg',
    createdAt: '2023-01-01T00:00:00Z',
    userID: 'user1'
  },
  {
    id: '2',
    name: 'White T-Shirt',
    category: 'Tops',
    tags: ['casual', 'basic'],
    color: 'White',
    size: 'L',
    brand: 'Hanes',
    imageURL: 'http://example.com/white-tshirt.jpg',
    createdAt: '2023-01-02T00:00:00Z',
    userID: 'user1'
  }
];

describe('Wardrobe', () => {
  // Test 1: Check if the component renders the initial state correctly
  test('renders wardrobe page title', () => {
    render(<WardrobePage />);
    expect(screen.getByText('Your Wardrobe')).toBeInTheDocument();
    expect(screen.getByText('Browse and organize your clothing items below')).toBeInTheDocument();
  });

    // Test 2: Check if the items are sorted by creation date (most recent first)
    test('sorts clothing items by creation date', async () => {
        (getClothingItems as jest.Mock).mockResolvedValue(mockClothingItems);
        render(<WardrobePage />);
        
        // Wait for the items to be rendered
        await waitFor(() => {
        expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
        });
    
        // Get all the headings after they've been rendered
        const items = screen.getAllByRole('heading', { level: 2 });
    
        // Check the order of the items
        expect(items[0]).toHaveTextContent('White T-Shirt');
        expect(items[1]).toHaveTextContent('Blue Jeans');
    });

  // Test 3: Verify that error handling works when fetching fails
  test('handles error when fetching clothing items fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (getClothingItems as jest.Mock).mockRejectedValue(new Error('Fetch error'));
    
    render(<WardrobePage />);
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching clothing items:', expect.any(Error));
    });
    
    consoleErrorSpy.mockRestore();
  });
});