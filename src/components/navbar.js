import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { IoCreate } from "react-icons/io5";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdArtTrack } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import CreateEventForm from "../pages/createEventForm";
import { BASE_URL } from "../pages/helper";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  console.log("response", userData.user);
  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/login/sucess`, {
        withCredentials: true,
      });

      setUserData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [nav, setNav] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { icon: <IoCreate size={25} className="mr-4" />, text: "Create New Event" },
    {
      icon: <BsCalendar2EventFill size={25} className="mr-4" />,
      text: "Your Registered Event",
    },
    {
      icon: <MdArtTrack size={25} className="mr-4" />,
      text: "Track Your Goodies",
    },
    {
      icon: <AiFillMessage size={25} className="mr-4" />,
      text: "Support & About Us",
    },
    { icon: <IoMdSettings size={25} className="mr-4" />, text: "Help" },
    { icon: <IoLogOut size={25} className="mr-4" />, text: "Logout" },
  ];
  useEffect(() => {
    getUser();
  }, []);
  const location = useLocation();
  const logout = () => {
    window.location.href = `${BASE_URL}/logout`;
  };
  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="bg-white p-4">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Render the logo */}
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />{" "}
            {/* Adjust height and margin as needed */}
            <div className="flex items-center">
              {" "}
              {/* New container for Stride Ease and dropdowns */}
              <a href="/" className="text-lg font-bold text-black mr-4">
                {" "}
                {/* Add margin-right to Stride Ease */}
                Stride Ease
              </a>
              {/* Dropdowns */}
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option1">Shipping</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option2">Tracking</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option3">Support</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg">
                {" "}
                {/* No margin-right for the last dropdown */}
                <option value="option4">Account</option>
                {/* Add dropdown options as needed */}
              </select>
            </div>
          </div>

          <div className="flex items-center ml-0">
            {Object.keys(userData)?.length > 0 ? (
              <>
                {" "}
                <label className="text-blue-500">Welcome </label>
                <label className="text-black p-2">
                  {userData.user?.displayName}
                </label>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 ml-3 mr-0 text-black">
                  Profile
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 px-3 py-2 text-black">
                  <label onClick={logout}>Logout</label>
                </Link>
                <img
                  src={userData.user?.image}
                  alt="user"
                  className="w-10 h-10 rounded-full p-1"
                />
              </>
            ) : (
              <Link
                to="/login" // Specify the path to the register page
                className="border py-2 px-3 rounded-lg hover:border-blue-400">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
