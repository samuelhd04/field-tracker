import { Link } from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-sm keep-white keep-border mb-3">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            {props.name}
                        </Link>
                    </li>
                </ul>

                <button classname="btn btn-primary" onClick={() => props.getFunction()}>
                    Sincronizar
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
