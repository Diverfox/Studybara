import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import "./styles/App.css"; // Asegúrate de importar el CSS

function App() {
  return (
    <SettingsProvider>
      <Router>
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
