import React, { useState, useEffect } from 'react';
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

const Config = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Sort data when it changes
    sortData();
  }, [data, sortKey, sortOrder]);

  const sortData = () => {
    let sortedData = [...data];

    if (sortKey) {
      sortedData.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setData(sortedData);
  };

  const handleAddData = () => {
    if (date && startTime && duration) {
      setData([...data, { date, startTime, duration }]);
      setDate('');
      setStartTime('');
      setDuration('');
    }
  };

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Data Entry</h1>
      <div className="mb-4">
        <input
          type="date"
          className="p-2 mr-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          className="p-2 mr-2 border rounded"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="number"
          className="p-2 mr-2 border rounded"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddData}
        >
          Add
        </button>
      </div>
      <div className="mb-4">
        <button className="px-4 py-2 mr-2 bg-gray-300 rounded" onClick={() => handleSort('date')}>
          Sort by Date ({sortKey === 'date' ? sortOrder : ''})
        </button>
        <button className="px-4 py-2 mr-2 bg-gray-300 rounded" onClick={() => handleSort('startTime')}>
          Sort by Start Time ({sortKey === 'startTime' ? sortOrder : ''})
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => handleSort('duration')}>
          Sort by Duration ({sortKey === 'duration' ? sortOrder : ''})
        </button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.date}</td>
              <td className="border px-4 py-2">{item.startTime}</td>
              <td className="border px-4 py-2">{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Config;
