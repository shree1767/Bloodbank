import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Donor = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    blood_group: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleBloodGroupChange = (selectedOption) => {
    setForm({
      ...form,
      blood_group: selectedOption.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/donor/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        toast.success("Donor added successfully!");
        navigate("/reciever");
      })
      .catch((error) => {
        console.error("There was a problem", error);
        toast.error(error);
      });
  };

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  return (
    <div className="flex justify-between h-screen">
      <div className="w-2/3 flex h-screen items-end">
        <img src="assets/donor.png" alt="donor" />
      </div>
      <div className="w-1/2 flex  items-center justify-center mt-12 bg-[#F2F9FF]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 w-2/3 h-3/4 justify-evenly bg-white border border-gray-300 p-6 notebook"
          autoComplete="off"
        >
          <div className="text-center text-xl font-bold">Donor's Form</div>
          <div className="flex flex-col justify-between">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="border-none bg-transparent w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="border-none bg-transparent w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              className="border-none bg-transparent w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="bloodgroup">Blood Group</label>
            <Dropdown
              options={bloodGroupOptions}
              onChange={handleBloodGroupChange}
              value={form.bloodgroup}
              placeholder="Select blood group"
              className="w-full my-2"
              required
            />
          </div>

          <div className="flex flex-col justify-between">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={handleInputChange}
              className="border-none bg-transparent w-full focus:outline-none"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-[#CC2E2B] text-white py-2.5 px-4 rounded-full w-full"
              type="submit"
            >
              Let's begin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donor;
