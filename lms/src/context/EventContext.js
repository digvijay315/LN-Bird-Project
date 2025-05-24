import React, { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    console.log("Loaded events from localStorage:", storedEvents);

    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const filterEventsByCategory = (category) => {
    if (category === "all") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === category);
      console.log("Filtered events", filtered);
      setFilteredEvents(filtered);
    }
  };

  useEffect(() => {
    filterEventsByCategory(selectedCategory); // Apply category filter when category or events change
  }, [events, selectedCategory]);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      console.log("Events after adding new event:", updatedEvents);
      return updatedEvents;
    });
  };
  const handleEditEvent = (updatedEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        // event.id === updatedEvent.id ? updatedEvent : event
        event.id === updatedEvent.id.toString() ? updatedEvent : event
      );
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      console.log("Updated events after edit:", updatedEvents);
      return updatedEvents;
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== eventId);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      console.log("Events after deletion:", updatedEvents);
      return updatedEvents;
    });
  };
  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        filteredEvents,
        setFilteredEvents,
        handleAddEvent,
        handleEditEvent,
        handleDeleteEvent,
        selectedDate,
        setSelectedDate,
        filterEventsByCategory,
        setSelectedCategory,
        selectedCategory,
        changeCategory,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
