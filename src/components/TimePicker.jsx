import React, { useState } from 'react';

const TimePicker = ({ value, onChange }) => {
  const [time, setTime] = useState(value);
  const [isValid, setIsValid] = useState(true);

  const validateTime = (inputTime) => {
    // Validate input for a valid time format (e.g., "hh:mm am/pm")
    const isValidTime = /^(\d{1,2}:\d{2} [APap][Mm])?$/.test(inputTime);
    setIsValid(isValidTime || inputTime === '');
  };

  const handleTimeChange = (e) => {
    const inputTime = e.target.value;
    setTime(inputTime);
  };

  const handleBlur = () => {
    validateTime(time);
    onChange(time);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Start time (e.g., 12:00 AM)"
        value={time}
        onChange={handleTimeChange}
        onBlur={handleBlur}
        className={`w-full rounded p-2 mt-2 ${isValid ? '' : 'border-red-500'}`}
      />
      {!isValid && (
        <p className="text-red-500 text-sm mt-1">Invalid time format. Use "hh:mm AM/PM".</p>
      )}
    </div>
  );
};

export default TimePicker;
