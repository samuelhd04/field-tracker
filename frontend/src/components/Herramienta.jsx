import { useState, useEffect } from "react";

const Herramienta = () => {
    const [herramientas, setHerramientas] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            const response = await fetch("/api/getItems");
            const data = await response.json();

            if (response.ok) {
                setHerramientas(data);
                console.log(data);
            }
        };

        fetchInventory();
    }, []);

    const borrarHerramienta = async (id) => {
        await fetch(`/api/borrarItem/${id}`, { method: "DELETE" });
    };

    return (
        <ul>
            {herramientas &&
                herramientas.map((herramienta) => {
                    return (
                        <li>
                            <span>{herramienta.nombre}</span>
                            <span>{herramienta.cantidad}</span>
                            <button
                                onClick={() => {
                                    borrarHerramienta(herramienta._id);
                                }}
                            >
                                Borrar
                            </button>
                        </li>
                    );
                })}
        </ul>
    );
};

export default Herramienta;
