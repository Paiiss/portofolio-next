'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
              <span className="block text-2xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                Muhammad Fais Avriody Daffa
              </span>
            </h1>
            <h2 className="mb-4 text-lg font-medium text-slate-500 dark:text-slate-300 lg:text-2xl">
              Informatics Engineering Student
            </h2>
            <p className="mb-10 font-medium leading-relaxed text-slate-700 dark:text-slate-200">
              Passionate about code, and innovation.
            </p>

            <Link
              href="mailto:mfa.daffa@gmail.com"
              className="rounded-full bg-pink-500 px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:opacity-80 hover:shadow-lg"
            >
              Hubungi Saya
            </Link>
          </div>
          <div className="mx-auto flex w-full justify-center self-end px-4 lg:w-2/5">
            <Image
              src={'/svg/avatar.svg'}
              alt="Picture of the author"
              width={400}
              height={300}
              className="mt-10 max-w-[280px] md:max-w-full lg:mt-9"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
