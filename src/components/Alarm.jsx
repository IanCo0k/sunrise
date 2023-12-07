import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa'; // Import your preferred icons

export default function Alarm() {
  const [closestEvent, setClosestEvent] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchClosestEvent = async () => {
      if (!auth.currentUser) return;

      const db = getFirestore();
      const eventsCollection = collection(db, 'calendar');
      const q = query(eventsCollection, where('userId', '==', auth.currentUser.uid), orderBy('date', 'asc'));

      try {
        const querySnapshot = await getDocs(q);

        let foundEvent = false;
        const now = new Date();

        for (const doc of querySnapshot.docs) {
          const eventData = doc.data();
          const eventDate = new Date(eventData.date + ' ' + eventData.startTime);

          if (eventDate > now) {
            eventData.id = doc.id;
            eventData.remainingTime = eventDate - now;
            setClosestEvent(eventData);
            foundEvent = true;
            break;
          }
        }

        if (!foundEvent) {
          setClosestEvent(null);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchClosestEvent();
  }, [auth]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (closestEvent) {
        const now = new Date();
        const eventDate = new Date(closestEvent.date + ' ' + closestEvent.startTime);
        const remainingTime = eventDate - now;

        if (remainingTime <= 0) {
          clearInterval(interval);
          setClosestEvent(null);
        } else {
          setClosestEvent(prevEvent => ({ ...prevEvent, remainingTime }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [closestEvent]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className='pt-14 bg-gradient-to-r from-yellow-300 to-red-500'>
      <Navbar />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            <FaCalendarAlt className="inline-block mr-2" />
            Events
          </h1>
          {closestEvent ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2">
                  {closestEvent.event}
                </div>
                <div className="text-gray-700 text-lg mb-4">
                  <FaCalendarAlt className="inline-block mr-2" />
                  {closestEvent.date}
                </div>
                <div className="text-gray-600 text-sm">
                  <FaClock className="inline-block mr-2" />
                  {closestEvent.startTime}
                </div>
                <div className="text-red-600 text-xl mt-4">
                  Countdown: {formatTime(closestEvent.remainingTime)}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-lg">No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
}
