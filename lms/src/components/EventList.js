import React, { useContext } from "react";
import { EventContext } from "../context/EventContext";
import { Link } from "react-router-dom";
// import "./styles/eventList.module.css";

const EventList = () => {
  const { events } = useContext(EventContext);

  return (
    <div className="event-list">
      {events.length ? (
        events.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id}>
            {event.title}
          </Link>
        ))
      ) : (
        <p>No events for today.</p>
      )}
    </div>
  );
};

export default EventList;
