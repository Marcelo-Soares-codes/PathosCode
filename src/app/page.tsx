"use client";

import { useState } from "react";
import { CardSamples } from "@/components/CardSamples/index";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main>
      <div className="hero min-h-screen items-start bg-base-200">
        <div className="hero-content flex-col text-center mt-20">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">PathosCode</h1>
            <h1 className="text-md text-primary mb-7">
              Pesquise o código da anatomia aqui:
            </h1>
            <input
              type="text"
              placeholder="Digite aqui ..."
              className="input input-bordered input-primary w-full max-w-xs my-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <CardSamples search={search} />
        </div>
      </div>
    </main>
  );
}
