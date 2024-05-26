"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AnatType } from "@/DTOs/anat.DTO";
import fetchAnatList from "@/lib/getAnat";
import { Trash2 } from "lucide-react";
import api from "@/utils/api";

interface CardAnatsType {
  admin?: boolean;
}

export const CardAnats = ({ admin = false }: CardAnatsType) => {
  const [anats, setAnats] = useState<AnatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [anatToDelete, setAnatToDelete] = useState<AnatType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const anatList = await fetchAnatList();
      setAnats(anatList);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDeleteClick = (anat: AnatType) => {
    setAnatToDelete(anat);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (anatToDelete) {
      const token = Cookies.get("authToken");
      try {
        await api.delete(`/anat/id=${anatToDelete.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnats(anats.filter((anat) => anat.id !== anatToDelete.id));
        setShowDeleteConfirm(false);
        setAnatToDelete(null);
      } catch (error) {
        console.error("Erro ao deletar anatomia patológica:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setAnatToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="w-full container mx-auto px-0">
      {anats.length > 0 ? (
        anats.map((anat) => (
          <ul
            key={anat.id}
            className="w-full menu items-center text-left bg-base-200 rounded-box py-0 cursor-pointer"
          >
            <div className="divider my-0" />
            <li className="w-full">
              <a className="flex justify-between">
                <h2>{anat.name}</h2>
                {admin && (
                  <Trash2
                    size={18}
                    className="text-primary duration-200 hover:text-error"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteClick(anat);
                    }}
                  />
                )}
              </a>
            </li>
          </ul>
        ))
      ) : (
        <div>Não encontrei nem uma anato patologia! 😕</div>
      )}

      {showDeleteConfirm && anatToDelete && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-base-200 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p>
              Tem certeza que deseja excluir a anatomia patológica &quot;
              {anatToDelete.name}&quot;?
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
