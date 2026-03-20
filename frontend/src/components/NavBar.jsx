//import "../styles/navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/Inventario">
                            Inventario
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/Notas">
                            Notas
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
