"use client";

import { useEffect, useState } from "react";
import fetchSampleById from "@/lib/getSimpleById";
import fetchAnatById from "@/lib/getAnatById";
import { SampleType } from "@/DTOs/sample.DTO";
import { AnatType } from "@/DTOs/anat.DTO";

const Sample = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [sample, setSample] = useState<SampleType | null>(null);
  const [anat, setAnat] = useState<AnatType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const sample = await fetchSampleById(id as string);
        setSample(sample);

        const anat = await fetchAnatById(sample.anatId as string);
        setAnat(anat);

        setLoading(false);
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sample || !anat) {
    return <div>Amostra não encontrada!</div>;
  }

  return (
    <main className="flex flex-wrap min-h-screen justify-center items-center px-4 py-16">
      <div className="flex flex-col items-center w-full md:w-1/2 p-2">
        <h2 className="font-sans font-bold text-3xl mb-3">AMOSTRA</h2>
        <div className="card w-full min-h-96 bg-neutral text-neutral-content">
          <div className="flex flex-col card-body justify-center items-center text-center">
            <h2 className="card-title">{sample.name}</h2>
            <div className="flex flex-col md:flex-row w-full">
              {sample.description && (
                <div className="w-full md:w-1/2 p-2">
                  <h2 className="font-sans font-bold text-2xl mb-3">
                    Descrição
                  </h2>
                  <div className="card bg-neutral text-neutral-content">
                    <div className="card-body">
                      <p>{sample.description}</p>
                    </div>
                  </div>
                </div>
              )}
              {sample.shipping && (
                <div className="w-full md:w-1/2 p-2">
                  <h2 className="font-sans font-bold text-2xl mb-3">
                    Transporte
                  </h2>
                  <div className="card bg-neutral text-neutral-content">
                    <div className="card-body">
                      <p>{sample.shipping}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/2 p-2 mt-10 md:mt-0">
        <h2 className="font-sans font-bold text-3xl mb-3">
          Anatomia patológica
        </h2>
        <div className="card w-full min-h-96 bg-neutral text-neutral-content">
          <div className="lex flex-col card-body justify-center items-center text-center">
            <h2 className="card-title">{anat.name}</h2>
            <div className="flex flex-col md:flex-row w-full">
              {anat.description && (
                <div className="w-full md:w-1/2 p-2">
                  <h2 className="font-sans font-bold text-2xl mb-3">
                    Descrição
                  </h2>
                  <div className="card bg-neutral text-neutral-content">
                    <div className="card-body">
                      <p>{anat.description}</p>
                    </div>
                  </div>
                </div>
              )}
              {anat.comments && (
                <div className="w-full md:w-1/2 p-2">
                  <h2 className="font-sans font-bold text-2xl mb-3">
                    Observações
                  </h2>
                  <div className="card bg-neutral text-neutral-content">
                    <div className="card-body">
                      <p>{anat.comments}</p>
                    </div>
                  </div>
                </div>
              )}
              {anat.executions && (
                <div className="w-full md:w-1/2 p-2">
                  <h2 className="font-sans font-bold text-2xl mb-3">
                    Execuções
                  </h2>
                  <div className="card bg-neutral text-neutral-content">
                    <div className="card-body">
                      <p>{anat.executions}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sample;
