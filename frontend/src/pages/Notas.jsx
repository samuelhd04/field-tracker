import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";

const Notas = () => {
    const [nombre, setNombre] = useState("");
    const [texto, setTexto] = useState("");

    return (
        <div className="notas">
            <NavBar />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form>
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
                                            setNombre(e.target.value);
                                        }}
                                        value={texto}
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row"></div>
            </div>
        </div>
    );
};

export default Notas;
