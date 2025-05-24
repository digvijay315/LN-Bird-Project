import React from "react";
import { months } from "../util/calendar";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from "dayjs";
import cn from "../util/cn";
import styles from "../styles/calendar.module.css";
const CalendarHeader = ({ today, setToday }) => {
  const currentDate = dayjs();

  return (
    <div className={cn("w-96 ", styles["calendar-container"])}>
      <div className={cn(" flex  justify-center", styles["calendar-header"])}>
        <h1 className="font-semibold">
          {months[today.month()]}, {today.year()}
        </h1>
        <div className="nav-controls flex items-center gap-5">
          <GrFormPrevious
            className="icon h-5 w-5 cursor-pointer hover: scale-105 transition-all"
            onClick={() => setToday(today.month(today.month() - 1))}
          />
          <h1
            className={cn(
              " cursor-pointer hover:scale-105 transition-all",
              styles["today-button"]
            )}
            onClick={() => setToday(currentDate)}
          >
            Today
          </h1>
          <GrFormNext
            className="icon w-5 h-5 cursor-pointer hover:scale-105 transition-all"
            onClick={() => setToday(today.month(today.month() + 1))}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
