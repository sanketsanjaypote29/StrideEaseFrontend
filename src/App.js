// App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Register from "./pages/register"; // Import the Register component
import Login from "./pages/login"; // Import the Register component
import Dashboard from "./pages/dashboard";
import CreateEvent from "./pages/createEvent";
import ViewEventDetails from "./pages/viewEventDetails";
import { ToastContainer } from "react-toastify";
import CreatedEvent from "./pages/createdEvents";
import CheckOutPage from "./pages/checkOutPage";
import "react-toastify/dist/ReactToastify.css";
import EditEvent from "./pages/editEvent";
import { useEffect } from "react";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/location" element={<locationDemo />} />
        <Route
          path="/viewEventDetails/:eventId"
          element={<ViewEventDetails />}
        />
        <Route path="/createdEvent" element={<CreatedEvent />} />
        <Route path="/checkOut/:eventId" element={<CheckOutPage />} />
        <Route path="/editevent/:eventId" element={<EditEvent />} />
      </Routes>
    </>
  );
}

export default App;
