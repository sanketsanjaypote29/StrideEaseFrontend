import React from "react";
import EventCard from "./eventCard";

const EventContainer = ({ events }) => {
  return (
    <div className="mt-8  justify-center  items-center h-full">
      <div className="flex items-center justify-center">
        <label className=" flex font-bold text-3xl relative text-black">
          Events At
        </label>
        <label className="flex text-gray-500 text-3xl ml-2 font-bold ">
          Pune
        </label>
      </div>

      <div className="flex overflow-x-scroll no-scrollbar mb-10 px-3 py-3 mt-8 ">
        <EventCard />
      </div>
      <div className="ml-4 cursor-pointer flex items-center justify-center">
        <p className="text-gray-500 mr-2">View All</p>
        <div className="flex">
          <div className="w-3 h-3 rounded-full mx-1 bg-black"></div>
          <div className="w-3 h-3 rounded-full mx-1 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
