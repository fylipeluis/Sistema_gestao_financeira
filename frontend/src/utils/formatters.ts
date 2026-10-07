export function formatarData(data: string): string {
  const date = new Date(data);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatarCNPJ(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function formatarDocumento(documento: string): string {
  // Remove caracteres especiais
  const apenasNumeros = documento.replace(/\D/g, "");

  if (apenasNumeros.length === 11) {
    return formatarCPF(apenasNumeros);
  } else if (apenasNumeros.length === 14) {
    return formatarCNPJ(apenasNumeros);
  }

  return documento;
}

export function determinarStatusParcela(
  dataVencimento?: string,
  statusAtual?: string
): string {
  // Se status explícito, usar esse
  if (statusAtual && statusAtual.toUpperCase() !== "PENDENTE") {
    return statusAtual.toUpperCase();
  }

  // Se não tem data de vencimento, é pendente
  if (!dataVencimento) {
    return "PENDENTE";
  }

  // Comparar com data atual
  const hoje = new Date();
  const vencimento = new Date(dataVencimento);

  if (vencimento < hoje) {
    return "ATRASADO";
  }

  return "PENDENTE";
}
