"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import fetchSampleList from "@/lib/getSimple";
import { SampleType } from "@/DTOs/sample.DTO";

export const CardSamples = () => {
  const [samples, setSamples] = useState<SampleType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const sampleList = await fetchSampleList();
      setSamples(sampleList);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-full container mx-auto px-0">
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
        <div>Não encontrei nem uma amostra! 😕</div>
      )}
    </div>
  );
};
