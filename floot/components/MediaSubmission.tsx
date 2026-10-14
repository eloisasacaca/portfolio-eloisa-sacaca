import React, { useState } from "react";
import { Button } from "./Button";
import styles from "./MediaSubmission.module.css";

const template = "Tipo: foto\nAno: \nTítulo: \nLegenda: \nDestaque: não";
export function MediaSubmission({ className }: { className?: string }) {
  const [feedback, setFeedback] = useState("");
  async function copyTemplate() {
    try { await navigator.clipboard.writeText(template); setFeedback("Modelo copiado. Cole junto do arquivo aqui no chat."); }
    catch { setFeedback("Selecione e copie o modelo abaixo para enviar no chat."); }
  }
  return <details className={styles.submission + (className ? " " + className : "")}>
    <summary>Enviar fotos e vídeos <span aria-hidden="true">＋</span></summary>
    <div className={styles.body}>
      <h3>Cadastre um novo registro nesta seção.</h3>
      <p>Envie o arquivo <strong>aqui na conversa do ChatGPT em que criamos o portfólio</strong>. Use o cartão de envio ou o botão <strong>＋</strong> ao lado da mensagem para anexar a foto ou o vídeo. Você também pode enviar um link.</p>
      <p>Junto do arquivo, informe o ano e a legenda. Para uma composição, escreva “Tipo: composição” e o título da música.</p>
      <pre>{template}</pre>
      <Button variant="outline" size="sm" onClick={copyTemplate}>Copiar modelo de envio</Button>
      <p className={styles.feedback} role="status">{feedback}</p>
      <p className={styles.note}>O assistente cadastra o material enviado. Os registros aparecem do ano mais antigo ao mais recente; as composições têm uma seção própria e podem receber destaque.</p>
    </div>
  </details>;
}
