import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherPage from './WeatherPage';

// Mock the fetch function
global.fetch = jest.fn();

describe('WeatherPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders WeatherPage component', () => {
    render(<WeatherPage />);
    expect(screen.getByText('Weather for the Day!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter City...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('handles input change', () => {
    render(<WeatherPage />);
    const input = screen.getByPlaceholderText('Enter City...');
    fireEvent.change(input, { target: { value: 'London' } });
    expect(input).toHaveValue('London');
  });

  test('fetches and displays weather data on successful API call', async () => {
    const mockWeatherData = {
      cod: 200,
      name: 'London',
      main: { temp: 15 },
      weather: [{ main: 'Cloudy' }]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockWeatherData),
    });

    render(<WeatherPage />);
    const input = screen.getByPlaceholderText('Enter City...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('City:')).toBeInTheDocument();
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Temperature:')).toBeInTheDocument();
      expect(screen.getByText('15°C')).toBeInTheDocument();
      expect(screen.getByText('Condition:')).toBeInTheDocument();
      expect(screen.getByText('Cloudy')).toBeInTheDocument();
    });
  });

  test('shows alert on API error', async () => {
    const mockErrorResponse = {
      cod: 404,
      message: 'City not found'
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockErrorResponse),
    });

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<WeatherPage />);
    const input = screen.getByPlaceholderText('Enter City...');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'InvalidCity' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('City not found');
    });

    alertMock.mockRestore();
  });
});