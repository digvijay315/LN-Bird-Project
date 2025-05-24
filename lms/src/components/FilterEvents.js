import React, { useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
// import "./styles/filterEvents.module.css";

const FilterEvents = () => {
  const { events, setFilteredEvents } = useContext(EventContext);
  const [category, setCategory] = useState("");

  const handleFilter = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === "") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.category === selectedCategory)
      );
    }
  };

  return (
    <div className="filter-events mb-4">
      <select
        value={category}
        onChange={handleFilter}
        className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
  );
};

export default FilterEvents;
