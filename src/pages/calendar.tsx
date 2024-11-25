import React, { useState, useEffect } from 'react';
import './Calendar.css';

// Define the types for state and props if needed
const Calendar: React.FC = () => {
  // State for the current date and selected date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    // Optionally, you can fetch data for the current month or do other side-effects here.
  }, [currentDate]);

  // Function to get the days of the week
  const getDaysOfWeek = (): string[] => {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
  };

  // Function to get the first day of the month
  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  // Function to change the month (next or previous)
  const changeMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Render the calendar with the appropriate rows and days
  const renderCalendar = (): JSX.Element[] => {
    const daysOfWeek = getDaysOfWeek();
    const daysInMonth = getDaysInMonth(currentDate.getMonth() + 1, currentDate.getFullYear());
    const firstDay = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

    const days: JSX.Element[] = [];

    // Add empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    // Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear();
      days.push(
        <td
          key={day}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          aria-selected={isSelected || undefined}
        >
          {day}
        </td>
      );
    }

    // Add empty cells after the last day of the month to complete the last row
    const totalCells = firstDay + daysInMonth;
    const emptyCellsAfter = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 0; i < emptyCellsAfter; i++) {
      days.push(<td key={`empty-after-${i}`} className="empty"></td>);
    }

    // Break the days into weeks
    const weeks: JSX.Element[] = [];
    let week: JSX.Element[] = [];
    days.forEach((day, index) => {
      week.push(day);
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        weeks.push(<tr key={week.toString()}>{week}</tr>);
        week = [];
      }
    });

    return weeks;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} aria-label="Previous Month">&lt;</button>
        <span>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </span>
        <button onClick={() => changeMonth(1)} aria-label="Next Month">&gt;</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            {getDaysOfWeek().map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
