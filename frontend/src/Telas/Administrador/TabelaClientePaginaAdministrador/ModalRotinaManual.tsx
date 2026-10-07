import { useState } from "react";
import "./ModalRotinaManual.css";

const API_URL = import.meta.env.VITE_API_URL;

type TipoRotina = "rotina_diaria" | "rotina_22h";

interface OpcaoRotina {
  tipo: TipoRotina;
  label: string;
  endpoint: string;
  descricao: string;
  emergencia?: boolean;
}

const OPCOES: OpcaoRotina[] = [
  {
    tipo: "rotina_diaria",
    label: "Rotina diária",
    endpoint: "/api/admin/rotina-diaria/executar",
    descricao:
      "Busca parcelas que vencem hoje e ainda não foram notificadas, gera Pix quando necessário e envia lembrete por WhatsApp. Use apenas se a rotina automática das 8h falhou.",
  },
  {
    tipo: "rotina_22h",
    label: "Rotina das 22h",
    endpoint: "/api/admin/rotina-22h/executar",
    descricao:
      "Aplica o acréscimo de R$12 nas parcelas vencidas hoje e ainda pendentes, gera novo Pix e avisa o cliente. Use apenas se a rotina automática das 22h falhou.",
    emergencia: true,
  },
];

interface ModalRotinaManualProps {
  aberto: boolean;
  onFechar: () => void;
}

export function ModalRotinaManual({ aberto, onFechar }: ModalRotinaManualProps) {
  const [selecionada, setSelecionada] = useState<OpcaoRotina | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  function resetarEFechar() {
    if (carregando) return; // não deixa fechar no meio da execução
    setSelecionada(null);
    setErro(null);
    setSucesso(null);
    onFechar();
  }

  function escolher(opcao: OpcaoRotina) {
    setErro(null);
    setSucesso(null);
    setSelecionada(opcao);
  }

  function voltar() {
    setSelecionada(null);
    setErro(null);
  }

  async function confirmar() {
    if (!selecionada) return;
    setCarregando(true);
    setErro(null);

    try {
      // ATENÇÃO: confirme se "admin_token" é a chave certa usada no login
      const token = localStorage.getItem("admin_token");

      const response = await fetch(`${API_URL}${selecionada.endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 429 || response.status === 403) {
        const dados = await response.json();
        setErro(dados.detail || "Não foi possível executar a rotina agora.");
        setCarregando(false);
        return;
      }

      if (response.status === 401) {
        setErro("Sessão expirada ou sem permissão. Faça login novamente.");
        setCarregando(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Falha ao iniciar rotina");
      }

      setSucesso("Rotina iniciada com sucesso.");
      setCarregando(false);
      setSelecionada(null);
    } catch (e) {
      setErro("Não foi possível conectar ao servidor. Tente novamente.");
      setCarregando(false);
    }
  }

  if (!aberto) return null;

  return (
    <div className="rotina-modal-overlay" onClick={resetarEFechar}>
      <div className="rotina-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rotina-modal__header">
          <h2>{selecionada ? selecionada.label : "Rodar rotina manual"}</h2>
          <button className="rotina-modal__fechar" onClick={resetarEFechar} disabled={carregando}>
            ×
          </button>
        </div>

        {sucesso && <div className="rotina-modal__aviso">{sucesso}</div>}

        {!selecionada && !sucesso && (
          <div className="rotina-modal__opcoes">
            {OPCOES.map((opcao) => (
              <button
                key={opcao.tipo}
                className={`rotina-modal__opcao ${opcao.emergencia ? "rotina-modal__opcao--emergencia" : ""}`}
                onClick={() => escolher(opcao)}
              >
                <strong>{opcao.label}</strong>
                <span>{opcao.descricao}</span>
              </button>
            ))}
          </div>
        )}

        {selecionada && (
          <>
            <button className="rotina-modal__voltar" onClick={voltar} disabled={carregando}>
              ← Escolher outra rotina
            </button>

            <div className="rotina-modal__corpo">
              <p>{selecionada.descricao}</p>
              <div className="rotina-modal__aviso">
                ⚠️ Envia mensagens reais para clientes. Só disponível novamente após 10
                minutos da última execução, e apenas dentro do horário permitido.
              </div>

              {erro && <div className="rotina-modal__erro">{erro}</div>}
            </div>

            <div className="rotina-modal__acoes">
              <button className="rotina-modal__btn-cancelar" onClick={resetarEFechar} disabled={carregando}>
                Cancelar
              </button>
              <button className="rotina-modal__btn-confirmar" onClick={confirmar} disabled={carregando}>
                {carregando ? "Executando..." : "Confirmar e rodar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}