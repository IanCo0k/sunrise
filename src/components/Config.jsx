import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Config = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [event, setEvent] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const auth = getAuth();

  useEffect(() => {
    // Fetch events tied to the authenticated user
    fetchEvents();
  }, []);

  useEffect(() => {
    // Sort the data based on the selected sorting option
    if (sortBy === 'date') {
      setData([...data].sort((a, b) => a.date.localeCompare(b.date) * (sortDirection === 'asc' ? 1 : -1)));
    } else if (sortBy === 'time') {
      setData([...data].sort((a, b) => a.startTime.localeCompare(b.startTime) * (sortDirection === 'asc' ? 1 : -1)));
    }
  }, [sortBy, sortDirection]);

  const fetchEvents = async () => {
    if (!auth.currentUser) return;

    const db = getFirestore();
    const eventsCollection = collection(db, 'calendar');
    const q = query(eventsCollection, where('userId', '==', auth.currentUser.uid));

    try {
      const querySnapshot = await getDocs(q);

      const fetchedEvents = [];
      querySnapshot.forEach((doc) => {
        fetchedEvents.push({ id: doc.id, ...doc.data() });
      });

      setData(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async () => {
    if (date && startTime && event) {
      const db = getFirestore();
      const eventsCollection = collection(db, 'calendar');

      await addDoc(eventsCollection, {
        date,
        startTime,
        event,
        userId: auth.currentUser.uid,
      });

      // Clear input fields after adding an event
      setDate('');
      setStartTime('');
      setEvent('');

      // Refresh the events list
      fetchEvents();
    }
  };

  const handleSortBy = (option) => {
    if (option === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('asc');
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="bg-gradient-to-r from-yellow-300 p-5 pt-[120px] to-red-500 min-h-screen text-gray-800 py-8 rounded">
        <div className="container mx-auto mt-4" style={{ maxWidth: '800px' }}>
          <h1 className="text-2xl font-semibold mb-4">Event Entry</h1>
          <div className="mb-4 flex flex-col sm:flex-row items-center">
            <input
              type="date"
              className="p-2 mr-2 border rounded focus:outline-none focus:border-blue-500"
              style={{ width: '100%', marginBottom: '0.5rem' }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              className="p-2 mr-2 border rounded focus:outline-none focus:border-blue-500"
              style={{ width: '100%', marginBottom: '0.5rem' }}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="text"
              className="p-2 mr-2 border rounded focus:outline-none focus:border-blue-500 flex-grow"
              style={{ width: '100%', marginBottom: '0.5rem' }}
              placeholder="Description of event..."
              value={event}
              onChange={(e) => setEvent(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
          <div className="mb-4">
            <button
              className={`px-4 py-2 mr-2 rounded ${
                sortBy === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
              onClick={() => handleSortBy('date')}
            >
              Sort by Date {sortBy === 'date' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
            <button
              className={`px-4 py-2 rounded ${
                sortBy === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
              }`}
              onClick={() => handleSortBy('time')}
            >
              Sort by Time {sortBy === 'time' && sortDirection === 'asc' ? '▲' : '▼'}
            </button>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">Event</th>
              </tr>
            </thead>
            <tbody>
              {data.map((event) => (
                <tr key={event.id}>
                  <td className="border px-4 py-2">{event.date}</td>
                  <td className="border px-4 py-2">{event.startTime}</td>
                  <td className="border px-4 py-2">{event.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Config;
