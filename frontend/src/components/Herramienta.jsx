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

    return (
        <ul>
            {herramientas &&
                herramientas.map((herramienta) => {
                    return (
                        <li>
                            <span>{herramienta.nombre}</span>
                            <span>{herramienta.cantidad}</span>
                        </li>
                    );
                })}
        </ul>
    );
};

export default Herramienta;
