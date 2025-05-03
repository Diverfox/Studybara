import React, { useContext, useState, useRef, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../context/SettingsContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import capybaraGif from "../assets/images/coffee-bara-capybara.gif";
import "../styles/Layout.css";
import OptionsModal from "../components/OptionsModal"; // Asegúrate de que la ruta sea correcta

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { showModal, setShowModal } = useModal(); // ✅ IMPORTA showModal TAMBIÉN

  const getPageTitle = (path) => {
    switch (path) {
      case "/":
        return "Studybara";
      case "/materias":
        return "Materias";
      default:
        return "Studybara";
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="ml-12 flex flex-col items-center text-white relative">
        <div className="layout-header">
          <img src={capybaraGif} alt="Logo Studybara" className="layout-logo" />
          <h1 className="layout-title">{getPageTitle(location.pathname)}</h1>

          {user ? (
            <div
              className="absolute top-4 right-8 flex items-center gap-2 relative"
              ref={menuRef}
            >
              <img
                src={user.photoURL}
                alt="Perfil"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              <span
                className="cursor-pointer hover:underline"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {user.displayName}
              </span>

              {menuOpen && (
                <div className="absolute top-12 right-0 bg-white text-black rounded shadow-md py-2 w-40 z-50">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false);
                      setShowModal(true);
                    }}
                  >
                    Opciones
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute top-4 right-8">
              <span>No estás autenticado</span>
            </div>
          )}

          {showModal && <OptionsModal onClose={() => setShowModal(false)} />}
        </div>

        <div className="w-full flex justify-center">
          {children ? children : <Outlet />}
        </div>
      </div>
    </>
  );
};

export default Layout;
