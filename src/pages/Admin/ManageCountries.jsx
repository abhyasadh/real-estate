import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllCountriesApi, addCountryApi, updateCountryApi } from '../../Apis/apis';

const ManageCountries = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingCountryId, setEditingCountryId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await getAllCountriesApi();
      if (Array.isArray(res.data.countries)) {
        setCountries(res.data.countries);
      } else {
        setCountries([]);
      }
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      toast.error('Failed to fetch countries');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCountryId) {
        await updateCountryApi(editingCountryId, formData);
        toast.success('Country updated successfully!');
        setEditingCountryId(null);
      } else {
        await addCountryApi(formData);
        toast.success('Country added successfully!');
      }
      setFormData({ name: '' });
      fetchCountries();
    } catch (error) {
      toast.error(`Error ${editingCountryId ? 'updating' : 'adding'} country.`);
      console.error(`Error ${editingCountryId ? 'updating' : 'adding'} country:`, error);
    }
  };

  const handleEdit = (country) => {
    setEditingCountryId(country._id);
    setFormData({ name: country.name });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    // Implement delete functionality
  };

  const openDeleteModal = (id) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max bg-white p-8 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {editingCountryId ? 'Edit Country' : 'Add Country'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-500"
              placeholder="Enter Country Name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            {editingCountryId ? 'Update' : 'Save'}
          </button>
        </form>
      </div>

      <div className="w-full max bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">List of Countries</h2>
        <div className="space-y-6">
          {countries.map((country) => (
            <div
              key={country._id}
              className="bg-white border border-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex-grow">
                <p className="text-gray-700 text-sm">
                  <strong>Name:</strong> {country.name}
                </p>
                <div className="flex mt-3">
                  <button
                    onClick={() => handleEdit(country)}
                    className="mr-3 px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(country._id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <h3 className="text-lg font-semibold">Delete Confirmation</h3>
              <p className="text-sm text-gray-600 mt-2">Are you sure you want to delete this item?</p>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2 hover:bg-gray-400">Cancel</button>
              <button onClick={() => handleDelete(selectedItemId)} className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCountries;