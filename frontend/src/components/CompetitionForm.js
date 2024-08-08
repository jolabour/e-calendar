import React, { useState } from 'react';
import '../assets/styles/CompetitionForm.css';

const CompetitionForm = () => {
  const [form, setForm] = useState({
    name: '',
    date: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="competition-form">
      <h2>Create New Competition</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Competition Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default CompetitionForm;