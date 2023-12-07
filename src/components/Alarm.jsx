import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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

export default function Alarm() {
    const [closestEvent, setClosestEvent] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const fetchClosestEvent = async () => {
            if (!auth.currentUser) return;

            const db = getFirestore();
            const eventsCollection = collection(db, 'calendar');
            const q = query(eventsCollection, where('userId', '==', auth.currentUser.uid));

            try {
                const querySnapshot = await getDocs(q);

                const events = [];
                const now = new Date();

                querySnapshot.forEach((doc) => {
                    const eventData = doc.data();
                    eventData.id = doc.id;
                    eventData.dateTime = new Date(eventData.date + ' ' + eventData.startTime);
                    events.push(eventData);
                });

                // Sort the events by dateTime
                events.sort((a, b) => a.dateTime - b.dateTime);

                // Find the nearest future event
                const closestFutureEvent = events.find((event) => event.dateTime > now);

                if (closestFutureEvent) {
                    closestFutureEvent.remainingTime = closestFutureEvent.dateTime - now;
                    setClosestEvent(closestFutureEvent);
                } else {
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
                    setClosestEvent((prevEvent) => ({ ...prevEvent, remainingTime }));
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
                    <h1 className="text-6xl font-semibold text-gray-900 mb-6">
                        <FaClock className="inline-block mr-2" />
                        Alarm
                    </h1>
                    {closestEvent ? (
                        <div className="shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-center items-center">
                                    <div className="w-64 h-64 bg-red-400 rounded-full flex items-center justify-center">
                                        <span className="text-4xl font-semibold text-white">
                                            {closestEvent.startTime} AM
                                        </span>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <p className="text-4xl text-gray-100">
                                        {formatTime(closestEvent.remainingTime)}
                                    </p>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <Link to="/calendar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Calendar
                                    </Link>
                                    <Link to="/config" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                        Add Alarms
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <p className="text-center text-lg text-gray-800">No upcoming events</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
