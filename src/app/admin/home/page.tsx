"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { SampleType } from "@/DTOs/sample.DTO";
import { AnatType } from "@/DTOs/anat.DTO";
import Cookies from "js-cookie";

const AdminHome = () => {
  const [samples, setSamples] = useState<SampleType[]>([]);
  const [anats, setAnats] = useState<AnatType[]>([]);
  const [loadingSamples, setLoadingSamples] = useState(true);
  const [loadingAnats, setLoadingAnats] = useState(true);

  useEffect(() => {
    const token = Cookies.get("adminToken");

    if (!token) {
      window.location.href = "/admin";
      return;
    }
  });

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await axios.get("/api/sample");
        setSamples(response.data);
        setLoadingSamples(false);
      } catch (error) {
        console.error("Erro ao buscar samples:", error);
        setLoadingSamples(false);
      }
    };

    const fetchAnats = async () => {
      try {
        const response = await axios.get("/api/anat");
        setAnats(response.data);
        setLoadingAnats(false);
      } catch (error) {
        console.error("Erro ao buscar anats:", error);
        setLoadingAnats(false);
      }
    };

    fetchSamples();
    fetchAnats();
  }, []);

  if (loadingSamples || loadingAnats) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full container mx-auto px-0">
      <h2 className="text-2xl font-bold mb-4">Admin Home</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Samples</h3>
          {samples.length > 0 ? (
            samples.map((sample) => (
              <ul
                key={sample.id}
                className="w-full menu items-center text-left bg-base-200 rounded-box py-0 cursor-pointer"
              >
                <div className="divider my-0" />
                <Link className="w-full" href={`/sample/${sample.id}`}>
                  <li className="w-full">
                    <a>
                      <h2>{sample.name}</h2>
                    </a>
                  </li>
                </Link>
              </ul>
            ))
          ) : (
            <div>Não encontrei nenhuma amostra! 😕</div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Anatomias Patológicas</h3>
          {anats.length > 0 ? (
            anats.map((anat) => (
              <ul
                key={anat.id}
                className="w-full menu items-center text-left bg-base-200 rounded-box py-0 cursor-pointer"
              >
                <div className="divider my-0" />
                <Link className="w-full" href={`/anat/${anat.id}`}>
                  <li className="w-full">
                    <a>
                      <h2>{anat.name}</h2>
                    </a>
                  </li>
                </Link>
              </ul>
            ))
          ) : (
            <div>Não encontrei nenhuma anatomia patológica! 😕</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
