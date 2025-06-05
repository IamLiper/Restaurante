import { useState, useCallback, useEffect } from 'react';

function useMensagem() {
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');
  const [visivel, setVisivel] = useState(false);

  const exibirMensagem = useCallback((texto, tipo = 'sucesso') => {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setVisivel(true);
  }, []);

  const fecharMensagem = useCallback(() => {
    setVisivel(false);
  }, []);

  useEffect(() => {
    if (visivel) {
      const timer = setTimeout(() => setVisivel(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [visivel]);

  return { mensagem, tipoMensagem, visivel, exibirMensagem, fecharMensagem };
}

export default useMensagem;