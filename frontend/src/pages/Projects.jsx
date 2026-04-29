import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import NavBar from "../components/NavBar";
import Project from "../components/Project";
import { getProjects, postProject, deleteProject } from "../services/projectService";
import db from "../db";

const Projects = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const projects = useLiveQuery(() => db.proyectos.toArray());

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

                                postProject({ name, description });
                            }}
                        >
                            <div className="row mb-2">
                                <div className="col-md-4">
                                    <label className="form-label">Nombre</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        value={name}
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
                                            setDescription(e.target.value);
                                        }}
                                        value={description}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {projects &&
                        projects.map((project) => {
                            return (
                                <Project
                                    key={project._id}
                                    project={project}
                                    deleteProject={deleteProject}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Projects;
