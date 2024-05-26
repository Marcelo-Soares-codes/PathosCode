"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AdminAuth = () => {
  const [token, setToken] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (authToken) {
      window.location.href = "/admin";
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/authenticateAdmin", { token });
      if (response.status === 200) {
        // Salvar o token no cookie por 1 hora
        Cookies.set("authToken", token, { expires: 1 / 24 });

        setShowSuccessPopup(true);
        setShowErrorPopup(false);
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setShowErrorPopup(true);
      setShowSuccessPopup(false);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    window.location.href = "/admin";
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-base-200 text-primary shadow-md rounded-3xl py-6 px-10"
      >
        <h2 className="text-2xl text-center font-bold mb-4">
          Autenticação do Admin
        </h2>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Token de Autenticação</span>
          </label>
          <input
            type="text"
            name="token"
            value={token}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-sans text-lg mt-4"
          >
            Autenticar
          </button>
        </div>
      </form>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl text-green-800 font-bold mb-4">Sucesso!</h3>
            <p className="text-green-800">Autenticação bem-sucedida.</p>
            <button
              className="btn btn-success mt-4"
              onClick={handleCloseSuccessPopup}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl text-red-800 font-bold mb-4">Erro!</h3>
            <p className="text-red-800">
              Falha na autenticação. Por favor, verifique o token e tente
              novamente.
            </p>
            <button
              className="btn btn-error mt-4"
              onClick={() => setShowErrorPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuth;
