import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

const Calendar = () => {
  const [currentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = daysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const eventDates = events.map((event) => event.date);

  const renderCalendar = () => {
    const calendar = [];

    const handleDateClick = (day) => {
      setSelectedDate(day);
      setIsModalOpen(true);
    };

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(
        <div key={`empty-${i}`} className="calendar-cell empty-cell"></div>
      );
    }

    for (let day = 1; day <= days; day++) {
      const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
      const hasEvent = eventDates.includes(dateStr);

      calendar.push(
        <div
          key={`day-${day}`}
          className={`calendar-cell ${hasEvent ? 'bg-blue-100' : ''} ${
            dateStr === selectedDate ? 'bg-blue-200' : ''
          } cursor-pointer p-2 rounded-full`}
          onClick={() => handleDateClick(dateStr)}
        >
          {day}
        </div>
      );
    }

    return calendar;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const fetchEvents = async () => {
    const db = getFirestore();
    const eventsCollection = collection(db, 'calendar');

    const querySnapshot = await getDocs(eventsCollection);

    const fetchedEvents = [];
    querySnapshot.forEach((doc) => {
      fetchedEvents.push({ id: doc.id, ...doc.data() });
    });

    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async () => {
    if (newEventName.trim() !== '' && selectedDate) {
      const dateStr = selectedDate;
      const startTime = newEventStartTime || 'All day'; // Default to 'All day' if no start time provided
      const db = getFirestore();
      const eventsCollection = collection(db, 'calendar');

      await addDoc(eventsCollection, {
        date: dateStr,
        event: newEventName,
        startTime: startTime,
      });

      setNewEventName('');
      setNewEventStartTime('');
      closeModal();
      fetchEvents();
    }
  };

  const editEvent = async (eventId) => {
    if (newEventName.trim() !== '') {
      const db = getFirestore();
      const eventDoc = doc(db, 'calendar', eventId);

      await updateDoc(eventDoc, {
        event: newEventName,
      });

      setNewEventName('');
      closeModal();
      fetchEvents();
    }
  };

  const deleteEventById = async (eventId) => {
    const db = getFirestore();
    const eventDoc = doc(db, 'calendar', eventId);

    await deleteDoc(eventDoc);

    closeModal();
    fetchEvents();
  };

  return (
    <div>
      <Navbar />
      <div className="calendar mt-8 bg-white p-4 rounded shadow-lg max-w-screen-md mx-auto">
        <div className="calendar-header mb-4">
          <h2 className="calendar-title text-2xl font-semibold mb-2">
            {new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </h2>
          <div className="flex justify-between items-center">
            <button
              className="btn-change-month bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
              onClick={() => setCurrentMonth(currentMonth - 1)}
            >
              Previous Month
            </button>
            <button
              className="btn-change-month bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={() => setCurrentMonth(currentMonth + 1)}
            >
              Next Month
            </button>
          </div>
        </div>
        <div className="calendar-days grid grid-cols-7 gap-2">
          <div className="calendar-day font-semibold text-center">Sun</div>
          <div className="calendar-day font-semibold text-center">Mon</div>
          <div className="calendar-day font-semibold text-center">Tue</div>
          <div className="calendar-day font-semibold text-center">Wed</div>
          <div className="calendar-day font-semibold text-center">Thu</div>
          <div className="calendar-day font-semibold text-center">Fri</div>
          <div className="calendar-day font-semibold text-center">Sat</div>
        </div>
        <div className="calendar-grid grid grid-cols-7 gap-2">{renderCalendar()}</div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content text-left p-4">
                <h3 className="text-xl font-semibold mb-2">{selectedDate}</h3>
                {events
                  .filter((event) => event.date === selectedDate)
                  .map((event) => (
                    <div key={event.id} className="mb-2">
                      {event.startTime && <strong>{event.startTime}: </strong>}
                      {event.event}
                      <button
                        onClick={() => editEvent(event.id)}
                        className="text-blue-500 ml-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEventById(event.id)}
                        className="text-red-500 ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add event"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    className="w-full rounded p-2"
                  />
                  <input
                    type="text"
                    placeholder="Start time (optional)"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                    className="w-full rounded p-2 mt-2"
                  />
                  <button
                    onClick={addEvent}
                    className="btn-add-event bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
                  >
                    Add Event
                  </button>
                </div>
                <button
                  className="btn-close-modal bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
