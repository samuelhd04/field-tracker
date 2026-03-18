import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Inventario from "./pages/Inventario";
import Notas from "./pages/Notas";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Inventario" element={<Inventario />} />
                    <Route path="/Notas" element={<Notas />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
