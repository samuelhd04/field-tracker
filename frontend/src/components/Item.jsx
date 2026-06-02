const Item = ({ item, deleteItem }) => {
    return (
        <div className="row mb-3">
            <div className="col-md-6">{item.nombre}</div>
            <div className="col">{item.cantidad}</div>
            <div className="col">
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        deleteItem(item._id);
                    }}
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default Item;
