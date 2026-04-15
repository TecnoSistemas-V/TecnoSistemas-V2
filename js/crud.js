import { db } from './conexion.js';
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- Función para mostrar/ocultar el progreso ---
function mostrarProgreso(mostrar, mensaje = "Procesando...") {
    let progressDiv = document.getElementById('progress-indicator');
    if (!progressDiv) {
        // Si no existe el div de progreso, lo creamos e insertamos justo después del input file
        const fileInput = document.getElementById('csv-file');
        if (fileInput && fileInput.parentNode) {
            progressDiv = document.createElement('div');
            progressDiv.id = 'progress-indicator';
            progressDiv.style.cssText = 'margin-top: 15px; padding: 10px; background: #e8f4fd; border-radius: 8px; text-align: center; font-weight: bold; color: #003366;';
            fileInput.parentNode.insertBefore(progressDiv, fileInput.nextSibling);
        } else {
            return;
        }
    }

    if (mostrar) {
        progressDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                <div class="spinner" style="border: 3px solid #f3f3f3; border-top: 3px solid #003366; border-radius: 50%; width: 20px; height: 20px; animation: spin 1s linear infinite;"></div>
                <span>${mensaje}</span>
            </div>
            <div id="progress-bar-container" style="width: 100%; background-color: #ddd; border-radius: 5px; margin-top: 8px; display: none;">
                <div id="progress-bar" style="width: 0%; height: 8px; background-color: #28a745; border-radius: 5px; transition: width 0.3s;"></div>
            </div>
            <div id="progress-text" style="font-size: 12px; margin-top: 5px;"></div>
        `;
        progressDiv.style.display = 'block';
        // Añadir la animación del spinner si no existe
        if (!document.querySelector('style[data-spinner]')) {
            const style = document.createElement('style');
            style.setAttribute('data-spinner', 'true');
            style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }
    } else {
        if (progressDiv) progressDiv.style.display = 'none';
    }
}

function actualizarProgreso(porcentaje, texto) {
    const barContainer = document.getElementById('progress-bar-container');
    const bar = document.getElementById('progress-bar');
    const textSpan = document.getElementById('progress-text');
    if (barContainer) barContainer.style.display = 'block';
    if (bar) bar.style.width = `${porcentaje}%`;
    if (textSpan) textSpan.innerText = texto;
}

// --- Función para procesar y subir el archivo CSV ---
window.procesarArchivo = async function() {
    const fileInput = document.getElementById('csv-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("⚠️ Por favor, selecciona un archivo CSV");
        return;
    }

    mostrarProgreso(true, `📖 Leyendo archivo: ${file.name}...`);

    const reader = new FileReader();
    reader.readAsText(file);
    
    reader.onload = async (e) => {
        const lineas = e.target.result.split('\n');
        // Filtramos líneas vacías y el encabezado (asumiendo que la línea 0 es el encabezado)
        let datosValidos = [];
        for (let i = 1; i < lineas.length; i++) {
            const linea = lineas[i].trim();
            if (linea !== "") {
                const campos = linea.split(',');
                if (campos.length >= 6) {
                    datosValidos.push({
                        "Cédula": campos[0].trim(),
                        "Apellido": campos[1].trim(),
                        "Nombre": campos[2].trim(),
                        "Carrera": campos[3].trim(),
                        "Sección": campos[4].trim(),
                        "Dirección": campos[5].trim()
                    });
                } else {
                    console.warn(`Línea ${i+1} ignorada: no tiene 6 columnas.`);
                }
            }
        }

        const totalRegistros = datosValidos.length;
        if (totalRegistros === 0) {
            alert("❌ No se encontraron registros válidos en el CSV.");
            mostrarProgreso(false);
            return;
        }

        mostrarProgreso(true, `🚀 Subiendo ${totalRegistros} registros a Firebase...`);
        actualizarProgreso(0, `0 de ${totalRegistros} registros subidos.`);

        let contadorExito = 0;
        let contadorError = 0;

        for (let i = 0; i < totalRegistros; i++) {
            try {
                await addDoc(collection(db, "estudiantes"), datosValidos[i]);
                contadorExito++;
                const porcentaje = Math.round(((i + 1) / totalRegistros) * 100);
                actualizarProgreso(porcentaje, `${i+1} de ${totalRegistros} registros subidos (${porcentaje}%).`);
            } catch (error) {
                console.error(`Error al guardar registro ${i+1}:`, error);
                contadorError++;
                actualizarProgreso(0, `❌ Error en registro ${i+1}. Continuando...`);
            }
        }

        mostrarProgreso(false);
        alert(`✅ Proceso completado.\n✅ Éxito: ${contadorExito}\n❌ Errores: ${contadorError}`);
        fileInput.value = ''; // Limpiar el input de archivo
        if (window.cargarEstudiantes) window.cargarEstudiantes(); // Refrescar lista si existe
    };
    
    reader.onerror = () => {
        mostrarProgreso(false);
        alert("❌ Error al leer el archivo");
    };
};

// --- Función para vaciar toda la base de datos CON PROGRESO ---
window.vaciarTodo = async function() {
    if (!confirm("⚠️ ¿Seguro que quieres borrar TODOS los registros? Esta acción NO se puede deshacer.")) {
        return;
    }
    
    mostrarProgreso(true, "🔍 Obteniendo lista de estudiantes para eliminar...");
    
    try {
        const querySnapshot = await getDocs(collection(db, "estudiantes"));
        const totalDocs = querySnapshot.size;
        
        if (totalDocs === 0) {
            alert("ℹ️ No hay registros para eliminar.");
            mostrarProgreso(false);
            return;
        }
        
        mostrarProgreso(true, `🗑️ Eliminando ${totalDocs} registros...`);
        actualizarProgreso(0, `0 de ${totalDocs} registros eliminados.`);
        
        let contadorEliminados = 0;
        
        for (const documento of querySnapshot.docs) {
            await deleteDoc(doc(db, "estudiantes", documento.id));
            contadorEliminados++;
            const porcentaje = Math.round((contadorEliminados / totalDocs) * 100);
            actualizarProgreso(porcentaje, `${contadorEliminados} de ${totalDocs} registros eliminados (${porcentaje}%).`);
        }
        
        mostrarProgreso(false);
        alert(`🗑️ Eliminación completada. Se eliminaron ${contadorEliminados} registros.`);
        if (window.cargarEstudiantes) window.cargarEstudiantes(); // Refrescar lista si existe
        
    } catch (error) {
        console.error("Error al limpiar la base de datos:", error);
        mostrarProgreso(false);
        alert("❌ Ocurrió un error durante la eliminación. Revisa la consola.");
    }
};
