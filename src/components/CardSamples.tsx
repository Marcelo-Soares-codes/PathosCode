"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type ApiResponse = {
  success: boolean;
  status: number;
  sampleList: { id: number; name: string }[];
};

const fetchSampleList = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await axios.get<ApiResponse>(
      "http://localhost:3000/api/sample"
    );
    return response.data.sampleList;
  } catch (error) {
    console.error("Error fetching sample list:", error);
    return [];
  }
};

export const CardSamples = () => {
  const [samples, setSamples] = useState<{ id: number; name: string }[]>([]);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {samples.map((sample) => (
        <div
          key={sample.id}
          className="card w-96 bg-neutral text-neutral-content mb-4"
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">{sample.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
