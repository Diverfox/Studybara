import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import QuillEditor from './QuillEditor'; // Importa QuillEditor
import { db } from "../firebase-config";

const DetalleMateria = () => {
  const { id } = useParams();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    const obtenerMateria = async () => {
      try {
        const docRef = doc(db, "materias", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMateria(data);
          setEditorValue(data.contenido); // Asumiendo que tienes un campo 'contenido'
        } else {
          console.log("No se encontró la materia");
        }
      } catch (error) {
        console.error("Error al obtener la materia:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerMateria();
  }, [id]);

  const actualizarMateria = async () => {
    try {
      const docRef = doc(db, "materias", id);
      await updateDoc(docRef, { contenido: editorValue }); // Guarda el contenido editado
      alert("Materia actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar la materia:", error);
    }
  };

  if (loading) return <p className="text-white">Cargando materia...</p>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-2">{materia.nombre}</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Contenido de la materia</h3>
        <QuillEditor 
          value={editorValue}
          onChange={setEditorValue}
        />
      </div>

      <button onClick={actualizarMateria} className="mt-2 bg-blue-500 px-3 py-1 rounded">
        ➕ Actualizar materia
      </button>
    </div>
  );
};

export default DetalleMateria;
