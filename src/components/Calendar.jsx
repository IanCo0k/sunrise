import React, { useState, useEffect } from 'react';
import TimePicker from './TimePicker';
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
  query,
  where,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Calendar = () => {
  const [currentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(11);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState('');
  const [newEventStartTime, setNewEventStartTime] = useState('');

  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in, update the state with the user's information
        setUser(authUser);
        console.log(authUser.displayName);
      } else {
        // User is signed out, set user state to null
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth]);

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = daysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const eventDates = events.map((event) => event.date);

  const renderCalendar = () => {
    const calendar = [];
  
    const handleDateClick = (day) => {
      const [year, month, date] = day.split('-').map((part) => part.padStart(2, '0'));
      const formattedDay = `${year}-${month}-${date}`;
  
      setSelectedDate(formattedDay);
      setIsModalOpen(true);
    };
  
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendar.push(
        <div key={`empty-${i}`} className="calendar-cell empty-cell"></div>
      );
    }
  
    for (let day = 1; day <= days; day++) {
      const paddedDay = day.toString().padStart(2, '0');
      const paddedMonth = (currentMonth + 1).toString().padStart(2, '0');
      const dateStr = `${currentYear}-${paddedMonth}-${paddedDay}`;
      const hasEvent = eventDates.includes(dateStr);
  
      calendar.push(
        <div
          key={`day-${day}`}
          className={`calendar-cell cursor-pointer p-2 rounded-full ${
            hasEvent ? 'bg-blue-100' : ''
          } ${dateStr === selectedDate ? 'bg-blue-200' : ''}`}
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
    if (!user) return; // Exit if user is not authenticated
  
    console.log('fetching...')
    const db = getFirestore();
    const eventsCollection = collection(db, 'calendar');
  
    const q = query(eventsCollection, where('userId', '==', user.uid)); // Filter events by user ID
  
    try {
      const querySnapshot = await getDocs(q);
  
      const fetchedEvents = [];
      querySnapshot.forEach((doc) => {
        fetchedEvents.push({ id: doc.id, ...doc.data() });
      });
  
      console.log('Fetched events:', fetchedEvents); // Log fetched events
  
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  

  useEffect(() => {
    console.log('this was called...')
    fetchEvents();
  }, [user]);

  const addEvent = async () => {
    if (newEventName.trim() !== '' && selectedDate) {
      if (!user) return; // Exit if user is not authenticated

      const dateStr = selectedDate;
      const startTime = newEventStartTime || 'All day';
      const db = getFirestore();
      const eventsCollection = collection(db, 'calendar');

      // Include the user's ID when adding an event
      await addDoc(eventsCollection, {
        date: dateStr,
        event: newEventName,
        startTime: startTime,
        userId: user.uid, // Store the user's ID
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
    <div className='pt-[75px] min-h-screen bg-gradient-to-r from-yellow-300 to-red-500'>
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
                    <TimePicker
                        value={newEventStartTime}
                        onChange={(newTime) => setNewEventStartTime(newTime)}
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
