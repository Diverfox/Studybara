import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import { AuthProvider } from "./context/AuthContext"; // Importa AuthProvider
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import DetalleMateria from "./components/DetalleMateria";
import "./styles/App.css";

function App() {
  return (
    <SettingsProvider>
      <AuthProvider> {/* Asegúrate de envolver toda la aplicación con AuthProvider */}
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/materias" element={<Materias />} />
              <Route path="/materias/:id" element={<DetalleMateria />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;