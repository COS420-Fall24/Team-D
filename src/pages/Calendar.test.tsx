// Calendar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';

// Mock the Date object to control the current date during tests
const mockDate = new Date(2024, 11, 8); // December 8th, 2024
global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;

describe('Calendar Component', () => {
  it('renders the calendar with the correct month and year', () => {
    render(<Calendar />);
    
    // Check if the calendar header displays the correct month and year
    const header = screen.getByText(/December 2024/i);
    expect(header).toBeInTheDocument();
  });

  it('displays the correct days of the week', () => {
    render(<Calendar />);
    
    // Check if the days of the week are correctly displayed
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('renders the correct number of days for the month', () => {
    render(<Calendar />);
    
    // Check if the calendar has the correct number of days for December 2024
    const daysInMonth = 31;
    for (let i = 1; i <= daysInMonth; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('navigates to the next month when the next button is clicked', () => {
    render(<Calendar />);
    
    // Click the "Next" button
    fireEvent.click(screen.getByLabelText('Next Month'));

    // Check if the month changes to January 2025
    expect(screen.getByText(/January 2025/i)).toBeInTheDocument();
  });

  it('navigates to the previous month when the previous button is clicked', () => {
    render(<Calendar />);
    
    // Click the "Previous" button
    fireEvent.click(screen.getByLabelText('Previous Month'));

    // Check if the month changes to November 2024
    expect(screen.getByText(/November 2024/i)).toBeInTheDocument();
  });

  it('selects a day when clicked', () => {
    render(<Calendar />);
    
    // Select a date (e.g., 8th)
    const day = screen.getByText('8');
    fireEvent.click(day);
    
    // Check if the day is selected
    expect(day).toHaveClass('selected');
  });

  it('does not select a day if clicked again', () => {
    render(<Calendar />);
    
    // Select a date (e.g., 8th)
    const day = screen.getByText('8');
    fireEvent.click(day);
    fireEvent.click(day); // Click again to unselect
    
    // Check if the day is no longer selected
    expect(day).not.toHaveClass('selected');
  });
});
