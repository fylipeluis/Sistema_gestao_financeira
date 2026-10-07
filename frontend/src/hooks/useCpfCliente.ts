import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useCpfCliente() {
  const [cpf, setCpf] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cpfSalvo = localStorage.getItem("cpfCliente");
    if (!cpfSalvo) {
      navigate("/login");
    } else {
      setCpf(cpfSalvo);
    }
  }, [navigate]);

  function salvarCpf(novoCpf: string) {
    localStorage.setItem("cpfCliente", novoCpf);
    setCpf(novoCpf);
  }

  function limparCpf() {
    localStorage.removeItem("cpfCliente");
    setCpf(null);
  }

  return { cpf, salvarCpf, limparCpf };
}
