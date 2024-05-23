"use client";

import { useState, useEffect } from "react";
import { SampleType } from "@/DTOs/sample.DTO";
import { AnatType } from "@/DTOs/anat.DTO";
import api from "@/utils/api";

const SampleForm = () => {
  const [sampleData, setSampleData] = useState<
    Omit<SampleType, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    description: "",
    shipping: "",
    anatId: "",
  });

  const [anats, setAnats] = useState<AnatType[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchAnats = async () => {
      try {
        const response = await api.get("/anat");
        setAnats(response.data.anatList);
        console.log(anats);
      } catch (error) {
        console.error("Erro ao buscar anatomias:", error);
      }
    };

    fetchAnats();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSampleData({
      ...sampleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = "mlkXsusAyzUo0nX8Bj18KYxWe59YDB7B"; // Substitua pelo seu token de autorização

    try {
      const response = await api.post("/sample", sampleData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowSuccessPopup(true);
      setSampleData({
        name: "",
        description: "",
        shipping: "",
        anatId: "",
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
          Cadastrar Amostra
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Nome</span>
          </label>
          <input
            type="text"
            name="name"
            value={sampleData.name}
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
            value={sampleData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Transporte</span>
          </label>
          <textarea
            name="shipping"
            value={sampleData.shipping}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Anatomia Patológica</span>
          </label>
          <select
            name="anatId"
            value={sampleData.anatId}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Selecione uma Anatomia Patológica
            </option>
            {anats.map((anat) => (
              <option key={anat.id} value={anat.id}>
                {anat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-sans text-lg mt-4"
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

export default SampleForm;
