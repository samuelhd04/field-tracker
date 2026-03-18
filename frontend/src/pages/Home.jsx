import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <h1>Home</h1>

            <nav>
                <Link to="/Inventario">Inventario | </Link>
                <Link to="/Notas">Notas</Link>
            </nav>
        </div>
    );
};

export default Home;
