import React from 'react';
import Navbar from './Navbar';
import companyLogo from '../assets/logo.png';

export default function About() {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-r from-yellow-300 to-red-500 min-h-screen py-12 text-gray-800">
        <div className="max-w-6xl mx-auto  pt-[75px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img
              src={companyLogo}
              alt="Sunrise Tech Logo"
              className="w-32 h-32 mx-auto rounded-full mb-6"
            />
            <h2 className="text-4xl font-bold sm:text-6xl mb-6">Why Choose Sunrise Tech?</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Our Mission Statement</h2>
              <p className="text-gray-700">
                At Sunrise Tech, our mission is to revolutionize the alarm business by designing innovative solutions that improve sleep quality and fix your sleep schedule. We are dedicated to enhancing your well-being through cutting-edge technology and smart alarm systems.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Company Beliefs</h2>
              <p className="text-gray-700">
                At Sunrise Tech, our core beliefs are centered around providing exceptional customer experiences, fostering innovation, and prioritizing sleep health. We believe that a well-rested world is a healthier and happier world.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Innovative Technology</h2>
              <p className="text-gray-700">
                We are pioneers in leveraging cutting-edge technology to create smart alarm solutions that adapt to your sleep patterns, ensuring you wake up refreshed and rejuvenated.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Customer-Centric Approach</h2>
              <p className="text-gray-700">
                Our focus is always on you. We strive to exceed your expectations by providing personalized solutions, excellent customer support, and products that enhance your sleep experience.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Quality Assurance</h2>
              <p className="text-gray-700">
                We are committed to the highest standards of quality and reliability. Our products undergo rigorous testing to ensure they meet and exceed industry benchmarks, guaranteeing your satisfaction and trust.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Innovative Solutions</h2>
              <p className="text-gray-700">
                Our commitment to innovation drives us to continuously develop new solutions that make your sleep routine more efficient and enjoyable. Expect nothing less than cutting-edge technology from Sunrise Tech.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
