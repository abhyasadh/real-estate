import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminReceivedContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
    if (loggedInUser && loggedInUser.role === 'admin') {
      fetchAdminContacts();
    } else {
      toast.error('You must be logged in as an admin to view this page.');
    }
  }, []);

  const fetchAdminContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contactus/');
      console.log(response);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Error fetching admin contacts');
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/contactus/update/${id}`);
      toast.success('Contact marked as read.');
      fetchAdminContacts();
    } catch (error) {
      console.error('Error marking contact as read:', error);
      toast.error('Error marking contact as read');
    }
  };

  return (
    <div className="flex flex-wrap justify-around gap-6 bg-white p-8 rounded-lg shadow-lg mb-10">
      {/* Enquiries Table */}
      <div className="w-full mt-10">
        <h3 className="text-xl font-semibold mb-4">All Contact Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="py-3 px-4 bg-gray-100 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.name}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.email}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.phone}</td>
                    <td className="py-3 px-4 border-b border-gray-200">{enquiry.message}</td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {enquiry.read ? <span className="text-green-500">Read</span> : <button className="text-red-500" onClick={()=>markAsRead(enquiry._id)}>Mark as Read</button>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-4 text-center text-gray-500">No contact requests yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReceivedContacts;
