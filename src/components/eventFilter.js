import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
const EventFilter = ({ handleFilter }) => {
  const handleClick = (filter) => {
    handleFilter(filter);
  };

  return (
    <div className="flex items-center ml-80">
      <label className="text-black text-2xl font-bold">Filter</label>
      <label className="text-gray-500  text-2xl ml-2 ">Events</label>
      <div className="ml-3 flex">
        <div className="ml-3 flex items-center">
          <button
            onClick={() => handleClick("today")}
            className="border py-2 px-3 w-auto text-black font-semibold rounded-md flex items-center">
            <label className="p-1">Today</label>
            <FaRegCalendarCheck className="ml-5" />
          </button>
        </div>
        <div className="ml-3 flex items-center">
          <button
            onClick={() => handleClick("today")}
            className="border py-2 px-3 w-auto text-black font-semibold rounded-md flex items-center">
            <label className="p-1">Tommarow</label>
            <FaRegCalendarCheck className="ml-5" />
          </button>
        </div>
        <div className="ml-3 flex items-center">
          <button
            onClick={() => handleClick("today")}
            className="border py-2 px-3 w-auto text-black font-semibold rounded-md flex items-center">
            <label className="p-1">This Week</label>
            <BsCalendarWeekFill className="ml-5" />
          </button>
        </div>
        <div className="ml-3 flex items-center">
          <button
            onClick={() => handleClick("today")}
            className="border py-2 px-3 w-auto text-black font-semibold rounded-md flex items-center">
            <label className="p-1">This Month</label>
            <FaCalendarAlt className="ml-5" />
          </button>
        </div>
        <div className="ml-3 flex items-center">
          <button
            onClick={() => handleClick("today")}
            className="border py-2 px-3 w-auto text-black font-semibold rounded-md flex items-center">
            <label className="p-1">Free</label>
            <FaFreeCodeCamp className="ml-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
