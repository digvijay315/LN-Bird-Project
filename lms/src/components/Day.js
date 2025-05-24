import React from "react";
import cn from "../util/cn";
import dayjs from "dayjs";
// import "./styles/day.module.css";

const Day = ({
  date,
  currentMonth,
  today,
  selectDate,
  setSelectDate,
  events,
}) => {
  const isSelectedDate = dayjs(selectDate).isSame(date, "day");
  const hasEvent = events.some((event) =>
    dayjs(event.date).isSame(date, "day")
  );
  const isToday = dayjs().isSame(date, "day");
  return (
    <div className="day-container h-14 border-t grid place-content-center text-xs">
      <h1
        className={cn(
          currentMonth ? "" : "text-gray-400",
          today ? "bg-red-600 text-white" : "",
          selectDate.toDate().toDateString() === date.toDate().toDateString()
            ? "bg-black text-white"
            : "",
          isSelectedDate && !isToday ? "bg-blue-500 text-white" : "",
          hasEvent && !isToday ? "bg-blue-100 text-blue-600" : "",
          isToday ? "bg-red-600 text-white" : "",

          "h-10 w-10 rounded-full grid place-content-center hover:bg-black  hover:text-white transition-all cursor-pointer select-none"
        )}
        onClick={() => {
          setSelectDate(date);
        }}
      >
        {date.date()}
      </h1>
    </div>
  );
};

export default Day;
