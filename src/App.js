import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";
import Layout from "./components/Layout";  // Importa Layout
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import "./styles/App.css"; // Asegúrate de importar el CSS

function App() {

  console.log("App cargada");
  return (
    <SettingsProvider>
      <Router>
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/materias" element={<Materias />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
</SettingsProvider>

  );
}

export default App;
