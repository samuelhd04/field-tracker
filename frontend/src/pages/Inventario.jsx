import { Link } from "react-router-dom";
import Herramienta from "../components/Herramienta";

const Inventario = () => {
    return (
        <div className="inventario">
            <h1>Inventario</h1>

            <nav>
                <Link to="/">Home</Link>
            </nav>

            <Herramienta />
        </div>
    );
};

export default Inventario;
