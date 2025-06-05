import './styles.css';

function MensagemFeedback({ mensagem, tipo, visivel, onclose }) {
  if (!visivel) return null;

  return (
    <div
      id="mensagem"
      className={`mensagem ${tipo} visivel`}
      role="alert"
      onClick={onclose}
    >
      {mensagem}
    </div>
  );
}

export default MensagemFeedback;