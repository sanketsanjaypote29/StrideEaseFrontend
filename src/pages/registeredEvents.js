import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navBars/RegisteredEventNav";
import RegisteredEventCard from "../components/registeredEventCard";
import { BASE_URL } from "./helper";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const googleId = localStorage.getItem("googleId");
        const response = await fetch(
          `${BASE_URL}/api/events/googleId/${googleId}`
        );
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleClick = () => {
    navigate("/createEvent");
  };

  // Function to handle event deletion
  const handleEventDelete = async (eventId) => {
    try {
      // Make a DELETE request to delete the event
      await fetch(`${BASE_URL}/api/events/${eventId}`, {
        method: "DELETE",
      });

      // Remove the deleted event from the events state
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-fit  mb-16 mt-16 overflow-x-scroll no-scrollbar ">
        {loading ? (
          <p>Loading...</p>
        ) : events === undefined ? (
          <div className="border h-96 w-svw bg-amber-50 font-bold items-center  rounded-lg justify-center">
            <p className="ml-96  mt-36">
              You haven't created any events yet. Create an event first.
            </p>
            <div>
              <button
                className="text-xl border flex items-center m-5 p-2 rounded-lg bg-amber-50 hover:bg-blue-400 hover:text-white  text-black ml-96 mr-16"
                onClick={handleClick}>
                Create Event
              </button>
            </div>
          </div>
        ) : (
          events.map((event) => (
            <RegisteredEventCard
              key={event._id}
              event={event}
              googleId={event.googleId}
              onDelete={() => handleEventDelete(event._id)} // Pass handleEventDelete function as onDelete prop
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default RegisteredEvents;
