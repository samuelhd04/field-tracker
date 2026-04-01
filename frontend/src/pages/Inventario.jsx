import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Item from "../components/Item";

const Inventario = () => {
    const [items, setItems] = useState("");
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const { id: projectId } = useParams();

    const fetchInventario = async () => {
        const response = await fetch(`/api/getItems/proyecto/${projectId}`);
        const data = await response.json();

        if (response.ok) {
            setItems(data);
        }
    };

    const borrarItem = async (id) => {
        await fetch(`/api/borrarItem/${id}`, {
            method: "DELETE",
        });
        fetchInventario();
    };

    const postItem = async (e) => {
        e.preventDefault();

        await fetch(`/api/nuevoItem/proyecto/${projectId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, cantidad, projectId }),
        });

        fetchInventario();
    };

    useEffect(() => {
        fetchInventario();
    }, []);

    return (
        <div className="inventario">
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row mb-3">
                            <div className="col-md-6">Item</div>
                            <div className="col">Cantidad</div>
                            <div className="col"></div>
                        </div>

                        {items &&
                            items.map((item) => {
                                return (
                                    <Item
                                        key={item._id}
                                        item={item}
                                        borrarItem={borrarItem}
                                    />
                                );
                            })}
                    </div>

                    <div className="col-md-6">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form onSubmit={postItem}>
                                    <div className="mb-2">
                                        <label className="form-label">
                                            Item
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => {
                                                setNombre(e.target.value);
                                            }}
                                            value={nombre}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Cantidad
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={(e) => {
                                                setCantidad(e.target.value);
                                            }}
                                            value={cantidad}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventario;
