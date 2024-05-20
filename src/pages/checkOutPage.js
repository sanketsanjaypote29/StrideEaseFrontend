// @js-ignore
import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutNav from "../components/navBars/checkoutNav";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { BASE_URL } from "./helper";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }
      const data = await response.json();
      setEvent(data.event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };
  //cashfree integration

  let cashfree;

  let insitialzeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  insitialzeSDK();

  const getSessionId = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/payment`);

      if (res.data && res.data.payment_session_id) {
        console.log(res.data);
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await axios.post(`${BASE_URL}/verify`, {
        orderId: orderId,
      });

      if (res && res.data) {
        alert("payment verified");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let sessionId = await getSessionId();
      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("payment initialized");
        

        verifyPayment(orderId);
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!event) {
    return <div className="items-center ml-10">Loading...</div>;
  }
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

  if (!event) {
    return <div className="items-center ml-10">Loading...</div>;
  }

  return (
    <>
      <CheckoutNav />
      <div className="flex mt-10">
        <div className="ml-5 h-auto w-10/12">
          <div className="border bg-amber-50 h-48 w-11/12 ml-10 rounded-lg shadow-lg shadow-blue-300 m-5">
            <div className="flex">
              <h1 className="text-2xl font-bold text-black ml-5 mt-5">
                {event.ticketName}
              </h1>
              <div className="flex items-center right-96 ml-auto mt-3 mr-3">
                <button className="border bg-amber-50 hover:bg-pink-200 flex items-center shadow-md hover:shadow-pink-500 p-2 rounded-lg text-black mr-3">
                  <FaPlus className="text-1 mr-1" />
                  <span>Add</span>
                </button>
              </div>
            </div>
            <div className="ml-5 flex items-center">
              <label className="text-gray-600 w-32 text-md ">
                {formatDate(event.saleStartDate)} |
              </label>
              <label className="text-gray-600 text-md">
                {event.venueAddress}
              </label>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm font-semibold ml-5 mt-2">
                Price: ₹ {" " + event.ticketPrice} /- Onwards Exclusive of Taxes
                and Platform Fees
              </label>
              <label className="text-gray-500 text-sm  ml-5 mt-2">
                {event.description}
              </label>
            </div>
          </div>
        </div>
        <div className="relative right-0 mr-16 mt-5">
          <div className="h-48 w-96 border rounded-lg p-5">
            <div className="mb-3">
              <label className="text-2xl font-bold text-gray-500 ">
                Summary
              </label>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold text-gray-500">
                Price (+1 item)
              </label>
              <label className="font-semibold text-gray-500">
                ₹ {event.ticketPrice}/-
              </label>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold text-green-500">
                Jurseey Deivery
              </label>
              <label className="font-semibold text-gray-500">₹ 50/-</label>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold text-purple-500">
                Total Amount
              </label>
              <label className="font-semibold text-gray-500">
                ₹ {event.ticketPrice + 50}/-
              </label>
            </div>
            <p className="text-xs">
              Prices are inclusive of all taxes and Booking Fees
            </p>
          </div>
          <div>
            <button
              className="border bg-amber-50 hover:bg-blue-400 hover:text-white hover:shadow-blue-500 hover:border-blue-500 shadow-lg p-2 mt-5 rounded-lg w-96"
              onClick={handleClick}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-36">
        <Footer />
      </div>
    </>
  );
};

export default CheckOutPage;
