import React from 'react';
import Navbar from './navbar';
import logo from '../assets/logo.png';
import graphic1 from '../assets/graphic1.png';
import graphic2 from '../assets/graphic2.png';

export default function Home() {
  return (
    <div>
      <Navbar />
      <section class="overflow-hidden min-h-screen bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
  <div class="p-8 md:p-12 lg:px-16 lg:py-24">
    <div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 class="text-5xl font-bold text-gray-900 md:text-6xl">
        SunRise Tech
      </h2>

      <p class="text-gray-500 md:mt-4 md:block">
        Revolutioning the way you wake up by simulating natural sunlight.
      </p>

      <div class="mt-4 md:mt-8">
        <a
          href="/about"
          class="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Learn More
        </a>
        
      </div>
    </div>
  </div>

  <img
    alt="Violin"
    src={graphic1}
    class="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
  />
</section>
    </div>
  );
}
