import React, { useContext } from "react";
import { EventContext } from "../context/EventContext";
import EventDetails from "../components/EventDetails";
import { useParams, useNavigate } from "react-router-dom";
// import "./styles/eventDetailsPage.module.css";

const EventDetailsPage = () => {
  const { events, setEvents } = useContext(EventContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((event) => event.id === id);

  const handleDelete = () => {
    setEvents(events.filter((event) => event.id !== id));
    navigate("/");
  };

  return (
    <div className="event-details-page max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {event ? (
        <>
          <EventDetails event={event} />
          <div className="flex justify-end mt-6 ">
            <button
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg">Event not found</p>
      )}
    </div>
  );
};

export default EventDetailsPage;
