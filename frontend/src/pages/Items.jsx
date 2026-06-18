import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import NavBar from "../components/NavBar";
import Item from "../components/Item";
import { getItems, postItem, deleteItem } from "../services/itemService";
import db from "../db";

const Items = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const { id: projectId } = useParams();
    const items = useLiveQuery(
        () => db.items.where("projectId").equals(projectId).reverse().toArray(),
        [projectId],
    );

    useEffect(() => {
        getItems(projectId);
    }, [projectId]);

    return (
        <div className="inventario">
            <NavBar
                name="Volver"
                getFunction={() => {
                    getItems(projectId);
                }}
            />
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
                                        deleteItem={deleteItem}
                                    />
                                );
                            })}
                    </div>

                    <div className="col-md-6">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();

                                        postItem({ name, quantity, projectId });
                                    }}
                                >
                                    <div className="mb-2">
                                        <label className="form-label">Item</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            value={name}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Cantidad</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                            value={quantity}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
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

export default Items;
