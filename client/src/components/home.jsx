import React, { useEffect, useState } from 'react';
import axios from 'axios';

const home = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await axios.get('http://localhost:5000/api/members', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setMembers(res.data);
    };
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Members</h2>
      <ul className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {members.map((member, index) => (
          <li key={index} className="p-2 border-b last:border-b-0">{member.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default home;
