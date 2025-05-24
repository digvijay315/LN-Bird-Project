import React from "react";
// import "./styles/eventDetails.module.css";

const EventDetails = ({ event }) => {
  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>{event.date}</p>
      <p className="text-sm text-gray-600">{event.category}</p>
    </div>
  );
};

export default EventDetails;
