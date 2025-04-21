import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext"; // Asegúrate de que AuthContext esté definido
import capybaraGif from "../assets/images/coffee-bara-capybara.gif";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext); // Obtén el usuario del contexto
  const location = useLocation();
  console.log(user); // Agrega esto para verificar el contenido del objeto user
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

  return (
    <>
      <Sidebar />
      <div className="ml-12 flex flex-col items-center text-white relative">
        <div className="layout-header">
          <img src={capybaraGif} alt="Logo Studybara" className="layout-logo" />
          <h1 className="layout-title">{getPageTitle(location.pathname)}</h1>

          {user ? (
            <div className="absolute top-4 right-8 flex items-center gap-2">
              <img
                src={user.photoURL} // Usa directamente el campo photoURL
                alt="Perfil"
                className="w-10 h-10 rounded-full"
              />
              <span>{user.displayName}</span>
            </div>
          ) : (
            <div className="absolute top-4 right-8">
              <span>No estás autenticado</span>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center">
          {children ? children : <Outlet />}
        </div>
      </div>
    </>
  );
};

export default Layout;
