const Nota = ({ nota, deleteNote }) => {
    return (
        <div className="card keep-card mb-4">
            <div className="card-header d-flex">
                {nota.nombre}
                <button
                    className="btn btn-danger btn-sm ms-auto"
                    onClick={() => {
                        deleteNote(nota._id);
                    }}
                >
                    <i className="bi bi-trash3-fill"></i>
                </button>
            </div>
            <div className="card-body">
                <div className="card-text">{nota.texto}</div>
            </div>
        </div>
    );
};

export default Nota;
