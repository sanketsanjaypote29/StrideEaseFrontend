import React, { useEffect, useState } from "react";
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
import { MdDashboard } from "react-icons/md";
import Modal from "../Modal";
import { BASE_URL } from "../../pages/helper";
const CreateEventNav = () => {
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
    { icon: <MdDashboard size={25} className="mr-4" />, text: "Dashboard" },
    { icon: <IoCreate size={25} className="mr-4" />, text: "Create New Event" },

    {
      icon: <BsCalendar2EventFill size={25} className="mr-4" />,
      text: "Your Created Event",
    },
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
    <div>
      <nav className="bg-white p-4">
        <div className="mx-10 max-w-7xl  px-2 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setNav(!nav)}>
            <AiOutlineMenu size={30} />
          </button>

          <div className="mr-96 flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
              <span className="text-lg font-bold text-black mr-4">
                Stride Ease
              </span>
            </Link>
          </div>

          {/* Cross button */}
          <div className="ml-96 right-0">
            <button onClick={handleCancelClick}>
              <RxCross1 size={30} />
            </button>
            <Modal showModal={showModal} setShowModal={handleCloseModal} />
          </div>

          {nav ? (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
          ) : (
            ""
          )}

          <div
            className={
              nav
                ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }>
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <div className="flex ml-5 mt-5">
              <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
              <span className="text-lg font-bold text-black mr-4">
                Stride Ease
              </span>
            </div>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                {menuItems.map(({ icon, text }, index) => (
                  <div key={index} className="py-4">
                    <li
                      className="text-xl flex cursor-pointer w-[100%] rounded-lg mx-auto p-2 hover:text-black hover:bg-blue-300"
                      onClick={() => {
                        if (text === "Logout") {
                          logout();
                        } else if (text === "Create New Event") {
                          navigate("/createevent");
                        } else if (text === "Your Created Event") {
                          navigate("/createdEvent");
                        } else if (text === "Your Registered Event") {
                          navigate("/");
                        } else if (text === "Dashboard") {
                          navigate("/dashboard");
                        }
                      }}>
                      {icon} {text}
                    </li>
                  </div>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CreateEventNav;
