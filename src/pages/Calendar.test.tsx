import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import Calendar from './Calendar';

describe('Calendar Component', () => {
  beforeEach(() => {
    // Set a fixed date for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 11, 9)); // December 9, 2024
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders calendar with correct month and year', () => {
    render(<Calendar />);
    expect(screen.getByText('December 2024')).toBeInTheDocument();
  });

  test('renders days of the week', () => {
    render(<Calendar />);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('renders correct number of days for the month', () => {
    render(<Calendar />);
    const dayElements = screen.getAllByRole('cell').filter(cell => cell.textContent !== '');
    expect(dayElements).toHaveLength(31); // December has 31 days
  });

  test('changes month when next button is clicked', () => {
    render(<Calendar />);
    fireEvent.click(screen.getByLabelText('Next Month'));
    expect(screen.getByText('January 2025')).toBeInTheDocument();
  });

  test('changes month when previous button is clicked', () => {
    render(<Calendar />);
    fireEvent.click(screen.getByLabelText('Previous Month'));
    expect(screen.getByText('November 2024')).toBeInTheDocument();
  });

  test('selects a date when clicked', () => {
    render(<Calendar />);
    const dayElement = screen.getByText('15');
    fireEvent.click(dayElement);
    expect(dayElement).toHaveAttribute('aria-selected', 'true');
  });

  test('deselects previously selected date when a new date is clicked', () => {
    render(<Calendar />);
    const firstDay = screen.getByText('1');
    const secondDay = screen.getByText('2');
    
    fireEvent.click(firstDay);
    expect(firstDay).toHaveAttribute('aria-selected', 'true');
    
    fireEvent.click(secondDay);
    expect(firstDay).not.toHaveAttribute('aria-selected');
    expect(secondDay).toHaveAttribute('aria-selected', 'true');
  });
});