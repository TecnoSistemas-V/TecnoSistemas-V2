# 🏢 TecnoSistemas-V2

Sistema de gestión y generación de constancias académicas y laborales con verificación mediante código QR.

---

## 🌐 **Enlaces del Sistema**

| Página | Enlace | Descripción |
|--------|--------|-------------|
| 🏠 **Inicio** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/](https://tecnosistemas-v.github.io/TecnoSistemas-V2/) | Portal principal de acceso |
| 🔍 **Generar Constancia** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/solicitud.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/solicitud.html) | Estudiantes buscan por cédula |
| ✅ **Verificar Constancia** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/verificar.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/verificar.html) | Verificar autenticidad por código QR |
| 👨‍💼 **Panel Admin (Tabla)** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/admin-lista.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/admin-lista.html) | Gestionar estudiantes (CRUD) |
| 📤 **Panel Admin (CSV)** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/nominas.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/nominas.html) | Carga masiva de estudiantes |
| 📘 **Constancia Estudios** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-estudios.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-estudios.html) | Formato académico |
| 💼 **Constancia Trabajo** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-trabajo.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-trabajo.html) | Formato laboral |

---

## 📋 **Características del Sistema**

| # | Característica | Descripción |
|---|----------------|-------------|
| 1 | ✅ **Gestión de estudiantes** | CRUD completo (Crear, Leer, Actualizar, Eliminar) |
| 2 | ✅ **Carga masiva CSV** | Subir nóminas completas desde archivo CSV |
| 3 | ✅ **Constancias automáticas** | Generación en formato tipo carta |
| 4 | ✅ **Código único** | Cada constancia tiene código de 15 caracteres |
| 5 | ✅ **Código QR** | Escaneable desde cualquier celular |
| 6 | ✅ **Verificación en línea** | Validar autenticidad de cualquier constancia |
| 7 | ✅ **Filtros dinámicos** | Buscar por carrera y sección |
| 8 | ✅ **Exportar CSV** | Descargar lista filtrada de estudiantes |
| 9 | ✅ **Diseño responsive** | Funciona en celulares, tablets y computadoras |
| 10 | ✅ **Base de datos en nube** | Firebase Firestore en tiempo real |

---

## 🗂️ **Estructura del Proyecto**
TecnoSistemas-V2/
│
├── 📄 index.html # Página de bienvenida
├── 📄 nominas.html # Carga de CSV
├── 📄 solicitud.html # Buscador de estudiantes
├── 📄 verificar.html # Verificador de constancias
├── 📄 admin-lista.html # Tabla administrativa
│
├── 📂 css/
│ └── 📄 estilos.css # Estilos globales
│
├── 📂 js/
│ ├── 📄 conexion.js # Conexión a Firebase
│ ├── 📄 crud.js # Carga y limpieza
│ ├── 📄 buscar.js # Búsqueda y generación
│ └── 📄 verificar.js # Verificación de códigos
│
└── 📂 formatos/
├── 📄 constancia-estudios.html # Plantilla estudios
└── 📄 constancia-trabajo.html # Plantilla trabajo


---

## 🚀 **Guía de Uso Rápido**

### Para Estudiantes (Generar constancia)

1. Abrir [solicitud.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/solicitud.html)
2. Ingresar número de **cédula**
3. Seleccionar tipo de constancia (Estudios / Trabajo)
4. Click en **"GENERAR CONSTANCIA"**
5. Imprimir o guardar como PDF

### Para Verificar una Constancia

1. Abrir [verificar.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/verificar.html)
2. **Escáner el código QR** con el celular
3. O **ingresar manualmente** el código de 15 caracteres
4. El sistema mostrará si es **VÁLIDA** o **INVÁLIDA**

### Para Administradores

| Acción | Dónde |
|--------|-------|
| Ver todos los estudiantes | [admin-lista.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/admin-lista.html) |
| Editar un estudiante | Click en ✏️ Editar |
| Eliminar un estudiante | Click en 🗑️ Eliminar |
| Cargar nómina masiva | [nominas.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/nominas.html) |
| Filtrar por carrera | Seleccionar del desplegable |
| Exportar lista | Click en "Exportar CSV" |

---

## 📊 **Formato del Archivo CSV**

Para cargar estudiantes, el archivo debe tener **6 columnas**:

```csv
Cédula,Nombre,Apellido,Carrera,Sección,Dirección
40000001,LUIS MIGUEL,ALVARADO PEÑA,Ingeniería Eléctrica,1-A,"VALERA - LA BEATRIZ"
40000002,MARÍA FERNANDA,BRICEÑO MÉNDEZ,Ingeniería Eléctrica,1-A,"VALERA - SAN LUIS"
