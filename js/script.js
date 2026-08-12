// ==================== VARIABLES GLOBALES ====================
let alumnosActuales = [];
let alumnoEditando = null;
let usuarioActual = null;

// ==================== ELEMENTOS DEL DOM ====================
const loginContainer = document.getElementById('loginContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const usuarioInput = document.getElementById('usuario');
const contraseñaInput = document.getElementById('contraseña');
const btnEntrar = document.getElementById('btnEntrar');
const btnCerrarSesion = document.getElementById('btnCerrarSesionDesktop');
const btnCerrarSesionMobile = document.getElementById('btnCerrarSesionMobile');
const usuarioActualSpan = document.getElementById('usuarioActual');
const usuarioActualNav = document.getElementById('usuarioActualNav');
const loginError = document.getElementById('loginError');

const menuBotones = document.querySelectorAll('.menu-btn');
const viewSections = document.querySelectorAll('.view-section');

const formAlumno = document.getElementById('formAlumno');
const formTitle = document.getElementById('formTitle');
const formMessage = document.getElementById('formMessage');
const btnCancelar = document.getElementById('btnCancelar');
const alumnosList = document.getElementById('alumnosList');
const searchInput = document.getElementById('searchInput');

// Elementos del menú hamburguesa
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarMenu = document.getElementById('sidebarMenu');

// ==================== MENÚ HAMBURGUESA (MÓVIL) ====================
hamburgerBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    sidebarMenu.classList.toggle('active');
});

// Cerrar menú al seleccionar una opción
menuBotones.forEach(btn => {
    btn.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
            hamburgerBtn.classList.remove('active');
            sidebarMenu.classList.remove('active');
        }
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', function (event) {
    if (window.innerWidth <= 768) {
        const isClickInsideMenu = sidebarMenu.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && sidebarMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            sidebarMenu.classList.remove('active');
        }
    }
});

// ==================== AUTENTICACIÓN ====================
btnEntrar.addEventListener('click', function () {
    const usuario = usuarioInput.value.trim();
    const contraseña = contraseñaInput.value.trim();

    if (usuario === '' || contraseña === '') {
        showLoginError('Por favor completa todos los campos');
        return;
    }

    if (usuario === 'Admin' && contraseña === '123456') {
        usuarioActual = usuario;
        mostrarDashboard();
    } else {
        showLoginError('Usuario o contraseña incorrectos');
    }
});

function showLoginError(mensaje) {
    loginError.textContent = mensaje;
    loginError.style.display = 'block';
    setTimeout(() => {
        loginError.style.display = 'none';
    }, 4000);
}

function mostrarDashboard() {
      if (loginContainer) loginContainer.style.display = 'none';
    if (dashboardContainer) dashboardContainer.style.display = 'flex';
    
    // El operador ?. o la condición evita que truene si el elemento es null
    if (usuarioActualSpan) usuarioActualSpan.textContent = usuarioActual;
    if (usuarioActualNav) usuarioActualNav.textContent = `Usuario: ${usuarioActual}`;

    cargarAlumnos();                                            
     }                                                    
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', function () {
        cerrarSesion();
    });
}

// Cerrar sesión (Mobile)
if (btnCerrarSesionMobile) {
    btnCerrarSesionMobile.addEventListener('click', function () {
        cerrarSesion();
    });
}

function cerrarSesion() {
    usuarioActual = null;
    alumnosActuales = [];
    alumnoEditando = null;
    
    loginContainer.style.display = 'flex';
    dashboardContainer.style.display = 'none';
    usuarioInput.value = '';
    contraseñaInput.value = '';
    loginError.style.display = 'none';
    
    // Cerrar menú hamburguesa si está abierto
    hamburgerBtn.classList.remove('active');
    sidebarMenu.classList.remove('active');
}

// ==================== NAVEGACIÓN SPA ====================
menuBotones.forEach(btn => {
    btn.addEventListener('click', function () {
        // Desactiva todos los botones de menú
        menuBotones.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Oculta todas las vistas
        viewSections.forEach(view => view.classList.remove('active'));

        // Muestra la vista seleccionada
        const viewId = 'view' + this.dataset.view.charAt(0).toUpperCase() + this.dataset.view.slice(1);
        const view = document.getElementById(viewId);
        if (view) {
            view.classList.add('active');

            // Si es la vista de agregar, limpiar formulario
            if (this.dataset.view === 'agregar' && !alumnoEditando) {
                limpiarFormulario();
            }
        }
    });
});

// ==================== CARGAR ALUMNOS ====================
function cargarAlumnos() {
    // Simulamos carga de datos desde localStorage o Firebase
    alumnosActuales = obtenerAlumnosDelStorage();
    renderizarAlumnos(alumnosActuales);
}

function obtenerAlumnosDelStorage() {
    const datos = localStorage.getItem('alumnos');
    return datos ? JSON.parse(datos) : [];
}

