import { db } from './conexion.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.verificarConstancia = async function() {
    const codigo = document.getElementById('codigo-verificacion').value.trim();
    const resultadoDiv = document.getElementById('resultado-verificacion');
    
    if (!codigo) {
        alert("⚠️ Por favor, ingresa el código de verificación");
        return;
    }
    
    resultadoDiv.innerHTML = '<div class="cargando">🔍 Verificando código...</div>';
    
    try {
        // Buscar por código de verificación
        const q = query(collection(db, "constancias"), where("codigo", "==", codigo));
        const snap = await getDocs(q);
        
        if (snap.empty) {
            resultadoDiv.innerHTML = `
                <div class="verificacion-invalida">
                    <h3>❌ CONSTANCIA INVÁLIDA</h3>
                    <p>El código <strong>${codigo}</strong> no corresponde a ninguna constancia emitida por TecnoSistemas-V2.</p>
                    <p>⚠️ Este documento no es auténtico. Por favor, contacte a la institución.</p>
                </div>
            `;
        } else {
            snap.forEach((doc) => {
                const data = doc.data();
                resultadoDiv.innerHTML = `
                    <div class="verificacion-valida">
                        <h3>✅ CONSTANCIA VÁLIDA</h3>
                        <p>El código <strong>${codigo}</strong> es auténtico.</p>
                        <div class="info-constancia">
                            <p><strong>📄 Tipo:</strong> ${data.tipo}</p>
                            <p><strong>👤 Estudiante:</strong> ${data.nombre} ${data.apellido}</p>
                            <p><strong>📘 Cédula:</strong> ${data.cedula}</p>
                            <p><strong>📚 Carrera:</strong> ${data.carrera}</p>
                            <p><strong>📌 Sección:</strong> ${data.seccion}</p>
                            <p><strong>📅 Fecha de emisión:</strong> ${data.fecha}</p>
                        </div>
                        <p class="verificado">✅ Verificado por TecnoSistemas-V2</p>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error("Error al verificar:", error);
        resultadoDiv.innerHTML = '<div class="verificacion-error">❌ Error al verificar. Intenta de nuevo.</div>';
    }
};

// Permitir verificar con Enter
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('codigo-verificacion');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.verificarConstancia();
            }
        });
    }
});
