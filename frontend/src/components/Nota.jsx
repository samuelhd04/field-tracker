const Nota = ({ nota, borrarNota }) => {
    return (
        <div className="card y mb-4">
            <div className="card-header d-flex">
                {nota.nombre}
                <button
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={() => {
                        borrarNota(nota._id);
                    }}
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
            <div className="card-body">
                <div className="card-text">{nota.texto}</div>
            </div>
        </div>
    );
};

export default Nota;
