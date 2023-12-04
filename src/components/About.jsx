import React from 'react';
import Navbar from './Navbar';
import logo from '../assets/logo.png';

export default function About() {
  return (
    <div>
      <Navbar />
      <section className="bg-white text-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-xl text-center">
            <img src={logo} className="w-[150px] h-[150px] mb-3 rounded" alt="Sunrise Tech Logo" />
            <h2 className="text-5xl font-bold sm:text-7xl">Why Choose Sunrise Tech?</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-2">
            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-300 p-4 text-gray-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Our Mission Statement</h2>
                <p className="mt-1 text-sm text-gray-700">
                  At Sunrise Tech, our mission is to revolutionize the alarm business by designing
                  innovative solutions that improve sleep quality and fix your sleep schedule. We
                  are dedicated to enhancing your well-being through cutting-edge technology and
                  smart alarm systems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-300 p-4 text-gray-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Company Beliefs</h2>
                <p className="mt-1 text-sm text-gray-700">
                  At Sunrise Tech, our core beliefs are centered around providing exceptional
                  customer experiences, fostering innovation, and prioritizing sleep health. We
                  believe that a well-rested world is a healthier and happier world.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-300 p-4 text-gray-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Innovative Technology</h2>
                <p className="mt-1 text-sm text-gray-700">
                  We are pioneers in leveraging cutting-edge technology to create smart alarm
                  solutions that adapt to your sleep patterns, ensuring you wake up refreshed and
                  rejuvenated.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-300 p-4 text-gray-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Customer-Centric Approach</h2>
                <p className="mt-1 text-sm text-gray-700">
                  Our focus is always on you. We strive to exceed your expectations by providing
                  personalized solutions, excellent customer support, and products that enhance your
                  sleep experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-300 p-4 text-gray-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Quality Assurance</h2>
                <p className="mt-1 text-sm text-gray-700">
                  We are committed to the highest standards of quality and reliability. Our products
                  undergo rigorous testing to ensure they meet and exceed industry benchmarks,
                  guaranteeing your satisfaction and trust.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="shrink-0 rounded-lg bg-gray-300 p-4 text-gray-800">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                </svg>
              </span>

              <div>
                <h2 className="text-lg font-bold">Innovative Solutions</h2>
                <p className="mt-1 text-sm text-gray-700">
                  Our commitment to innovation drives us to continuously develop new solutions that
                  make your sleep routine more efficient and enjoyable. Expect nothing less than
                  cutting-edge technology from Sunrise Tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
