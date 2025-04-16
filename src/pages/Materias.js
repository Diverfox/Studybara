import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Materias = () => {
  const [user] = useAuthState(auth);
  const [materias, setMaterias] = useState([]);
  const navigate = useNavigate();

  // Escuchar las materias del usuario logueado en tiempo real
  useEffect(() => {
    if (!user) return;
  
    // Cambia 'default' a 'materias'
    const q = query(collection(db, "materias"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = [];
      snapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setMaterias(lista);
    });
  
    return () => unsubscribe(); // Limpieza
  }, [user]);

  // Crear nueva materia
  const crearMateria = async () => {
    const nombre = prompt("Nombre de la nueva materia:");
    if (!nombre || !user) return;

    const nueva = {
      nombre, // Usando el nombre ingresado por el usuario
      contenido: "<p>Contenido de la materia con <strong>formato</strong> <em>enriquecido</em></p>",
      notas: [],
      tareas: [],
      imagen: null,
      uid: user.uid, // Usando el UID del usuario logueado
      createdAt: new Date() // Usando la fecha actual
    };

    try {
      await addDoc(collection(db, "materias"), nueva);
      alert("Materia creada con éxito");
    } catch (error) {
      console.error("Error al crear materia:", error);
    }
  };

  return (
    <div className="materias-container">
      <h2 className="materias-title">Tus materias</h2>
      <button onClick={crearMateria} className="crear-materia-btn">
        ➕ Crear nueva materia
      </button>

      <div className="materias-grid">
        {materias.map((m) => (
          <div
            key={m.id}
            className="materia-card"
            onClick={() => navigate(`/materias/${m.id}`)}
          >
            <img
              src={m.imagen || "https://placehold.co/200x120?text=Sin+imagen"}
              alt="imagen materia"
              className="materia-img"
            />
            <h3>{m.nombre}</h3>
            <p>📝 {m.notas[0] || "Sin notas"}</p>
            <p>
              ✅ Tareas: {m.tareas.filter((t) => t.completada).length}/
              {m.tareas.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materias;
