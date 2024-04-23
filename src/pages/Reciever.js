import React, { useState, useEffect } from 'react';
import 'react-dropdown/style.css';

const Reciever = () => {
  const [donorsList, setDonorsList] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [filteredDonors, setFilteredDonors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/donor/get')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDonorsList(data);
        setFilteredDonors(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleBloodGroupChange = (selectedOption) => {
    if (selectedBloodGroup === selectedOption.value) {
      setSelectedBloodGroup(null); // Deselect if already selected
      setFilteredDonors(donorsList); // Reset filters
    } else {
      setSelectedBloodGroup(selectedOption.value);
      filterDonors(selectedOption.value);
    }
  };

  const filterDonors = (bloodGroup) => {
    if (!bloodGroup) {
      setFilteredDonors(donorsList);
    } else {
      const filtered = donorsList.filter(donor => donor.blood_group === bloodGroup);
      setFilteredDonors(filtered);
    }
  };

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' }
  ];

  return (
    <div className='flex justify-evenly items-center h-screen'>
      <div className="mb-4 flex justify-between items-center w-1/4">
        <div className="flex flex-wrap">
          {bloodGroupOptions.map(option => (
            <button
              key={option.value}
              className={`bg-${selectedBloodGroup === option.value ? '[#CC2E2B]' : '[#CC2E2B]'} text-white rounded-full m-1 p-3 w-20 h-20 transition-colors duration:400`}
              onClick={() => handleBloodGroupChange(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <table className="border-collapse border rounded-lg w-2/4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Phone</th>
            <th className="border p-3">Blood Group</th>
            <th className="border p-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor, index) => (
            <tr key={index} className="bg-white">
              <td className="border p-3">{donor.name}</td>
              <td className="border p-3">{donor.email}</td>
              <td className="border p-3">{donor.phone}</td>
              <td className="border p-3">{donor.blood_group}</td>
              <td className="border p-3">{donor.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reciever;
