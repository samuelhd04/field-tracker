import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import NavBar from "../components/NavBar";
import Nota from "../components/Note";
import { getNotes, postNote, deleteNote } from "../services/noteService";
import db from "../db";

const Notes = () => {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const { id: projectId } = useParams();
    const notas = useLiveQuery(
        () => db.notas.where("projectId").equals(projectId).toArray(),
        [projectId],
    );

    useEffect(() => {
        getNotes(projectId);
    }, [projectId]);

    return (
        <div className="notas">
            <NavBar
                name="Volver"
                getFunction={() => {
                    getItems(projectId);
                }}
            />

            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                postNote({ name, text, projectId });
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
                                    <label className="form-label">Texto</label>
                                    <textarea
                                        className="form-control"
                                        required
                                        onChange={(e) => {
                                            setText(e.target.value);
                                        }}
                                        value={text}
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
                                    <Nota
                                        key={nota._id}
                                        nota={nota}
                                        deleteNote={deleteNote}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
