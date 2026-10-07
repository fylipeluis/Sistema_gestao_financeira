import { useState } from "react";
import { ModalRotinaManual } from "./ModalRotinaManual";
import "./BotaoEnviarMensagem.css";

export function BotaoEnviarMensagem() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <button className="mensagem-botao-gatilho" onClick={() => setModalAberto(true)}>
        Enviar mensagem
      </button>

      <ModalRotinaManual aberto={modalAberto} onFechar={() => setModalAberto(false)} />
    </>
  );
}