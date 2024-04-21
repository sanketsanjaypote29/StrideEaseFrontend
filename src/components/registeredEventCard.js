import React from "react";
import { TERipple } from "tw-elements-react";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { LuEye } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../pages/helper";

const RegisteredEventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    // Implement the logic to delete the event here
    console.log("Deleting event:", event);
    // You can make a fetch request to your backend to delete the event
    Example: fetch(`${BASE_URL}/api/events/${event._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Event deleted successfully, you may want to update state or show a message
          console.log("Event deleted successfully");
        } else {
          // Error occurred while deleting the event
          console.error("Error deleting event");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
      //refresh the page
      window.location.reload();
  };
  const handleEditButtonClick = () => {
    navigate(`/editevent/${event._id}`);
  };
  return (
    <>
      <div className="block w-96 h-fit ml-16 bg-amber-50 rounded-3xl mb-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] shadow-blue-100  hover:shadow-pink-200 dark:bg-white-700">
        <TERipple>
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
              className="rounded-t-3xl"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
              alt=""
            />
            <a href="#!">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
            </a>
          </div>
        </TERipple>
        <div className="p-6 m-10">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-black-50">
            {/* {event.ticketName} */}
            {event.ticketName}
          </h5>
          <p className="mb-14 text-base text-neutral-600 dark:text-black-200">
            {/* {event.description} */}
            {event.description}
          </p>
          <div className="relative flex">
            <div className="flex items-center bottom-2">
              <LuEye className="mr-2 bottom-2 text-2xl" />
              <label className="text-xl bottom-2">1250</label>
            </div>

            <div className="flex ">
              <button
                className="text-xl border flex items-center m-auto p-2 rounded-lg bg-amber-50 hover:bg-blue-400 hover:text-white  text-black ml-16 mr-16"
                onClick={handleEditButtonClick}>
                <FaRegEdit className="mr-2" />
                Edit
              </button>
            </div>
            <button
              className="text-2xl right-0 m-auto items-center bottom-2 absolute"
              onClick={handleDelete} // Add onClick event handler to trigger delete
            >
              <IoTrashOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisteredEventCard;
