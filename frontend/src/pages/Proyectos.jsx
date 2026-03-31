import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Proyecto from "../components/Proyecto";
import db from "../db";

const Home = () => {
    const [proyectos, setProyectos] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const fetchProyectos = async () => {
        const response = await fetch("/api/getProyectos");
        const data = await response.json();

        if (response.ok) {
            setProyectos(data);
        }
    };

    const postProyecto = async (e) => {
        e.preventDefault();

        await fetch("/api/nuevoProyecto", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion }),
        });

        fetchProyectos();
    };

    const borrarProyecto = async (id) => {
        await fetch(`/api/borrarProyecto/${id}`, {
            method: "DELETE",
        });
        fetchProyectos();
    };

    useEffect(() => {
        fetchProyectos();
    }, []);

    return (
        <div className="home">
            <NavBar />

            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <form onSubmit={postProyecto}>
                            <div className="row mb-2">
                                <div className="col-md-4">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }}
                                        value={nombre}
                                        required
                                    />
                                </div>

                                <div className="col d-flex justify-contents-start align-items-end">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Descripción
                                    </label>
                                    <textarea
                                        className="form-control"
                                        onChange={(e) => {
                                            setDescripcion(e.target.value);
                                        }}
                                        value={descripcion}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {proyectos &&
                        proyectos.map((proyecto) => {
                            return (
                                <Proyecto
                                    proyecto={proyecto}
                                    borrarProyecto={borrarProyecto}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Home;
