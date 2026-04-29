import { Link } from "react-router-dom";

const Project = ({ project, deleteProject }) => {
    return (
        <div className="col-lg-4">
            <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    {project.nombre}
                    <div className="d-flex">
                        <Link
                            to={`/Inventario/${project._id}`}
                            className="btn btn-secondary ms-auto me-2"
                        >
                            Inventario
                        </Link>
                        <Link
                            to={`/Notas/${project._id}`}
                            className="btn btn-secondary ms-auto me-2"
                        >
                            Notas
                        </Link>

                        <button
                            className="btn btn-danger btn-sm ms-auto"
                            onClick={() => {
                                deleteProject(project._id);
                            }}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-text">{project.descripcion}</div>
                </div>
            </div>
        </div>
    );
};

export default Project;
