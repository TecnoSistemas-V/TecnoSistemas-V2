import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
            snap.forEach((doc) => {
                const data = doc.data();
                // Guardamos TODOS los campos en localStorage
                localStorage.setItem('estudiante_activo', JSON.stringify({
                    cedula: data.Cédula,
                    apellido: data.Apellido,
                    nombre: data.Nombre,
                    carrera: data.Carrera,
                    seccion: data.Sección,
                    direccion: data.Dirección
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
