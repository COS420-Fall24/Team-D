import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AddClothingItem from './AddClothingItem';
import { db } from '../firebase-config';

// Mock Firebase storage and Firestore
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock('../firebase-config', () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue('mockDocumentId'),
    })),
  },
}));

jest.mock('../models/clothingItem', () => {
  return function DummyClothingItem(data) {
    return data;
  };
});

describe('AddClothingItem', () => {
  beforeAll(() => {
    uploadBytesResumable.mockImplementation(() => ({
      on: jest.fn((event, progressCallback, errorCallback, completeCallback) => {
        if (event === 'state_changed') {
          progressCallback({ bytesTransferred: 100, totalBytes: 100 });
          completeCallback();
        }
      }),
    }));
    getDownloadURL.mockResolvedValue('https://example.com/image.jpg');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('renders form with all required fields', () => {
    render(<AddClothingItem />);

    const requiredElements = [
      'Name',
      'Category',
      'Tags (comma-separated)',
      'Color',
      'Size',
      'Brand',
    ];

    requiredElements.forEach((placeholder) => {
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Save Clothing Item' })).toBeInTheDocument();
    expect(screen.getByLabelText('Upload Image')).toBeInTheDocument();
  });

  test('handles form input changes correctly', () => {
    render(<AddClothingItem />);

    const testInputs = {
      Name: 'Test Shirt',
      Category: 'Tops',
      'Tags (comma-separated)': 'casual, summer',
      Color: 'Blue',
      Size: 'M',
      Brand: 'TestBrand',
    };

    Object.entries(testInputs).forEach(([placeholder, value]) => {
      const input = screen.getByPlaceholderText(placeholder);
      fireEvent.change(input, { target: { value } });
      expect(input.value).toBe(value);
    });
  });

  test('handles file upload and form submission', async () => {
    render(<AddClothingItem />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test Item' },
    });

    // Simulate file selection
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Upload Image');
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Save Clothing Item' }));

    await waitFor(() => {
      expect(uploadBytesResumable).toHaveBeenCalled();
      expect(db.collection).toHaveBeenCalledWith('ClothingItems');
      expect(db.collection().add).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Clothing item added successfully');
    });
  });

  test('prevents submission when required fields are empty', async () => {
    render(<AddClothingItem />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Save Clothing Item' }));
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please upload an image');
    });
  });
});