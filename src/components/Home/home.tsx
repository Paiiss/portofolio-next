'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Profile from '../../../public/image/me.jpeg';

export default function HomeComponent() {
  const [greeting, setGreeting] = useState('~');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setGreeting('selamat pagi');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('selamat siang');
    } else if (currentHour >= 17 && currentHour < 20) {
      setGreeting('selamat sore');
    } else {
      setGreeting('selamat malam');
    }
  }, []);

  return (
    <section id="home" className="py-0 md:py-16">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full self-center px-4 lg:w-3/5">
            <h1 className="text-base font-bold text-pink-500 md:text-xl">
              Hallo 👋, Saya
              <span className="block font-semibold text-slate-900 dark:text-white text-2xl md:text-4xl">
                Muhammad Fais Avriody Daffa
              </span>
            </h1>
            <h2 className="font-medium text-slate-500 dark:text-slate-300 text-lg mb-4 lg:text-2xl">
              Informatics Engineering Student
            </h2>
            <p className="font-medium text-slate-700 dark:text-slate-200 mb-10 leading-relaxed">
              Passionate about code, and innovation.
            </p>

            <Link
              href="mailto:mfa.daffa@gmail.com"
              className="text-base font-semibold py-3 px-8 text-white bg-pink-500 hover:opacity-80 hover:shadow-lg rounded-full duration-300 ease-in-out"
            >
              Hubungi Saya
            </Link>
          </div>
          <div className="w-full self-end px-4 lg:w-2/5 flex mx-auto justify-center">
            <div className="relative mt-10 lg:mt-9 lg:right-0">
              <Image
                src={Profile}
                alt="Picture of the author"
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
