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
        
        for (let i = 1; i < lineas.length; i++) {
            const linea = lineas[i].trim();
            if (linea === "") continue;
            
            const datos = linea.split(',');
            if (datos.length >= 3) {
                try {
                    await addDoc(collection(db, "estudiantes"), {
                        "Cédula": datos[0].trim(),
                        "Apellidos": datos[1].trim(),
                        "Nombres": datos[2].trim(),
                        "Carrera": datos[3] ? datos[3].trim() : "Técnico en Sistemas"
                    });
                    contador++;
                } catch (error) {
                    errores++;
                }
            }
        }
        
        alert(`✅ Éxito! ${contador} registros cargados. Errores: ${errores}`);
        fileInput.value = '';
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
