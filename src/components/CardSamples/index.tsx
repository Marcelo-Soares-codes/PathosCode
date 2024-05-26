"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import fetchSampleList from "@/lib/getSimple";
import { SampleType } from "@/DTOs/sample.DTO";
import { Trash2 } from "lucide-react";
import api from "@/utils/api";

interface CardSampleType {
  admin?: boolean;
  search?: string;
}

export const CardSamples = ({ search = "", admin = false }: CardSampleType) => {
  const [samples, setSamples] = useState<SampleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sampleToDelete, setSampleToDelete] = useState<SampleType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const sampleList = await fetchSampleList();
      setSamples(sampleList);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDeleteClick = (sample: SampleType) => {
    setSampleToDelete(sample);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (sampleToDelete) {
      const token = Cookies.get("authToken");
      try {
        await api.delete(`/sample/id=${sampleToDelete.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSamples(samples.filter((sample) => sample.id !== sampleToDelete.id));
        setShowDeleteConfirm(false);
        setSampleToDelete(null);
      } catch (error) {
        console.error("Erro ao deletar amostra:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSampleToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  const filteredSamples = !!search
    ? samples.filter((sample) => {
        const nameMatch =
          sample.name &&
          sample.name.toLowerCase().includes(search.toLowerCase());
        const descriptionMatch =
          sample.description &&
          sample.description.toLowerCase().includes(search.toLowerCase());

        return nameMatch || descriptionMatch;
      })
    : samples;

  return (
    <div className="w-full container mx-auto px-0">
      {filteredSamples.length > 0 ? (
        filteredSamples.map((sample) => (
          <ul
            key={sample.id}
            className="w-full menu items-center text-left bg-base-200 rounded-box py-0 cursor-pointer"
          >
            <div className="divider my-0" />
            <Link className="w-full" href={`/sample/${sample.id}`}>
              <li className="w-full">
                <a className="flex justify-between">
                  <h2>{sample.name}</h2>
                  {admin && (
                    <Trash2
                      size={18}
                      className="text-primary duration-200 hover:text-error"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(sample);
                      }}
                    />
                  )}
                </a>
              </li>
            </Link>
          </ul>
        ))
      ) : (
        <div className="min-h-96">Não encontrei nem uma amostra! 😕</div>
      )}

      {showDeleteConfirm && sampleToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-200 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir a amostra &quot;
              {sampleToDelete.name}&quot;?
            </p>
            <div className="flex justify-end mt-4">
              <button className="btn btn-error mr-2" onClick={confirmDelete}>
                Deletar
              </button>
              <button className="btn btn-outline" onClick={cancelDelete}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
