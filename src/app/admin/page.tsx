"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { CardAnats } from "@/components/CardAnats";
import { CardSamples } from "@/components/CardSamples";

const Home = () => {
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      window.location.href = "/admin/auth";
    }
  }, []);

  return (
    <main className="min-h-screen w-full">
      <h1 className="text-4xl md:text-5xl text-center mt-16 font-bold mb-4">
        PathosCode
      </h1>
      <div className="flex flex-col md:flex-row h-full gap-5 md:gap-14 justify-center mt-16">
        <div className="w-10/12 md:w-1/3 max-w-md bg-base-200 p-10 rounded-2xl">
          <h2 className="text-center mb-10 font-bold text-2xl">Anats</h2>
          <CardAnats admin={true} />
        </div>
        <div className="w-10/12 md:w-1/3 max-w-md bg-base-200 p-10 rounded-2xl">
          <h2 className="text-center mb-10 font-bold text-2xl">Samples</h2>
          <CardSamples admin={true} />
        </div>
      </div>
    </main>
  );
};

export default Home;
