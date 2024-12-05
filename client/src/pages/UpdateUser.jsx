import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

function UpdateUser() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Destination: '',
    f_Gender: '',
    f_Course: [], // Array for multiple f_Course selections (checkbox)
    f_Image: '',
  });
  const [loading, setLoading] = useState(true); // State to track if data is loading
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch user data when the component mounts
  useEffect(() => {
    if (!token) {
      navigate('/');
    }

    const fetchUserData = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKENDURL;
        const response = await axios.get(`${backendUrl}/user/list/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const user = response.data;
        setFormData({
          f_Name: user.f_Name || '',
          f_Email: user.f_Email || '',
          f_Mobile: user.f_Mobile || '',
          f_Destination: user.f_Destination || '',
          f_Gender: user.f_Gender || '',
          f_Course: user.f_Course || [],
          f_Image: user.f_Image || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      // Handle checkbox selection (multiple options)
      const updatedf_Course = [...formData.f_Course];
      if (updatedf_Course.includes(value)) {
        // Remove if already selected
        updatedf_Course.splice(updatedf_Course.indexOf(value), 1);
      } else {
        // Add to selection
        updatedf_Course.push(value);
      }
      setFormData({ ...formData, f_Course: updatedf_Course });
    } else {
      // Handle other input types
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, f_Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const backendUrl = import.meta.env.VITE_BACKENDURL;
  
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((value) => {
          formDataToSend.append(key, value); // Append array values individually
        });
      } else if (key === 'f_Image' && formData[key]) {
        formDataToSend.append(key, formData[key]); // Append the file only if it exists
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.put(`${backendUrl}/user/edit/${id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('User updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user. Please try again.');
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <Link to="/dashboard" className="px-4 py-2 mb-4 rounded">
        <MdOutlineArrowBackIosNew />
      </Link>
      <h2 className="text-2xl font-semibold text-center mt-4 text-gray-700 mb-6">Update User</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="f_Name" className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            type="text"
            id="f_Name"
            name="f_Name"
            value={formData.f_Name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="f_Email" className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            id="f_Email"
            name="f_Email"
            value={formData.f_Email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="f_Mobile" className="block text-gray-600 font-medium mb-2">Mobile</label>
          <input
            type="tel"
            id="f_Mobile"
            name="f_Mobile"
            value={formData.f_Mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="f_Destination" className="block text-gray-600 font-medium mb-2">f_Destination</label>
          <select
            id="f_Destination"
            name="f_Destination"
            value={formData.f_Destination}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Destination</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="f_Gender" className="block text-gray-600 font-medium mb-2">f_Gender</label>
          <div className="flex items-center">
            <input
              type="radio"
              id="male"
              name="f_Gender"
              value="Male"
              checked={formData.f_Gender === 'Male'}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="f_Gender"
              value="Female"
              checked={formData.f_Gender === 'Female'}
              onChange={handleChange}
              className="mr-2 ml-4"
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="f_Course" className="block text-gray-600 font-medium mb-2">f_Course</label>
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mca"
                name="f_Course"
                value="MCA"
                checked={formData.f_Course.includes('MCA')}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="mca">MCA</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="bca"
                name="f_Course"
                value="BCA"
                checked={formData.f_Course.includes('BCA')}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="bca">BCA</label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="bsc"
                name="f_Course"
                value="BSC"
                checked={formData.f_Course.includes('BSC')}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="bsc">BSC</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="f_Image" className="block text-gray-600 font-medium mb-2">Profile Image</label>
          <input
            type="file"
            id="f_Image"
            name="f_Image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-6 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
