import { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import capybaraGif from "../assets/images/coffee-bara-capybara.gif";


const Layout = ({ children }) => {
  const { background } = useContext(SettingsContext);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/assets/images/${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, [background]);

  return (
    <>
      <Sidebar />

      {/* Contenedor general con margen izquierdo para que no choque con el sidebar */}
      <div className="ml-12 flex flex-col items-center text-white">

        {/* Header centrado con logo y título grande */}
        <div className="layout-header">
          <img src={capybaraGif} alt="Logo Studybara" className="layout-logo" />
          <h1 className="layout-title">StudyBara</h1>
        </div>


        {/* Contenido principal, ya sea children o rutas */}
        <div className="w-full flex justify-center">
          {children ? children : <Outlet />}
        </div>
      </div>
    </>
  );
};

export default Layout;
