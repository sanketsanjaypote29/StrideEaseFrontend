import React from "react";
import "./home.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
      <Navbar />  
      <div className="overflow-x-scroll no-scrollbar">
        <div className="container mx-auto px-4 md:flex justify-start ">
          <div className="w-full md:w-5/12 max-h-96 font-sans text-sky-950 md:mr-4 md:ml-40 mt-20">
            <h1 className="font-bold mb-4 text-5xl">
              Seamless Marathon Registration with Home Jersey Delivery
            </h1>
            <p className="text-2xl mb-4 text-gray">
              StrideEase, fast and easy.
            </p>
          </div>
          <div className="flex justify-start mt-10 md:ml-40 w-full md:w-2/5 h-2/5 md:mr-0">
            <img
              src="./jogging/jogging-not-css.svg"
              alt="Marathon"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
