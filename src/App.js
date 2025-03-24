import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout"; // Nuevo componente

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Layout /> {/* Nuevo componente que manejará el fondo */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/materias" element={<Materias />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </SettingsProvider>
  );
}

export default App;
