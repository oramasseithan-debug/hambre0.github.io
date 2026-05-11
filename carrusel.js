document.addEventListener("DOMContentLoaded", function() {
    let indiceActual = 0;
    const pista = document.getElementById("pista");
    const imagenes = document.querySelectorAll(".carrusel-pista img");
    const indicadoresContainer = document.getElementById("indicadores");
    const pie = document.getElementById("pie-foto");

    // Crear puntos solo si el contenedor existe
    if (indicadoresContainer) {
        imagenes.forEach((_, i) => {
            const punto = document.createElement("div");
            punto.classList.add("punto");
            if (i === 0) punto.classList.add("activo");
            punto.onclick = () => irA(i);
            indicadoresContainer.appendChild(punto);
        });
    }

    // Funciones globales para que funcionen con los botones
    window.mover = function(paso) {
        indiceActual = (indiceActual + paso + imagenes.length) % imagenes.length;
        actualizarCarrusel();
    };

    function irA(index) {
        indiceActual = index;
        actualizarCarrusel();
    }

    function actualizarCarrusel() {
        if (pista) pista.style.transform = `translateX(${-indiceActual * 100}%)`;
        if (pie) pie.textContent = imagenes[indiceActual].alt;
        
        // Actualizar clase activo
        const puntos = document.querySelectorAll(".punto");
        puntos.forEach((p, i) => {
            p.classList.toggle("activo", i === indiceActual);
        });
    }
});
let indiceActual = 0;

// Definimos la función global para que los botones HTML la encuentren
window.mover = function(paso) {
    const pista = document.getElementById("pista");
    const imagenes = document.querySelectorAll(".carrusel-pista img");
    const pie = document.getElementById("pie-foto");
    
    if (!pista) return;

    indiceActual = (indiceActual + paso + imagenes.length) % imagenes.length;
    
    // Mover carrusel
    pista.style.transform = `translateX(${-indiceActual * 100}%)`;
    
    // Actualizar texto
    if (pie) pie.textContent = imagenes[indiceActual].alt;
    
    // Actualizar puntos
    actualizarIndicadores();
};

function actualizarIndicadores() {
    const puntos = document.querySelectorAll(".punto");
    puntos.forEach((p, i) => {
        p.classList.toggle("activo", i === indiceActual);
    });
}

// Inicialización cuando el HTML carga
document.addEventListener("DOMContentLoaded", function() {
    const imagenes = document.querySelectorAll(".carrusel-pista img");
    const indicadoresContainer = document.getElementById("indicadores");

    // 1. Crear los puntos automáticamente
    if (indicadoresContainer) {
        imagenes.forEach((_, i) => {
            const punto = document.createElement("div");
            punto.classList.add("punto");
            if (i === 0) punto.classList.add("activo");
            punto.onclick = () => {
                indiceActual = i;
                const pista = document.getElementById("pista");
                const pie = document.getElementById("pie-foto");
                pista.style.transform = `translateX(${-indiceActual * 100}%)`;
                if (pie) pie.textContent = imagenes[indiceActual].alt;
                actualizarIndicadores();
            };
            indicadoresContainer.appendChild(punto);
        });
    }

    // 2. ACTIVAR MOVIMIENTO AUTOMÁTICO (Autoplay)
    // Cambia 4000 a otro número si quieres que sea más rápido o lento (en milisegundos)
    setInterval(() => {
        window.mover(1);
    }, 4000);
});