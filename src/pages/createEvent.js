import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Stepper, Step } from "@material-tailwind/react";
import MapPicker from "react-google-map-picker";
import axios from "axios";
import { FaMapMarkedAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./stepper.css";
import { useNavigate } from "react-router-dom";
import CreateEventNav from "../components/navBars/CreateEventNav";
import { BASE_URL } from "./helper";

const defaultPosition = {
  lat: 18.5204,
  lng: 73.8567,
};

const CreateEvent = () => {
  // State variables
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showImageUploadForm, setShowImageUploadForm] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [ticketName, setTicketName] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [totalSlots, setTotalSlots] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [saleEndDate, setSaleEndDate] = useState(new Date());
  const [organiserName, setOrganiserName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [individualOrCompany, setIndividualOrCompany] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [address, setAddress] = useState("Pune Maharashtra,India");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [city, setCityName] = useState("");
  const [location, setLocation] = useState(defaultPosition);
  const [zoom, setZoom] = useState(10);
  const navigate = useNavigate();

  //want to get the googleId of the user in local storage
  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/login/sucess`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("googleId", response.data.user.googleId);
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  // Array to hold steps
  const steps = [
    "Organizer",
    "Event Venue",
    "Description",
    "Image Upload",
    "Ticket",
  ];

  // Function to handle moving to the next step
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleData();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  // Function to handle moving back to the previous step
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  // console.log("Google Id:", response.data.user.googleId);

  const handleData = async () => {
    const googleId = localStorage.getItem("googleId");
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "post",
        body: JSON.stringify({
          googleId,
          organiserName,
          country,
          state,
          individualOrCompany,
          venueAddress: city,
          description: textAreaValue,
          images: imageFiles.map((file) => file.name),
          startDate,
          endDate,
          ticketName,
          ticketType,
          totalSlots,
          ticketPrice,
          venueLocation: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      // Show success toast
      toast.success("Event created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form fields and stepper after success
      resetForm();
    } catch (error) {
      console.error(error);
      // Show error toast
      toast.error("Error creating event. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Function to reset form fields and stepper
  const resetForm = () => {
    setOrganiserName("");
    setCountry("");
    setState("");
    setIndividualOrCompany("");
    setTextAreaValue("");
    setImageFiles([]);
    setStartDate(new Date());
    setEndDate(new Date());
    setTicketName("");
    setTicketType("");
    setTotalSlots(0);
    setTicketPrice(0);
    setSaleEndDate(new Date());
    setCityName("");
    setLocation(defaultPosition);
    setZoom(10);
    setActiveStep(0);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      setShowImageUploadForm(false);
      setShowTicketForm(true);
    }
  };
  // Function to handle change in start date
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Function to handle change in end date
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Function to handle change in location
  const handleLocationChange = (lat, lng) => {
    setLocation({ lat: lat, lng: lng });
  };

  // Function to handle change in zoom level
  const handleZoomChange = (newZoom) => {
    setZoom(newZoom);
  };

  // Effect to perform reverse geocoding when location changes
  useEffect(() => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyAcyLx7lr6FJDrQYzv6f5tJP8m8q1UjO6E`
      )
      .then((response) => {
        const results = response.data.results;
        if (results && results.length > 0) {
          const formattedAddress = results[0].formatted_address;
          setCityName(formattedAddress);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  }, [location]);

  const activeColor = (index) =>
    activeStep >= index ? "bg-blue-500" : "bg-gray-300";
  const isFinalStep = (index) => index === 5 - 1;

  return (
    <>
      <CreateEventNav />
      <div className="flex flex-col items-center justify-center">
        {/* Stepper component */}
        <div className="w-full px-24 py-4 mx-10 mb-16 ">
          <Stepper
            activeStep={activeStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}>
            {steps.map((step, index) => (
              <Step
                className="bg-transperent"
                key={index}
                onClick={() => setActiveStep(index)}>
                {index === activeStep && (
                  <>
                    <span
                      className={`w-6 h-6 px-0 font-medium text-center text-white  rounded-full text-md ${activeColor(
                        index
                      )}`}>
                      {index + 1}
                    </span>
                    {isFinalStep(index) ? null : (
                      <div className="mt-2  text-gray-800">{step}</div>
                    )}
                  </>
                )}
                {index !== activeStep && (
                  <>
                    <span
                      className={`w-6 h-6 font-medium text-center text-white rounded-full text-md ${activeColor(
                        index
                      )}`}>
                      {index + 1}
                    </span>
                    <div className="text-gray-400 ">{step}</div>
                  </>
                )}
              </Step>
            ))}
          </Stepper>
        </div>

        {/* Form */}
        <div className="w-1/2 h-auto p-4 border bg-amber-50 left-96 mb-28 rounded-2xl">
          <form onSubmit={(e) => e.preventDefault()}>
            {activeStep === 0 && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <label className="mr-1 font-bold text-gray-800">
                      Enter
                    </label>
                    <label className="block text-sm font-bold text-gray-600">
                      Organiser's Name
                    </label>
                  </div>
                  <input
                    type="text"
                    name="organiserName"
                    value={organiserName}
                    onChange={(e) => setOrganiserName(e.target.value)}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Enter Organiser name"
                    required="true"
                  />
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <label className="mr-1 font-bold text-gray-800">
                      Enter
                    </label>
                    <label className="block text-sm font-bold text-gray-600">
                      Country
                    </label>
                  </div>
                  <select
                    name="country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    required="true">
                    <option value="" disabled>
                      Select country
                    </option>
                    <option value="India">India</option>
                    {/* Add other country options here */}
                  </select>
                </div>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <label className="mr-1 font-bold text-gray-800">
                      Enter
                    </label>
                    <label className="block text-sm font-bold text-gray-600">
                      State
                    </label>
                  </div>
                  <select
                    name="state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    required="true">
                    <option value="" disabled>
                      Select a state
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    {/* Add state options here */}
                  </select>
                </div>
                <div className="flex justify-start mt-8 mb-4 ml-10">
                  <label className="block mb-2 mr-10 text-sm font-bold text-gray-700">
                    I am an Individual
                    <input
                      type="radio"
                      name="individualOrCompany"
                      value="Individual"
                      checked={individualOrCompany === "Individual"}
                      onChange={(e) => {
                        setIndividualOrCompany(e.target.value);
                      }}
                      className="ml-2"
                      required="true"
                    />
                  </label>
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    We are a Company
                    <input
                      type="radio"
                      name="individualOrCompany"
                      value="Company"
                      checked={individualOrCompany === "Company"}
                      onChange={(e) => {
                        setIndividualOrCompany(e.target.value);
                      }}
                      className="ml-2"
                      required="true"
                    />
                  </label>
                </div>
              </div>
            )}
            {activeStep === 1 && (
              <div>
                {/* Description */}
                <div className="">
                  <div className="flex items-center mb-2">
                    <label className="mr-1 font-bold text-gray-800">
                      Event
                    </label>
                    <label className="block text-sm font-bold text-gray-600">
                      Venue Address
                    </label>
                  </div>
                  <div className="mb-4">
                    <div className="flex mb-4">
                      <input
                        type="text"
                        className="w-8/12 px-3 py-2 mr-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                        placeholder="Enter Venu Address"
                      />
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="pl-2 pr-2 ml-4 border">
                        <FaMapMarkedAlt style={{ marginRight: "5px" }} />
                        <div className="font-bold text-black">Use Map</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col w-full">
                      <label className="w-full px-3 py-2 mb-2 font-bold leading-tight text-black border rounded appearance-none focus:outline-none focus:shadow-outline">
                        Address: {city}
                      </label>
                      <div className="mb-5">
                        {/* LocationPickerExample component */}
                        <MapPicker
                          defaultLocation={defaultPosition}
                          mapTypeId="roadmap"
                          style={{ height: "350px" }}
                          onChangeLocation={handleLocationChange}
                          onChangeZoom={handleZoomChange}
                          apiKey="AIzaSyAcyLx7lr6FJDrQYzv6f5tJP8m8q1UjO6E"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 2 && (
              <div>
                {/* Description */}
                <div className="mb-20 h-80">
                  <div className="flex items-center mb-2">
                    <label className="mr-1 font-bold text-gray-800">
                      Upload
                    </label>
                    <label className="block text-sm font-bold text-gray-600">
                      Images
                    </label>
                  </div>
                  <div className="flex items-center justify-center m-5 mb-10 bg-white h-80">
                    <div>
                      <label className="block text-sm text-gray-600 font-demiboldmb-2">
                        Upload Cover Picture For The Event You are Organizing
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        required="true"
                        className="justify-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 3 && (
              <div>
                <div className="flex items-center mb-2">
                  <label className="mr-1 font-bold text-gray-800">Enter</label>
                  <label className="block text-sm font-bold text-gray-600">
                    Description
                  </label>
                </div>
                <div className="mb-4">
                  <textarea
                    value={textAreaValue}
                    onChange={(e) => setTextAreaValue(e.target.value)}
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none h-80 focus:outline-none focus:shadow-outline"
                    placeholder="Enter your description"
                    required="true"
                  />
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div>
                <div className="flex items-center mb-2">
                  <label className="mr-1 font-bold text-black">Ticket</label>
                  <label className="block text-sm font-bold text-gray-500">
                    Name
                  </label>
                </div>

                <div className="flex mb-4">
                  <input
                    type="text"
                    className="w-8/12 px-3 py-2 mr-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                    placeholder="Enter ticket name "
                    onChange={(e) => setTicketName(e.target.value)}
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="mr-1 font-bold text-black">Ticket</label>
                  <label className="block text-sm font-bold text-gray-500">
                    Type
                  </label>
                </div>
                <div className="mb-5">
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      id="paidTicket"
                      name="ticketType"
                      value="Paid"
                      checked={ticketType === "Paid"}
                      onChange={(e) => setTicketType(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="paidTicket" className="mr-4 text-gray-700">
                      Paid
                    </label>

                    <input
                      type="radio"
                      id="freeTicket"
                      name="ticketType"
                      value="Free"
                      checked={ticketType === "Free"}
                      onChange={(e) => setTicketType(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="freeTicket" className="mr-4 text-gray-700">
                      Free
                    </label>

                    <input
                      type="radio"
                      id="donationTicket"
                      name="ticketType"
                      value="Donation"
                      checked={ticketType === "Donation"}
                      onChange={(e) => setTicketType(e.target.value)}
                      className="mr-2"
                      required="true"
                    />
                    <label htmlFor="donationTicket" className="text-gray-700">
                      Donation
                    </label>
                  </div>
                </div>

                {/* Second row */}

                <div className="flex mb-4">
                  <div className="flex flex-col w-full">
                    {/* Wrap second input field and label in a div with flex direction column */}
                    <div className="flex items-center mb-2">
                      <label className="mr-1 font-bold text-black">Total</label>
                      <label className="block text-sm font-bold text-gray-500">
                        Slots For Event
                      </label>
                    </div>
                    {/* Move the label above the input field */}
                    <input
                      type="text"
                      className="px-3 py-2 leading-tight text-gray-700 border rounded appearance-none w-80 focus:outline-none focus:shadow-outline"
                      placeholder="Input Field 2"
                      required="true"
                      onChange={(e) => setTotalSlots(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex items-center mb-2">
                      <label className="mr-1 font-bold text-black">
                        Ticket
                      </label>
                      <label className="block text-sm font-bold text-gray-500">
                        Price
                      </label>
                    </div>
                    {/* Move the label above the input field */}
                    <input
                      type="text"
                      className="px-3 py-2 leading-tight text-gray-700 border rounded appearance-none w-80 focus:outline-none focus:shadow-outline"
                      placeholder="Input Field 2"
                      required="true"
                      onChange={(e) => {
                        setTicketPrice(e.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Third row */}
                <div className="h-20 mb-4">
                  <div className="w-full h-auto mt-8 bg-amber-50 left-96 rounded-2xl">
                    <div className="flex mb-4">
                      <div className="flex flex-col mr-20">
                        <div className="flex items-center mb-2">
                          <label className="mr-1 font-bold text-black">
                            Ticket
                          </label>
                          <label className="block text-sm font-bold text-gray-500">
                            Sale stat at
                          </label>
                        </div>
                        <div className="flex">
                          <FaRegCalendarAlt className="mt-1 mr-2 text-xl" />
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            className="mr-2 border"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col ">
                        <div className="flex items-center mb-2">
                          <label className="mr-1 font-bold text-black">
                            Ticket
                          </label>
                          <label className="block text-sm font-bold text-gray-500">
                            Sale end on
                          </label>
                        </div>

                        <div className="flex">
                          <FaRegCalendarAlt className="mt-1 mr-2 text-xl" />
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            className="mr-2 border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end m-5">
              {activeStep !== 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 mr-2 font-semibold text-black border rounded-lg bg-amber-50 hover:bg-red-400 hover:text-white focus:outline-none focus:shadow-outline">
                  Back
                </button>
              )}
              <button
                type="submit"
                onClick={handleNext}
                className="px-4 py-2 font-semibold text-black border rounded-lg bg-amber-50 hover:bg-blue-500 hover:text-white focus:outline-none focus:shadow-outline">
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
