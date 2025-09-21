import React, { useState } from "react";
import { addContact } from "../api";

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = (data) => {
    const { name, email, phone } = data;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!name || !email || !phone) {
      setError("All fields are required.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setError("Phone must be 10 digits.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    let updatedEmail = formData.email;
    if (!updatedEmail.includes("@")) {
      updatedEmail = `${updatedEmail}@gmail.com`;
    }

    const updatedFormData = {
      ...formData,
      email: updatedEmail,
    };

    if (!validate(updatedFormData)) return;

    try {
      await addContact(updatedFormData);
      setSuccess("Contact added successfully!"); 
      setFormData({ name: "", email: "", phone: "" });

      if (onContactAdded) onContactAdded();

      //  Hide success message 
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Failed to add contact.");

      
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-3">
      <h4 className="mb-3">Add Contact</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <input
            type="text" 
            name="email"
            className="form-control"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <small className="text-muted">e.g., example or example@gmail.com</small>
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
