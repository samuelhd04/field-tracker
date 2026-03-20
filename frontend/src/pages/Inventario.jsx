//import Herramienta from "../components/Herramienta";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

const Inventario = () => {
    const [herramientas, setHerramientas] = useState(null);

    const fetchInventory = async () => {
        const response = await fetch("/api/getItems");
        const data = await response.json();

        if (response.ok) {
            setHerramientas(data);
        }
    };

    const borrarHerramienta = async (id) => {
        await fetch(`/api/borrarItem/${id}`, { method: "DELETE" });
    };

    useEffect(() => {
        fetchInventory();
    }, []);
    return (
        <div className="inventario">
            <NavBar />

            <main>
                <form action="">
                    <input type="text" />
                </form>
            </main>

            <div>
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
            </div>
        </div>
    );
};

export default Inventario;