function guardarAlumnosAlStorage() {
    localStorage.setItem('alumnos', JSON.stringify(alumnosActuales));
}

// ==================== RENDERIZAR ALUMNOS ====================
function renderizarAlumnos(alumnos) {
    if (alumnos.length === 0) {
        alumnosList.innerHTML = '<p class="empty-message">No hay alumnos registrados. ¡Agrega el primero!</p>';
        return;
    }

    alumnosList.innerHTML = alumnos.map(alumno => `
        <div class="alumno-card">
            <h3>${alumno.nombre} ${alumno.apellido}</h3>
            <div class="alumno-info">
                <strong>Email:</strong> ${alumno.email}
            </div>
            <div class="alumno-info">
                <strong>Grado:</strong> ${alumno.grado}
            </div>
            <div class="alumno-info">
                <strong>Matrícula:</strong> ${alumno.matricula}
            </div>
            <div class="card-actions">
                <button class="btn-editar" onclick="editarAlumno('${alumno.id}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarAlumno('${alumno.id}')">Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ==================== BÚSQUEDA ====================
searchInput.addEventListener('input', function () {
    const termino = this.value.toLowerCase();
    const alumnosFiltrados = alumnosActuales.filter(alumno =>
        alumno.nombre.toLowerCase().includes(termino) ||
        alumno.apellido.toLowerCase().includes(termino) ||
        alumno.email.toLowerCase().includes(termino) ||
        alumno.matricula.toLowerCase().includes(termino)
    );
    renderizarAlumnos(alumnosFiltrados);
});

// ==================== AGREGAR/EDITAR ALUMNO ====================
formAlumno.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const grado = document.getElementById('grado').value.trim();
    const matricula = document.getElementById('matricula').value.trim();

    if (!nombre || !apellido || !email || !grado || !matricula) {
        mostrarMensajeFormulario('Por favor completa todos los campos', 'error');
        return;
    }

    if (alumnoEditando) {
        // Actualizar alumno existente
        const index = alumnosActuales.findIndex(a => a.id === alumnoEditando);
        if (index !== -1) {
            alumnosActuales[index] = {
                id: alumnoEditando,
                nombre,
                apellido,
                email,
                grado,
                matricula
            };
            mostrarMensajeFormulario('Alumno actualizado correctamente', 'success');
        }
        alumnoEditando = null;
    } else {
        // Agregar alumno nuevo
        const nuevoAlumno = {
            id: Date.now().toString(),
            nombre,
            apellido,
            email,
            grado,
            matricula
        };
        alumnosActuales.push(nuevoAlumno);
        mostrarMensajeFormulario('Alumno agregado correctamente', 'success');
    }

    guardarAlumnosAlStorage();
    limpiarFormulario();
    cargarAlumnos();

    // Volver a la vista de lista después de 1 segundo
    setTimeout(() => {
        document.querySelector('[data-view="listar"]').click();
    }, 1500);
});

function mostrarMensajeFormulario(mensaje, tipo) {
    formMessage.textContent = mensaje;
    formMessage.className = `form-message ${tipo}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 3000);
}

function limpiarFormulario() {
    formAlumno.reset();
    alumnoEditando = null;
    formTitle.textContent = 'Agregar Nuevo Alumno';
    formMessage.style.display = 'none';
    searchInput.value = '';
}

btnCancelar.addEventListener('click', function () {
    limpiarFormulario();
    document.querySelector('[data-view="listar"]').click();
});

// ==================== EDITAR ALUMNO ====================
function editarAlumno(id) {
    const alumno = alumnosActuales.find(a => a.id === id);
    if (!alumno) return;

    document.getElementById('nombre').value = alumno.nombre;
    document.getElementById('apellido').value = alumno.apellido;
    document.getElementById('email').value = alumno.email;
    document.getElementById('grado').value = alumno.grado;
    document.getElementById('matricula').value = alumno.matricula;

    alumnoEditando = id;
    formTitle.textContent = `Editar Alumno: ${alumno.nombre} ${alumno.apellido}`;

    // Cambiar a vista de agregar
    document.querySelector('[data-view="agregar"]').click();
    window.scrollTo(0, 0);
}

// ==================== ELIMINAR ALUMNO ====================
function eliminarAlumno(id) {
    const alumno = alumnosActuales.find(a => a.id === id);
    if (!alumno) return;

    if (confirm(`¿Estás seguro de que deseas eliminar a ${alumno.nombre} ${alumno.apellido}?`)) {
        alumnosActuales = alumnosActuales.filter(a => a.id !== id);
        guardarAlumnosAlStorage();
        cargarAlumnos();
    }
}

// ==================== PRESIONAR ENTER EN LOGIN ====================
usuarioInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') btnEntrar.click();
});

contraseñaInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') btnEntrar.click();
});

// ==================== INICIALIZAR ====================
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ Sistema listo. Ingresa con usuario: Admin y contraseña: 123456');
    cargarAlumnos();
});
