import React, { useState, useEffect, useContext } from "react";
import Calendar from "../components/Calendar";

import dayjs from "dayjs";
import { EventContext } from "../context/EventContext";
import { Link } from "react-router-dom";
import cn from "../util/cn";
import styles from "../styles/calendarView.module.css";

const CalendarView = () => {
  const [today, setToday] = useState(dayjs());

  const {
    events,
    handleDeleteEvent,

    selectedDate,
    setSelectedDate,
    filteredEvents,
    filterEventsByCategory,

    selectedCategory,
    setSelectedCategory,
  } = useContext(EventContext);

  //   const [category, setCategory] = useState("all");
  useEffect(() => {
    console.log("Current events:", events);
    console.log("Selected category:", selectedCategory);
    filterEventsByCategory(selectedCategory);
  }, [selectedCategory, events]);

  const handleDateClick = (date) => {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
  };
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    // changeCategory(newCategory);
    filterEventsByCategory(newCategory);
  };

  return (
    <div
      className={cn(
        "flex h-screen items-center place-content-center ",
        styles["calendar-view"]
      )}
    >
      <div className={cn(" flex items-center ", styles["calendar-view"])}>
        <div
          className={cn(
            "mx-auto flex  items-center gap-8 ",
            styles["view-inner"]
          )}
        >
          <Calendar
            today={today}
            setToday={setToday}
            selectDate={dayjs(selectedDate)}
            setSelectDate={handleDateClick}
            events={filteredEvents} //yha pe filteredEvents jane chahiye
          />
          <div
            className={cn(
              " h-auto w-96 px-2 shadow-md border-4 ",
              styles["schedule"]
            )}
          >
            <h1 className={cn(" font-semibold", styles["schedule-header"])}>
              Schedule for {dayjs(selectedDate).toDate().toDateString()}
            </h1>
            <div className="flex flex-col">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mb-4 px-2 py-1 border border-gray-300 rounded"
              >
                <option value="all">all</option>
                <option value="work">work</option>
                <option value="personal">personal</option>
              </select>
              <Link
                to="/add"
                className="mt-4 inline-block text-blue-500 underline"
              >
                Add Event
              </Link>
            </div>
            <div className="overflow-y-auto max-h-60">
              <ul>
                {/* events */}
                {filteredEvents
                  .filter(
                    (event) =>
                      dayjs(event.date).format("YYYY-MM-DD") === selectedDate
                  )
                  .map((event) => (
                    <li key={event.id} className="mt-2">
                      <div className="">
                        <div className=" flex justify-between shadow-md border-t">
                          <div>
                            <Link to={`/event/${event.id}`}>
                              <span className="ml-2">{event.title}</span>
                              <p className="ml-2 text-sm text-gray-600">
                                {event.category}
                                {/* this category was from EventForm.js */}
                              </p>
                            </Link>
                          </div>
                          <div>
                            <Link
                              to={`/edit/${event.id}`}
                              className="mt-4 inline-block text-blue-500 underline"
                            >
                              Edit Event
                            </Link>

                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="ml-4 px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            {/* <EventList /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
