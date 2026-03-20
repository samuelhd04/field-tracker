import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Item from "../components/Item";

const Inventario = () => {
    const [items, setItems] = useState(null);

    const fetchInventario = async () => {
        const response = await fetch("/api/getItems");
        const data = await response.json();

        if (response.ok) {
            setItems(data);
        }
    };

    const borrarItem = async (id) => {
        await fetch(`/api/borrarItem/${id}`, { method: "DELETE" });
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
                                    <Item item={item} borrarItem={borrarItem} />
                                );
                            })}
                    </div>

                    <div className="col-md-6">
                        <form>
                            <div className="mb-3">
                                <label for="nombre" className="form-label">
                                    Item
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <label for="cantidad" className="form-label">
                                    Cantidad
                                </label>
                                <input
                                    type="text"
                                    id="cantidad"
                                    className="form-control"
                                />
                            </div>

                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventario;
