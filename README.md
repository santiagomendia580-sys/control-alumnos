# Sistema de Control de Alumnos - Dashboard SPA

## 📋 Descripción
Sistema de gestión escolar con Single Page Application (SPA) que permite:
- ✅ Ver lista de alumnos
- ✅ Agregar/Registrar alumnos
- ✅ Editar alumnos
- ✅ Actualizar información
- ✅ Eliminar alumnos
- ✅ Buscar alumnos
- ✅ Autenticación de usuarios

---

## 🔐 Credenciales de Acceso

**Usuario:** `Admin`  
**Contraseña:** `123456`

---

## 🐛 Problema del Botón "Iniciar sesión" - RESUELTO ✅

### ¿Cuál era el problema?
El archivo JavaScript se llamaba **`scrip.js`** (sin la "t"), pero en el HTML se intentaba cargar **`script.js`**.

En el HTML original:
```html
<script src="script.js"></script>  <!-- Aquí se buscaba "script.js" -->
```

Pero el archivo real era:
```
js/scrip.js  <!-- Archivo sin la "t" -->
```

### ✅ Solución
Se recreó el archivo como **`js/script.js`** (nombre correcto), por lo que el botón ahora funciona perfectamente.

---

## 📁 Estructura del Proyecto

```
control-alumnos/
├── index.html          # Página principal (Login + Dashboard SPA)
├── style.css           # Estilos CSS (renovados)
├── README.md           # Este archivo
└── js/
    ├── script.js       # Lógica principal ✅ ARCHIVO CORRECTO
    ├── scrip.js        # ⚠️ Archivo antiguo (puede eliminarse)
    └── firebase.js     # Configuración Firebase
```

---

## 🎨 Características del Dashboard

### 1. **Pantalla de Login**
- Validación de usuario y contraseña
- Mensajes de error claros
- Interfaz moderna

### 2. **Dashboard SPA**
El dashboard tiene dos vistas principales:

#### Vista 1: Ver Alumnos
- Muestra todos los alumnos registrados en tarjetas
- Buscador de alumnos (por nombre, apellido, email o matrícula)
- Botones para **Editar** y **Eliminar**
- Mensaje cuando no hay alumnos

#### Vista 2: Agregar/Editar Alumno
- Formulario para registrar nuevos alumnos
- Mismo formulario se usa para editar alumnos existentes
- Campos: Nombre, Apellido, Email, Grado, Matrícula
- Validación de campos obligatorios

### 3. **Navegación SPA**
- Menú lateral con opciones de vista
- Cambio de vista sin recargar página
- Barra superior con información del usuario
- Botón para cerrar sesión

---

## 💾 Almacenamiento de Datos

Actualmente usa **localStorage** (almacenamiento local del navegador):
- ✅ Los datos se guardan localmente
- ✅ Los datos persisten al cerrar la página
- ✅ Cada navegador tiene sus propios datos

Para usar Firebase, descomentar las líneas en `js/firebase.js`.

---

## 🚀 Cómo Usar

1. Abre `index.html` en tu navegador
2. Ingresa con Usuario: `Admin` y Contraseña: `123456`
3. En el Dashboard:
   - **Ver Alumnos** → Lista de todos los alumnos
   - **Agregar Alumno** → Registrar uno nuevo
   - **Buscar** → Filtrar alumnos
   - **Editar** → Modificar un alumno
   - **Eliminar** → Borrar un alumno

---

## 📱 Responsive Design

✅ Funciona en Desktop, Tablets y Móviles

---

## 📝 Tecnologías

- HTML5
- CSS3 (Grid, Flexbox)
- JavaScript Vanilla
- LocalStorage
- Firebase Config (integración futura)

Versión: 1.0
