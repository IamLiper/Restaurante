import { useState, useEffect } from 'react';
import axios from 'axios';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import './styles.css';

function ListaDePratos() {
  const [pratos, setPratos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();
  const API_URL = process.env.REACT_APP_API_URL || 'https://restaurante-backend-z0ek.onrender.com';

  useEffect(() => {
    const carregarPratos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/prato`);
        setPratos(response.data);
      } catch (error) {
        exibirMensagem('Erro ao buscar pratos: ' + error.message, 'erro');
        setPratos([]);
      } finally {
        setIsLoading(false);
      }
    };
    carregarPratos();
  }, [API_URL, exibirMensagem]);

  if (isLoading) return <div className="loading">Carregando...</div>;

  return (
    <>
      <div className="container-pratos">
        {pratos.length === 0 ? (
          <p>Nenhum prato encontrado.</p>
        ) : (
          pratos.map((prato) => (
            <div className="card-prato" key={prato.id}>
              {prato.url && (
                <img
                  src={prato.url}
                  alt={prato.nome}
                  className="img-prato"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <div className="info-prato">
                <h3>{prato.nome}</h3>
                <p><strong>Categoria:</strong> {prato.categoria}</p>
                <p><strong>Disponibilidade:</strong> {prato.disponibilidade}</p>
                <p><strong>Descrição:</strong> {prato.descricao}</p>
                <p><strong>Preço:</strong> R$ {prato.preco.toFixed(2)}</p>
                <p><strong>URL da Imagem:</strong> <a href={prato.url} target="_blank" rel="noreferrer">{prato.url}</a></p>
              </div>
            </div>
          ))
        )}
      </div>

      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onclose={fecharMensagem}
      />
    </>
  );
}

export default ListaDePratos;
