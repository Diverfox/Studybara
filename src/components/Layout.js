import { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import fondoChill from "../assets/images/fondochill.jpg";


const Layout = () => {
  const { background } = useContext(SettingsContext);

  useEffect(() => {
    document.body.style.backgroundImage = `url(/assets/images/${background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, [background]);
  
  

  return <></>; // No renderiza nada visible, solo cambia el fondo
};

export default Layout;
