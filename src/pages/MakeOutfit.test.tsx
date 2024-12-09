import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MakeOutfit from './MakeOutfit';
import { clothingItem } from '../models';

describe('MakeOutfit Component', () => {
  const mockItems: clothingItem[] = [
    { id: '1', name: 'T-Shirt', type: 'Top' },
    { id: '2', name: 'Jeans', type: 'Bottom' },
  ];

  const mockOnOutfitCreated = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with available items', () => {
    render(
      <MakeOutfit
        availableItems={mockItems}
        onOutfitCreated={mockOnOutfitCreated}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Create New Outfit')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
  });
}); 