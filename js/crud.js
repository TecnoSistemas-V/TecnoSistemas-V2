import { db } from './conexion.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.procesarArchivo = async function() {
    const fileInput = document.getElementById('csv-file');
    
    if (!fileInput.files[0]) {
        alert("⚠️ Por favor, selecciona un archivo CSV");
        return;
    }

    const reader = new FileReader();
    reader.readAsText(fileInput.files[0]);
    
    reader.onload = async (e) => {
        const lineas = e.target.result.split('\n');
        let contador = 0;
        let errores = 0;
        
        // Saltamos la primera línea (encabezados)
        for (let i = 1; i < lineas.length; i++) {
            const linea = lineas[i].trim();
            if (linea === "") continue;
            
            const datos = linea.split(',');
            if (datos.length >= 6) {
                try {
                    await addDoc(collection(db, "estudiantes"), {
                        "Cédula": datos[0].trim(),
                        "Apellido": datos[1].trim(),
                        "Nombre": datos[2].trim(),
                        "Carrera": datos[3].trim(),
                        "Sección": datos[4].trim(),
                        "Dirección": datos[5].trim()
                    });
                    contador++;
                } catch (error) {
                    console.error("Error al guardar:", error);
                    errores++;
                }
            } else {
                console.warn(`Línea ${i} ignorada: no tiene suficientes campos`);
            }
        }
        
        alert(`✅ Éxito! ${contador} registros cargados. Errores: ${errores}`);
        fileInput.value = '';
    };
    
    reader.onerror = () => {
        alert("❌ Error al leer el archivo");
    };
};

window.vaciarTodo = async function() {
    if (!confirm("⚠️ ¿Seguro que quieres borrar TODOS los registros?")) return;
    
    const snap = await getDocs(collection(db, "estudiantes"));
    let contador = 0;
    
    for (const d of snap.docs) {
        await deleteDoc(doc(db, "estudiantes", d.id));
        contador++;
    }
    
    alert(`🗑️ Se eliminaron ${contador} registros.`);
};
