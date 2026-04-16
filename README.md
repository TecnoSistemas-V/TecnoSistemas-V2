# 🏢 TecnoSistemas-V2

<div align="center">

**Sistema de gestión y generación de constancias académicas y laborales con verificación mediante código QR**

[![Estado](https://img.shields.io/badge/Estado-Operativo-brightgreen)]()
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-blue)]()
[![Version](https://img.shields.io/badge/Versión-2.0-orange)]()
[![Estudiantes](https://img.shields.io/badge/Estudiantes-175+-blue)]()

</div>

---

## 🌐 **Enlaces del Sistema**

|  | Página | Enlace | Descripción |
|:-:|--------|--------|-------------|
| 🏠 | **Inicio** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/](https://tecnosistemas-v.github.io/TecnoSistemas-V2/) | Portal principal de acceso |
| 🔍 | **Generar Constancia** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/solicitud.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/solicitud.html) | Estudiantes buscan por cédula |
| ✅ | **Verificar Constancia** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/verificar.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/verificar.html) | Verificar autenticidad por QR |
| 👨‍💼 | **Panel Admin (Tabla)** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/admin-lista.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/admin-lista.html) | Gestión completa (CRUD) |
| 📤 | **Panel Admin (CSV)** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/nominas.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/nominas.html) | Carga masiva de estudiantes |
| 📘 | **Constancia Estudios** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-estudios.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-estudios.html) | Formato académico |
| 💼 | **Constancia Trabajo** | [https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-trabajo.html](https://tecnosistemas-v.github.io/TecnoSistemas-V2/formatos/constancia-trabajo.html) | Formato laboral |

---

## ✨ **Características del Sistema**

| # | Característica | Descripción |
|:-:|----------------|-------------|
| 1 | ✅ **Gestión de estudiantes** | CRUD completo (Crear, Leer, Actualizar, Eliminar) |
| 2 | ✅ **Carga masiva CSV** | Subir nóminas completas desde archivo CSV |
| 3 | ✅ **Constancias automáticas** | Generación en formato tipo carta profesional |
| 4 | ✅ **Código único** | Cada constancia tiene código de 15 caracteres (formato: ABC12-DEF34-GHI56) |
| 5 | ✅ **Código QR** | Escaneable desde cualquier celular para verificación instantánea |
| 6 | ✅ **Verificación en línea** | Validar autenticidad de cualquier constancia en segundos |
| 7 | ✅ **Filtros dinámicos** | Buscar y filtrar por carrera y sección |
| 8 | ✅ **Exportar CSV** | Descargar lista filtrada de estudiantes |
| 9 | ✅ **Diseño responsive** | Funciona perfectamente en celulares, tablets y computadoras |
| 10 | ✅ **Base de datos en nube** | Firebase Firestore con sincronización en tiempo real |

---

## 🗂️ **Estructura del Proyecto**

```bash
TecnoSistemas-V2/
│
├── 📄 index.html                 # Página de bienvenida
├── 📄 nominas.html               # Carga de CSV
├── 📄 solicitud.html             # Buscador de estudiantes
├── 📄 verificar.html             # Verificador de constancias
├── 📄 admin-lista.html           # Tabla administrativa
│
├── 📂 css/
│   └── 📄 estilos.css            # Estilos globales
│
├── 📂 js/
│   ├── 📄 conexion.js            # Conexión a Firebase
│   ├── 📄 crud.js                # Carga y limpieza de datos
│   ├── 📄 buscar.js              # Búsqueda y generación de constancias
│   └── 📄 verificar.js           # Verificación de códigos QR
│
└── 📂 formatos/
    ├── 📄 constancia-estudios.html   # Plantilla de constancia académica
    └── 📄 constancia-trabajo.html    # Plantilla de constancia laboral
