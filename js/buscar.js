import { db } from './conexion.js';
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Función para generar código único de verificación
function generarCodigoUnico(cedula, timestamp) {
    // Generar código con formato: ABC12-DEF34-GHI56
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 15; i++) {
        if (i === 5 || i === 10) {
            codigo += '-';
        } else {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
    }
    return codigo;
}

window.buscarYGenerar = async function() {
    const input = document.getElementById('cedula-input');
    const tipo = document.getElementById('tipo-documento').value;
    const cedula = input.value.trim();

    if (!cedula) {
        alert("⚠️ Por favor, ingresa la cédula.");
        return;
    }

    const btn = document.querySelector('button');
    const textoOriginal = btn.innerText;
    btn.innerText = "Buscando...";
    btn.disabled = true;

    try {
        const q = query(collection(db, "estudiantes"), where("Cédula", "==", cedula));
        const snap = await getDocs(q);

        if (snap.empty) {
            alert("❌ Cédula no encontrada en el sistema.");
        } else {
            snap.forEach(async (doc) => {
                const data = doc.data();
                const timestamp = new Date().getTime();
                const codigoVerificacion = generarCodigoUnico(cedula, timestamp);
                
                // Guardar el código en la colección "constancias" para verificación
                await addDoc(collection(db, "constancias"), {
                    codigo: codigoVerificacion,
                    tipo: tipo === 'estudio' ? 'Constancia de Estudios' : 'Constancia de Trabajo',
                    cedula: data.Cédula,
                    nombre: data.Nombre,
                    apellido: data.Apellido,
                    carrera: data.Carrera,
                    seccion: data.Sección,
                    direccion: data.Dirección,
                    fecha: new Date().toLocaleDateString('es-ES'),
                    timestamp: timestamp
                });
                
                // Guardar en localStorage incluyendo el código
                localStorage.setItem('estudiante_activo', JSON.stringify({
                    cedula: data.Cédula,
                    apellido: data.Apellido,
                    nombre: data.Nombre,
                    carrera: data.Carrera,
                    seccion: data.Sección,
                    direccion: data.Dirección,
                    codigoVerificacion: codigoVerificacion
                }));
                
                const ruta = tipo === 'estudio' 
                    ? 'formatos/constancia-estudios.html' 
                    : 'formatos/constancia-trabajo.html';
                window.location.href = ruta;
            });
        }
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        alert("❌ Error al consultar la base de datos. Intenta de nuevo.");
    } finally {
        btn.innerText = textoOriginal;
        btn.disabled = false;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cedula-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.buscarYGenerar();
            }
        });
    }
});
