import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import AddClothingItem from './AddClothingItem';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../firebase-config';

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock('../firebase-config', () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue({ id: 'mockDocumentId' }),
    })),
  },
  auth: {
    currentUser: { uid: 'mockUserId' },
  },
}));

jest.mock('../models/clothingItem', () => {
  return function DummyClothingItem(data) {
    return data;
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddClothingItem', () => {
  beforeAll(() => {
    uploadBytesResumable.mockImplementation(() => ({
      on: jest.fn((event, progressCallback, errorCallback, completeCallback) => {
        progressCallback({ bytesTransferred: 100, totalBytes: 100 });
        completeCallback();
      }),
    }));
    getDownloadURL.mockResolvedValue('https://example.com/image.jpg');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AddClothingItem />
      </MemoryRouter>
    );
  };

  test('renders form with all required fields', () => {
    renderComponent();

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

    expect(screen.getByRole('button', { name: /save clothing item/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
  });

  test('handles form input changes correctly', () => {
    renderComponent();

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
      expect(input).toHaveValue(value);
    });
  });


  test('prevents submission when image is not uploaded', async () => {
    renderComponent();
    
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByPlaceholderText('Category'), { target: { value: 'Tops' } });
    fireEvent.change(screen.getByPlaceholderText('Tags (comma-separated)'), { target: { value: 'casual, test' } });
    fireEvent.change(screen.getByPlaceholderText('Color'), { target: { value: 'Blue' } });
    fireEvent.change(screen.getByPlaceholderText('Size'), { target: { value: 'M' } });
    fireEvent.change(screen.getByPlaceholderText('Brand'), { target: { value: 'TestBrand' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save clothing item/i }));
    });
    
    expect(window.alert).toHaveBeenCalledWith('Please upload an image');
  });

});