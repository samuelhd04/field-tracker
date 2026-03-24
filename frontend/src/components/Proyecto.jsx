import { Link } from "react-router-dom";

const Proyecto = ({ proyecto }) => {
    return (
        <div className="card mb-4">
            <div className="card-header d-flex">
                {proyecto.nombre}
                <Link to={`/Inventario/${proyecto._id}`}>Inventario</Link>
                <Link to={`/Notas/${proyecto._id}`}>Notas</Link>
            </div>
            <div className="card-body">
                <div className="card-text">{proyecto.descripcion}</div>
            </div>
        </div>
    );
};

export default Proyecto;
