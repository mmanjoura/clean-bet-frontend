import React, { useState } from 'react';

const DatePicker = ({ selectedDate: externalSelectedDate, onDateChange }) => {
  // Rename the internal state to avoid conflict with the `selectedDate` prop
  const [internalSelectedDate, setInternalSelectedDate] = useState(
    externalSelectedDate || new Date().toISOString().split("T")[0]
  );

  const handleDateChange = (event) => {
    const date = event.target.value;
    setInternalSelectedDate(date);

    // Call the parent callback function to update the selected date in the parent component
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <>
      <input
        type="date"
        className={`
          relative z-20 w-full appearance-none rounded border 
          border-stroke bg-transparent px-12 py-3 outline-none 
          transition focus:border-primary active:border-primary 
          dark:border-form-strokedark dark:bg-form-input
        `}
        value={internalSelectedDate}
        onChange={handleDateChange}
        aria-label="Select a date"
      />
    </>
  );
};

export default DatePicker;
