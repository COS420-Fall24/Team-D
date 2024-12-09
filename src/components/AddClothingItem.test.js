import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AddClothingItem from './AddClothingItem';
import { db } from '../firebase-config';

// Mock Firebase storage and Firestore
jest.mock('firebase/storage');
jest.mock('../firebase-config', () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn().mockResolvedValue('mockDocumentId'), // Mock a successful add call
    })),
  },
}));

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

  // Test 1: Basic render test
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

  // Test 2: Form input handling
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

  // Test 3: Form submission with file
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

    // Wait for async operations to complete
    await waitFor(() => {
      expect(uploadBytesResumable).toHaveBeenCalled(); // Ensure upload was triggered
      expect(db.collection).toHaveBeenCalledWith('ClothingItems'); // Ensure correct Firestore collection
      expect(db.collection().add).toHaveBeenCalled(); // Ensure document was added
    });
  });
});
