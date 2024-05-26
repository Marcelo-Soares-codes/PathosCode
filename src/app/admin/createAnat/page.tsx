"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AnatType } from "@/DTOs/anat.DTO";
import api from "@/utils/api";

const AnatForm = () => {
  const [anatData, setAnatData] = useState<
    Omit<AnatType, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    description: "",
    comments: "",
    executions: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!token) {
      window.location.href = "/admin/auth";
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAnatData({
      ...anatData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get("authToken");
      if (!token) {
        window.location.href = "/admin/auth";
        return;
      }

      const response = await api.post("/anat", anatData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowSuccessPopup(true);
      setAnatData({
        name: "",
        description: "",
        comments: "",
        executions: "",
      });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-neutral text-neutral-content shadow-md rounded-3xl py-6 px-10"
      >
        <h2 className="text-2xl text-center font-bold mb-4">
          Cadastrar Anatomia Patológica
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nome</span>
          </label>
          <input
            type="text"
            name="name"
            value={anatData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Descrição</span>
          </label>
          <textarea
            name="description"
            value={anatData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Comentários</span>
          </label>
          <textarea
            name="comments"
            value={anatData.comments}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Execuções</span>
          </label>
          <textarea
            name="executions"
            value={anatData.executions}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-sans text-lg  mt-4"
          >
            Cadastrar
          </button>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl text-green-800 font-bold mb-4">Sucesso!</h3>
            <p className="text-green-800">
              Os dados foram cadastrados com sucesso.
            </p>
            <button
              className="btn btn-success mt-4"
              onClick={() => setShowSuccessPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnatForm;
