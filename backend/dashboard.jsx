// Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login'); // Redirect to login if token doesn't exist
    } else {
      // Fetch data from the server if token exists
      axios.get('/api/dashboard', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUserData(response.data))
        .catch((error) => {
          console.error('Error fetching dashboard data', error);
          history.push('/login'); // Redirect to login if authentication fails
        });
    }
  }, [history]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {userData && (
        <div>
          <p>Welcome, {userData.f_Name}</p>
          {/* Render your dashboard content and CRUD operations here */}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
