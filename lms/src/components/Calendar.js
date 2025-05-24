import React from "react";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import { generateDate } from "../util/calendar";

import styles from "../styles/calendar.module.css";
import cn from "../util/cn";

const Calendar = ({ today, setToday, selectDate, setSelectDate, events }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div
      className={cn(
        "w-96   h-96 mt-10 items-center flex",
        styles["whole-calendar"]
      )}
    >
      <div
        className={cn(
          "calendar-container shadow-md border-4",
          styles["calendar-container"]
        )}
      >
        <CalendarHeader today={today} setToday={setToday} />
        <div className={cn(" w-full grid grid-cols-7", styles["day-labels"])}>
          {days.map((day, index) => (
            <h1
              key={index}
              className="day-label h-10 sm:h-14 grid place-content-center text-xs font-bold text-neutral-900"
            >
              {day}
            </h1>
          ))}
        </div>
        <div
          className={cn(" w-full grid grid-cols-7", styles["calendar-grid"])}
        >
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => (
              <Day
                key={index}
                date={date}
                currentMonth={currentMonth}
                today={today}
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                events={events}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
