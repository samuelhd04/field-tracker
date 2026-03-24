import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Proyecto from "../components/Proyecto";

const Home = () => {
    const [proyectos, setProyectos] = useState("");

    const fetchProyectos = async () => {
        const response = await fetch("/api/getProyectos");
        const data = await response.json();

        if (response.ok) {
            setProyectos(data);
        }
    };

    const borrarProyecto = async () => {};

    useEffect(() => {
        fetchProyectos();
    }, []);

    return (
        <div className="home">
            <NavBar />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        {proyectos &&
                            proyectos.map((proyecto) => {
                                return <Proyecto proyecto={proyecto} />;
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
