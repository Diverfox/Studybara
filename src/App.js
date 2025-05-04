import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ModalProvider, SettingsProvider } from "./context/SettingsContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import DetalleMateria from "./components/DetalleMateria";

import "./styles/App.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ModalProvider>
          <Router>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/materias"
                  element={
                    <ProtectedRoute>
                      <Materias />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/materias/:id"
                  element={
                    <ProtectedRoute>
                      <DetalleMateria />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </ModalProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
