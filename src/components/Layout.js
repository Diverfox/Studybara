import { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";

const Layout = () => {
  const { background } = useContext(SettingsContext);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/backgrounds/${background})`;
  }, [background]);

  return <></>; // No renderiza nada visible, solo cambia el fondo
};

export default Layout;
