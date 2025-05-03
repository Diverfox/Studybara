import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Escribe aquí tus notas...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
          ],
        },
      });

      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        onChange?.(html);
      });

      // Establecer el valor inicial si existe
      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }

    // Si el valor externo cambia (por ejemplo, al cargar desde DB)
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value, onChange]);

  return (
    <div
      ref={editorRef}
      className="bg-white rounded-md shadow p-2 text-black"
    />
  );
}
