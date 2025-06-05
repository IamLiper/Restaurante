import ListaDePratos from '../../components/ListaDePratos';
import './styles.css';

function PaginaListaPratos() {
  return (
    <div className="pagina-lista-pratos">
      <div className="container">
        <h2>Lista de Pratos</h2>
        <ListaDePratos />
      </div>
    </div>
  );
}

export default PaginaListaPratos;