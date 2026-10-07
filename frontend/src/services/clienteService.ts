import type { Cliente } from "../types/cliente";
import type { StatusCobranca } from "../types/fatura";

export function filtrarClientes(
  clientes: Cliente[],
  termo: string
): Cliente[] {
  const t = termo.trim().toLowerCase();

  if (!t) return clientes;

  return clientes.filter(({ nome_completo }) =>
    nome_completo.toLowerCase().includes(t)
  );
}

export function getStatusClass(
  status: Cliente["status_cliente"] | StatusCobranca | string
): string {
  const map: Record<string, string> = {
    ATIVO: "status-ativo",
    INATIVO: "status-inativo",
    PENDENTE: "status-pendente",

    PAGO: "status-pago",
    ATRASADO: "status-atrasado",
    CANCELADO: "status-cancelado",
  };

  return map[status?.toUpperCase()] ?? "status-pendente";
}