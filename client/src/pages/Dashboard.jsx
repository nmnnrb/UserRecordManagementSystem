import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';

function Dashboard() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

// Filter users based on search keyword
const filteredUsers = users.filter(
  (user) =>
    user.f_Name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    user.f_Email.toLowerCase().includes(searchKeyword.toLowerCase())
);
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};


 
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const token = localStorage.getItem('token')
  const getAll = async () => {
    // Fetch users from the backend API
    const response = await axios.get(`${backendUrl}/user/list` , {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }},);
    console.log("reponse on dashboard", response.data.users);
    console.log("filter users", filteredUsers);

    setUsers(response.data.users);
  }
  const handleDelete = async (id) => {
    await axios.delete(`${backendUrl}/user/delete/${id}` , {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }});
    getAll(); 
   };


   const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // This will navigate to the /edit route
  };


  useEffect(() => {
    getAll();
  },[])

  useEffect(() => {
    if (!token) {
      navigate('/'); 
    } else {
      getAll(); 
    }
  }, [token, navigate]); 

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-100"
        >
          Create User Detail
        </Link>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border px-4 py-2 rounded w-[14rem]"
        />

<Link
          to="/" onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-100"
        >
          Logout
        </Link>
      </div>

      <table className="w-full border-collapse border bg-zinc-400 border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-2 py-2">Unique ID</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-1">Email</th>
            <th className="border border-gray-300 px-4 py-2">Mobile</th>
            <th className="border border-gray-300 px-2 py-1">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-8 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.uniqueId}>
                <td className="border border-gray-300 px-4 py-2">{user.f_UniqueId}</td>
                <td className="border border-gray-300 px-4 py-2">
                <img
  src={
    user.f_Image && user.f_Image !== "public/uploads/placeholder.png" 
      ? `${backendUrl}/uploads/${user.f_Image}`
      : `${backendUrl}/public/uploads/placeholder.png`
  }
  alt="User"
  className="w-12 h-12 rounded-full"
/>

                </td>
                <td className="border border-gray-300 px-4 py-2">{user.f_Name}</td>
                <td className="border border-gray-300 px-4 py-1">{user.f_Email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.f_Mobile}</td>
                <td className="border border-gray-300 px-2 py-1">{user.f_Destination}</td>
                <td className="border border-gray-300 px-4 py-2">{user.f_Gender}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.f_Course.map((crs,idx) => {
                    return user.f_Course.length > 1 ? ( <span key={idx} className='' > {`${crs},`} </span>) :  <span key={idx} className='' > {`${crs}`} </span>
                  })} 

                </td>
                <td className="border border-gray-300 px-4 py-2">{formatDate(user.f_CreateDate)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                     onClick={() => handleEdit(user._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="text-center text-gray-500 py-4"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
