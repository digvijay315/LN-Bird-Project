import React, { useContext } from "react";
import EventForm from "../components/EventForm";
import { EventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
// import "./styles/addEvent.module.css";

const AddEvent = () => {
  const { setEvents, selectedDate, handleAddEvent } = useContext(EventContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    handleAddEvent({ ...event, id: Date.now().toString(), date: selectedDate });
    navigate("/");
  };

  return (
    <div className="add-event max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Event</h1>
      <EventForm onSubmit={handleSubmit} selectedDate={selectedDate} />
    </div>
  );
};

export default AddEvent;
