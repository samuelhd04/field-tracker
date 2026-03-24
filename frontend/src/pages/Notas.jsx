import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Nota from "../components/Nota";

const Notas = () => {
    const [notas, setNotas] = useState("");
    const [nombre, setNombre] = useState("");
    const [texto, setTexto] = useState("");
    const { id: projectId } = useParams();

    const fetchNotas = async () => {
        const response = await fetch(`/api/getNotas/proyecto/${projectId}`);
        const data = await response.json();

        if (response.ok) {
            setNotas(data);
        }
    };

    const borrarNota = async (id) => {
        await fetch(`/api/borrarNota/${id}`, { method: "DELETE" });
        fetchNotas();
    };

    const postNota = async (e) => {
        e.preventDefault();

        await fetch(`/api/nuevaNota/proyecto/${projectId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, texto, projectId }),
        });

        fetchNotas();
    };

    useEffect(() => {
        fetchNotas();
    }, []);

    return (
        <div className="notas">
            <NavBar />

            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <form onSubmit={postNota}>
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
                                    <label className="form-label">Texto</label>
                                    <textarea
                                        className="form-control"
                                        required
                                        onChange={(e) => {
                                            setTexto(e.target.value);
                                        }}
                                        value={texto}
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-9">
                        {notas &&
                            notas.map((nota) => {
                                return (
                                    <Nota nota={nota} borrarNota={borrarNota} />
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notas;
