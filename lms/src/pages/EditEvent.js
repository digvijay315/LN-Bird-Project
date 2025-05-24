import React, { useContext } from "react";
import EventForm from "../components/EventForm";
import { EventContext } from "../context/EventContext";
import { useNavigate, useParams } from "react-router-dom";
// import "./styles/editEvent.module.css";

const EditEvent = () => {
  const { events, handleEditEvent } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((event) => event.id === id);
  console.log("Retrieved event for editing:", event);
  const handleSubmit = (updatedEvent) => {
    console.log("Editing event with data:", updatedEvent);
    handleEditEvent({ ...updatedEvent, id: id.toString() });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="edit-event bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Event</h1>
        {event ? (
          <EventForm event={event} onSubmit={handleSubmit} />
        ) : (
          <p className="text-red-500">Event not found</p>
        )}
      </div>
    </div>
  );
};

export default EditEvent;
