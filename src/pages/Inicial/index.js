import logo from '../../assets/images/logo.png';
import './styles.css';

function PaginaInicial() {return (
    <div className="pagina-inicial">
      <div className="container">
        <img src={logo} alt="Logo da empresa" />
        <h2>Página Inicial</h2>
        <p>Bem-vindo ao sistema de gerenciamento de restaurante!</p>
      </div>
    </div>
  );
}

export default PaginaInicial;