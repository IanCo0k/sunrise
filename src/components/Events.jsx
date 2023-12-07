import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa'; // Import your preferred icons

export default function Events() {
  const [events, setEvents] = useState([]);
  const auth = getAuth();

  useEffect(() => {
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

        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [auth]);

  return (
    <div className='pt-14 bg-gradient-to-r from-yellow-300 to-red-500'>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            <FaCalendarAlt className="inline-block mr-2" />
            Events
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="px-6 py-4">
                  <div className="font-semibold text-xl mb-2">
                    {event.event}
                  </div>
                  <div className="text-gray-700 text-lg mb-4">
                    <FaCalendarAlt className="inline-block mr-2" />
                    {event.date}
                  </div>
                  <div className="text-gray-600 text-sm">
                    <FaClock className="inline-block mr-2" />
                    {event.startTime}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
