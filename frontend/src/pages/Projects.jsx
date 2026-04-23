import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import NavBar from "../components/NavBar";
import Proyecto from "../components/Project";
import { getProjects, postProject, deleteProject } from "../services/projectService";
import db from "../db";
//import { ObjectId } from "bson";

const Projects = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const datos = useLiveQuery(() => db.proyectos.toArray());

    /* const fetchProyectos = async () => {
        const response = await fetch("/api/getProyectos");
        const data = await response.json();

        if (response.ok) {
            await db.proyectos.bulkPut(data);
        }
    }; */

    /* const postProyecto = async (e) => {
        e.preventDefault();

        try {
            const doc = await fetch("/api/nuevoProyecto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, descripcion }),
            });

            const test = await doc.json();

            db.proyectos.add(test);
        } catch (error) {
            const newID = new ObjectId().toString();

            const objeto = {
                _id: newID,
                nombre: nombre,
                descripcion: descripcion,
            };

            db.proyectos.add(objeto);

            db.pendientes.add({
                objeto: objeto,
                tabla: "proyectos",
                tipo: "POST",
                ruta: "/api/nuevoProyecto",
                sincronizado: false,
            });
        }
    };

    const borrarProyecto = async (id) => {
        await fetch(`/api/borrarProyecto/${id}`, {
            method: "DELETE",
        });

        db.proyectos.delete(id);
    }; */

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="home">
            <NavBar />

            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                postProject({ nombre, descripcion });
                            }}
                        >
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
                                    <button type="submit" className="btn btn-primary">
                                        Enviar
                                    </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label className="form-label">Descripción</label>
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
                    {datos &&
                        datos.map((proyecto) => {
                            return (
                                <Proyecto
                                    key={proyecto._id}
                                    proyecto={proyecto}
                                    borrarProyecto={deleteProject}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Projects;
