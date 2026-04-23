import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Items from "./pages/Items";
import Notes from "./pages/Notes";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Projects />} />
                    <Route path="/items/:id" element={<Items />} />
                    <Route path="/notes/:id" element={<Notes />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
