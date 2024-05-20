import React from "react";
import Navbar from "../components/navbar";
import { MdOutlineEventNote } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import Footer from "../components/footer";
import { IoShareOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdOutlineContactMail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MapPicker from "react-google-map-picker";
import Geocode from "react-geocode";
import { useEffect } from "react";
import ViewEventNav from "../components/navBars/viewEventNav";

const ViewEventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Extract event ID from route parameters
  const [event, setEvent] = useState(null);
  const [showMapPopup, setShowMapPopup] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);
  // console.log(eventId);
  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:6005/api/events/${eventId}`
      );
      const data = await response.json();
      console.log(data);
      setEvent(data.event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };
  if (!event) {
    return <div>Loading...</div>;
  }
  const date = new Date(event.saleStartDate);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    // Split the formatted date by space
    const dateParts = formattedDate.split(" ");

    // Concatenate day, month, and year
    const formattedString = `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`;

    return formattedString;
  };

  const formatVenueAddress = (address) => {
    // Split the address string by comma
    const addressParts = address.split(",");
    // Iterate over the array elements from index 1 to 5 and concatenate them
    let formattedAddress = "";
    for (let i = 1; i <= 3 && i < addressParts.length; i++) {
      formattedAddress += addressParts[i].trim() + " ";
    }
    // Remove trailing whitespace
    formattedAddress = formattedAddress.trim();
    return formattedAddress;
  };

  const openMapWithCoordinates = () => {
    setShowMapPopup(true);
  };
  const openMapInPopup = (address) => {
    try {
      if (!address) {
        throw new Error("Address is not provided.");
      }
      const addressParts = address.split(",");
      // Iterate over the array elements from index 1 to 5 and concatenate them
      let formattedAddress = "";
      for (let i = 1; i < addressParts.length; i++) {
        formattedAddress += addressParts[i].trim() + " ";
      }
      // Remove trailing whitespace
      formattedAddress = formattedAddress.trim();

      const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        formattedAddress
      )}`;

      const popupWidth = 600;
      const popupHeight = 600;
      const left = window.innerWidth / 2 - popupWidth / 2;
      const top = window.innerHeight / 2 - popupHeight / 2;
      const popupOptions = `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`;
      window.open(mapUrl, "_blank", popupOptions);
    } catch (error) {
      console.error("Error opening map:", error.message);
      // Handle error
    }
  };
  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
  };
  const handleClick = () => {
    // alert("You have successfully registered for the event");
    navigate(`/checkOut/${event._id}`);
  };
  // console.log("this is eventid in view:", event._id);
  return (
    <div className="h-full">
      <ViewEventNav/>
      <div className="flex justify-center mt-8">
        <div className="flex flex-row justify-between ml-10">
          <div className="mb-8 mr-10 ">
            <div className="flex items-center">
              <button className="bg-transparent hover:border text-black w-40 mb-7 font-bold py-2 px-4 rounded  flex items-center">
                <MdOutlineEventNote className="mr-1" size={"25px"} />
                <label className="text-black font-bold text-lg">Event</label>
                <label className="text-gray-500 ml-1">Detail</label>
              </button>
            </div>
            <div className="flex items-center">
              <button className="bg-transparent hover:border text-black w-50  font-bold py-2 px-4 rounded mb-7 flex items-center">
                <TbFileDescription className="mr-1" size={"25px"} />
                <label className="text-black font-bold text-lg">Event</label>
                <label className="text-gray-500 ml-1">Description</label>
              </button>
            </div>
            <div className="flex items-center">
              <button className="bg-transparent hover:border text-black w-40  font-bold py-2 px-4 rounded mb-7 flex items-center">
                <IoBagCheckOutline className="mr-1" size={"25px"} />
                <label className="text-black font-bold text-lg">Checkout</label>
              </button>
            </div>
          </div>
        </div>

        <div className="mr-8 w-[1000px] h-full  py-5">
          <img
            src="/eventbanner.jpg"
            alt="Event"
            className="w-[1100px] h-72 object-cover rounded-lg"
          />
          <div className="flex">
            <p className="mt-4 text-center text-black text-xl ">
              {event.ticketName}
            </p>
          </div>
          <div className="flex items-center ml-2">
            <div className="mflex items-center">
              <label className="text-gray-600 w-44 text-md mr-4">
                {formatDate(event.saleStartDate)} | 
              </label>
              <label className="text-gray-600 text-md">
                {event.venueAddress}
              </label>
            </div>
            <div>
              <button
                className="border px-2 py-3 rounded-xl w-52 right-0 flex items-center justify-center"
                onClick={() => openMapInPopup(event.venueAddress)}>
                View On map <GrMapLocation className="ml-3" size={"20px"} />
              </button>
            </div>

            <div className=" flex">
              <button>
                <IoShareOutline size={"30px"} className="ml-10 mr-5" />
              </button>
              <button>
                <FcLike size={"30px"} />
              </button>
            </div>
          </div>
          <div className=" min-h-96 border mt-10 rounded-lg bg-amber-50 h-full ">
            <div className="m-5">
              <label className="text-black font-bold text-lg">Event</label>
              <label className="text-gray-500 ml-1 font-semibold">Detail</label>
            </div>
            <div className="m-10 bg-white border rounded-lg h-full min-h-64">
              <p className="m-5">{event.description}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="border bg-amber-50 p-4 w-80 rounded-lg">
            <h2 className="text-black font-semibold">
              ₹ {event.ticketPrice} Onwards Exclusive of Taxes and Platform Fees
            </h2>

            <button
              className="border  px-2 py-3 rounded-lg mt-10 bg-amer-500   text-black border-black font-bold flex items-center "
              onClick={handleClick}>
              <MdLockOutline className="ml-2 mr-3" size={"25px"} /> Book Now
            </button>
          </div>
          <div className="border bg-amber-50  p-4 w-80 mr-10 mt-10 rounded-lg">
            <h2 className="text-black font-semibold">
              Have any Doubts? Send any Queries To the Organizer
            </h2>
            <button className="border px-2 py-3 rounded-lg mt-10 bg-amer-500 border-black text-black font-bold flex items-center">
              <MdOutlineContactMail className="ml-2 mr-3" size={"25px"} />{" "}
              Contact Organizer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewEventDetails;
