import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import QuillEditor from './QuillEditor';
import { db } from "../firebase-config";
import "../styles/Materias.css";

const DetalleMateria = () => {
  const { id } = useParams();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorValue, setEditorValue] = useState("");

  const [nuevaNota, setNuevaNota] = useState("");
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: "", descripcion: "", fechaEntrega: "" });

  useEffect(() => {
    const obtenerMateria = async () => {
      try {
        const docRef = doc(db, "materias", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMateria(data);
          setEditorValue(data.contenido || "");
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

  const actualizarContenido = async () => {
    try {
      const docRef = doc(db, "materias", id);
      await updateDoc(docRef, { contenido: editorValue });
      alert("Contenido actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar la materia:", error);
    }
  };

  const agregarNota = async () => {
    if (!nuevaNota.trim()) return;
    const nuevasNotas = [...(materia.notas || []), nuevaNota];
    await updateDoc(doc(db, "materias", id), { notas: nuevasNotas });
    setMateria(prev => ({ ...prev, notas: nuevasNotas }));
    setNuevaNota("");
  };

  const agregarTarea = async () => {
    if (!nuevaTarea.titulo.trim()) return;
    const nuevasTareas = [...(materia.tareas || []), { ...nuevaTarea, completada: false }];
    await updateDoc(doc(db, "materias", id), { tareas: nuevasTareas });
    setMateria(prev => ({ ...prev, tareas: nuevasTareas }));
    setNuevaTarea({ titulo: "", descripcion: "", fechaEntrega: "" });
  };

  const marcarCompletada = async (index) => {
    const nuevas = [...materia.tareas];
    nuevas[index].completada = !nuevas[index].completada;
    await updateDoc(doc(db, "materias", id), { tareas: nuevas });
    setMateria(prev => ({ ...prev, tareas: nuevas }));
  };

  if (loading) return <p className="text-white">Cargando materia...</p>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-2">{materia.nombre}</h2>

      {/* Editor */}
      <h3 className="text-lg font-semibold mt-4">Contenido de la materia</h3>
      <QuillEditor value={editorValue} onChange={setEditorValue} />
      <button onClick={actualizarContenido} className="mt-2 bg-blue-500 px-3 py-1 rounded">💾 Guardar contenido</button>

      {/* Notas */}
      <h3 className="text-lg font-semibold mt-6">Notas</h3>
      <ul className="list-disc list-inside mb-2">
        {(materia.notas || []).map((n, i) => <li key={i}>{n}</li>)}
      </ul>
      <input
        type="text"
        value={nuevaNota}
        onChange={(e) => setNuevaNota(e.target.value)}
        placeholder="Escribe una nota..."
        className="text-black p-1 rounded mr-2"
      />
      <button onClick={agregarNota} className="bg-green-600 px-2 py-1 rounded">➕ Añadir nota</button>

      {/* Tareas */}
      <h3 className="text-lg font-semibold mt-6">Tareas</h3>
      <ul className="mb-2">
        {(materia.tareas || []).map((t, i) => (
          <li key={i} className="mb-1">
            <label>
              <input type="checkbox" checked={t.completada} onChange={() => marcarCompletada(i)} className="mr-2" />
              <strong>{t.titulo}</strong> - {t.descripcion} ({t.fechaEntrega})
            </label>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={nuevaTarea.titulo}
        onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
        placeholder="Título"
        className="text-black p-1 rounded mr-1"
      />
      <input
        type="text"
        value={nuevaTarea.descripcion}
        onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
        placeholder="Descripción"
        className="text-black p-1 rounded mr-1"
      />
      <input
        type="date"
        value={nuevaTarea.fechaEntrega}
        onChange={(e) => setNuevaTarea({ ...nuevaTarea, fechaEntrega: e.target.value })}
        className="text-black p-1 rounded mr-1"
      />
      <button onClick={agregarTarea} className="bg-yellow-600 px-2 py-1 rounded">📝 Añadir tarea</button>
    </div>
  );
};

export default DetalleMateria;
