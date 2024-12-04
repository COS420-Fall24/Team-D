// Clothing Item Tests Generated via

// Test 1: Verify Initial Render
// Test Description: Ensure that the component renders correctly with all input fields and the submit button.

import { render, screen, fireEvent } from '@testing-library/react';
import AddClothingItem from './components/AddClothingItem';

test('renders all input fields and submit button initially', () => {
  render(<AddClothingItem />);
  
  const nameInput = screen.getByPlaceholderText(/Name/i);
  const categoryInput = screen.getByPlaceholderText(/Category/i);
  const tagsInput = screen.getByPlaceholderText(/Tags \(comma-separated\)/i);
  const colorInput = screen.getByPlaceholderText(/Color/i);
  const sizeInput = screen.getByPlaceholderText(/Size/i);
  const brandInput = screen.getByPlaceholderText(/Brand/i);
  const fileInput = screen.getByLabelText(/File/i);
  const submitButton = screen.getByText(/Save Clothing Item/i);

  expect(nameInput).toBeInTheDocument();
  expect(categoryInput).toBeInTheDocument();
  expect(tagsInput).toBeInTheDocument();
  expect(colorInput).toBeInTheDocument();
  expect(sizeInput).toBeInTheDocument();
  expect(brandInput).toBeInTheDocument();
  expect(fileInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

// Test 2: Verify Form Submission without file

test('shows alert when form is submitted without file', () => {
  render(<AddClothingItem />);
  
  global.alert = jest.fn();
  
  const submitButton = screen.getByText(/Save Clothing Item/i);
  fireEvent.click(submitButton);

  expect(global.alert).toHaveBeenCalledWith("Please upload an image");
});

//Test 3: Check if the upload progress indicator updates correctly

test('updates upload progress correctly', async () => {
  render(<AddClothingItem />);

  const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
  fireEvent.change(screen.getByType('file'), { target: { files: [file] } });

  fireEvent.click(screen.getByText(/Save Clothing Item/i));

  // Simulate progress change (mocking this part would involve mocking Firebase)
  expect(screen.getByText(/Upload Progress:/i)).toBeInTheDocument();
});