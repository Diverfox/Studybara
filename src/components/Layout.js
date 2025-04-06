import { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { background } = useContext(SettingsContext);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/assets/images/${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, [background]);

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">
        <Outlet /> {/* Aquí se renderiza Home o Materias */}
      </div>
    </div>
  );
};

export default Layout;
