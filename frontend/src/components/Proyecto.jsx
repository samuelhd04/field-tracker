import { Link } from "react-router-dom";

const Proyecto = ({ proyecto }) => {
    return (
        <div className="card y mb-4">
            <div className="card-header d-flex">
                {proyecto.nombre}

                <Link
                    to={`/inventario/${proyecto._id}`}
                    className="btn btn-primary"
                >
                    Ver Inventario
                </Link>
            </div>
            <div className="card-body">
                <div className="card-text">{proyecto.descripcion}</div>
            </div>
        </div>
    );
};

export default Proyecto;
