import React from "react";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";
import graphic1 from "../assets/graphic1.png";
import background from '../assets/background.png';
import { Link } from "react-router-dom";

export default function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative", // The parent needs to be relative
  };

  const overlayStyle = {
    content: "",
    position: "absolute", // Position it absolutely
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // This is the overlay color
    zIndex: 1, // Ensure it's behind the content
  };

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <div style={overlayStyle}></div> {/* Overlay is separate */}
      <section className="flex flex-col min-h-screen justify-center align-middle relative z-10"> {/* Higher z-index to be above the overlay */}
        <div className="p-12 md:p-24 text-center flex flex-col justify-center items-center">
          <img
            src={logo}
            alt="Sunrise Tech Logo"
            className="w-32 h-32 rounded-full"
          />
          <h2 className="text-5xl font-bold text-white md:text-8xl mb-3">
            SunRise Tech
          </h2>
          <p className="text-white text-lg mb-8 md:text-xl">
            Revolutionizing the way you wake up by simulating natural sunlight.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to="/about"
              className="inline-block rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 text-sm font-medium text-white transition hover:bg-gradient-to-br focus:outline-none focus:ring focus:ring-yellow-400 mb-4 md:mb-8 mr-4"
            >
              Learn More
            </Link>
            <Link
              to="/alarm"
              className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-4 text-sm font-medium text-white transition hover:bg-gradient-to-br focus:outline-none focus:ring focus:ring-blue-400 mb-4 md:mb-8"
            >
              View Alarms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
