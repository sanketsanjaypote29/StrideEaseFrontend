import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

function CreateEventForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
    eventOrganizer: "",
    eventContact: "",
  });

  const handleNext = () => {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit form data
    console.log("Form submitted:", formData);
  };

  const isFirstStep = step === 1;

  return (
    <div className="w-full py-4 px-8">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <form>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="Event Name"
            />
            <input
              type="text"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              placeholder="Event Description"
            />
            <div className="mt-16 flex  justify-between">
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              placeholder="Event Date"
            />
            <input
              type="text"
              name="eventOrganizer"
              value={formData.eventOrganizer}
              onChange={handleChange}
              placeholder="Event Organizer"
            />
            <div className="mt-16 flex justify-between">
              <Button type="button" onClick={handlePrev} disabled={isFirstStep}>
                Prev
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleChange}
              placeholder="Event Location"
            />
            <input
              type="text"
              name="eventContact"
              value={formData.eventContact}
              onChange={handleChange}
              placeholder="Event Contact"
            />
            <div className="mt-16 flex justify-between">
              <Button type="button" onClick={handlePrev}>
                Prev
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        )}
      </form>
    </div>
  );
}

export default CreateEventForm;
