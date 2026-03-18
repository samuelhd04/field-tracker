import { Link } from "react-router-dom";

const Notas = () => {
    return (
        <div className="notas">
            <h1>Notas</h1>

            <nav>
                <Link to="/">Home</Link>
            </nav>
        </div>
    );
};

export default Notas;
