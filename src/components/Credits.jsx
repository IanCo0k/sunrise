import React from 'react';
import Navbar from './Navbar';

const Credits = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-r from-yellow-300 to-red-500 min-h-screen pt-10 text-gray-800">
        <div className="max-w-[800px] mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="max-w-xl text-center">
            <h2 className="text-5xl font-bold sm:text-7xl text-white">Credits</h2>
          </div>

          <div className="mt-8 space-y-8 md:mt-16">
            <div className="bg-white bg-opacity-80 p-4 rounded-lg">
              <h2 className="text-lg font-bold">Our Company</h2>
              <p className="mt-1 text-sm text-gray-700">
                Erber Cook Web Dev is a leading consulting firm specializing in website development. Our mission is to craft innovative web solutions that seamlessly merge creativity with cutting-edge technology.
              </p>
            </div>

            <div className="bg-white bg-opacity-80 p-4 rounded-lg">
              <h2 className="text-lg font-bold">References</h2>
              <p className="mt-1 text-sm text-gray-700">
                <strong>Graphics</strong>
              </p>
              <ul className="list-disc pl-4 text-gray-700">
                <li>The graphics used on this website are sourced from the following providers:</li>
              </ul>
              <p className="mt-1 text-sm text-gray-700">
                Images on this website were generated using DALL-E, a product of OpenAI.
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Icons on this website are provided by React Icons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Credits;
