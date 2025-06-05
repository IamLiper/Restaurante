import { useState } from 'react';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import logo from '../../assets/images/logo.png';
import axios from 'axios';
import './styles.css';

function FormularioCadastro() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [url, setUrl] = useState('');
  const { exibirMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();
  const API_URL = process.env.REACT_APP_API_URL || 'https://restaurante-backend-z0ek.onrender.com';

  const cadastrarPrato = async () => {
    if (!nome.trim()) {
      exibirMensagem('O nome é obrigatório.', 'erro');
      return;
    }
    if (!categoria) {
      exibirMensagem('A categoria deve ser selecionado.', 'erro');
      return;
    }
    if (!disponibilidade) {
      exibirMensagem('A disponibilidade deve ser selecionada.', 'erro');
      return;
    }
    if (!descricao.trim()) {
      exibirMensagem('A descrição é obrigatório.', 'erro');
      return;
    }
    if (isNaN(preco) || preco <= 0) {
      exibirMensagem('O preço deve ser um número positivo.', 'erro');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/prato`, {
        nome,
        categoria,
        disponibilidade,
        descricao,
        preco: Number(preco),
        url,
      });
      exibirMensagem(response.data.mensagem || 'Prato cadastrado com sucesso!', 'sucesso');
      setNome('');
      setCategoria('');
      setDisponibilidade('');
      setDescricao('');
      setPreco('');
      setUrl('');
    } catch (error) {
      let erroMsg = 'Erro ao conectar ao servidor.';
      if (error.response && error.response.data) {
        erroMsg = error.response.data.mensagem;
        if (error.response.data.erros) {
          erroMsg += ' ' + Object.values(error.response.data.erros).join(', ');
        }
      }
      exibirMensagem(erroMsg, 'erro');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo da empresa" />
      <h2>Cadastro de Pratos</h2>
      <form onSubmit={(e) => { e.preventDefault(); cadastrarPrato(); }}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecione a categoria</option>
          <option value="ENTRADA">Entrada</option>
          <option value="PRATO_PRINCIPAL">Prato Principal</option>
          <option value="SOBREMESA">Sobremesa</option>
          <option value="BEBIDA">Bebida</option>
        </select>
        <select
          id="disponibilidade"
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          required
        >
          <option value="">Selecione a disponibilidade</option>
          <option value="EM_ESTOQUE">Em estoque</option>
          <option value="ESGOTADO">Esgotado</option>
        </select>
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          id="descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <label htmlFor="preco">Preço</label>
        <input
          type="number"
          id="preco"
          placeholder="Preço"
          value={preco}A
          onChange={(e) => setPreco(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <label htmlFor="url">Url</label>
        <input
          type="text"
          id="url"
          placeholder="Url da Imagem"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <MensagemFeedback
        mensagem={mensagem}
        tipo={tipoMensagem}
        visivel={visivel}
        onclose={fecharMensagem}
      />
    </div>
  );
}

export default FormularioCadastro;