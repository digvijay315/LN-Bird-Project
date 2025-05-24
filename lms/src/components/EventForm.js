import React, { useState, useContext } from "react";
import { EventContext } from "../context/EventContext";
// import "./styles/eventForm.module.css";

const EventForm = ({ event, onSubmit }) => {
  const [title, setTitle] = useState(event ? event.title : "");
  const [category, setCategory] = useState(event ? event.category : "work");
  const { selectedDate, selectedCategory, setSelectedCategory } =
    useContext(EventContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(),
      title,
      date: selectedDate,
      category,
    };

    onSubmit(newEvent);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSelectedCategory(e.target.value); // Update category in context
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Event Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {/* Uncomment and style date input if needed
    <div className="mb-4">
      <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Event Date</label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div> */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Event Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-lg py-2 px-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="work">work</option>
          <option value="personal">personal</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save
      </button>
    </form>
  );
};

export default EventForm;
