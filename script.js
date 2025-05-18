document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    // Efecto de escritura automática
    const typingText = document.getElementById('typing-text');
    const phrases = [
        "Configurador de Minecraft",
        "Desarrollo de Bots de Discord",
        "Desarrollo de Páginas Web"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isEnd = true;
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            isEnd = false;
        }
        
        const speed = isDeleting ? 50 : isEnd ? 2000 : 100;
        setTimeout(typeWriter, speed);
    }
    
    // Iniciar el efecto de escritura
    setTimeout(typeWriter, 1000);
    
    // Burger menu toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('toggle');
        
        // Animación de las líneas del burger
        const lines = document.querySelectorAll('.burger div');
        lines[0].classList.toggle('rotate-45');
        lines[1].classList.toggle('opacity-0');
        lines[2].classList.toggle('rotate--45');
        
        lines.forEach(line => {
            line.style.transition = 'all 0.3s ease';
        });
        
        if (lines[0].classList.contains('rotate-45')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            lines[0].style.transform = 'rotate(0) translate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translate(0)';
        }
    });
    
    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
            
            // Restablecer las líneas del burger
            const lines = document.querySelectorAll('.burger div');
            lines[0].style.transform = 'rotate(0) translate(0)';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'rotate(0) translate(0)';
        });
    });
    
    // Cambiar el fondo de la navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.querySelector('#navbar').style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            document.querySelector('#navbar').style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
    });
    
// Controlador de música
let isPlaying = localStorage.getItem('musicPlaying') === 'true';

// Restaurar el estado al cargar la página
if (isPlaying) {
    backgroundMusic.play().catch(error => {
        console.log("Audio playback failed: ", error);
    });
    musicToggle.classList.add('playing');
}

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
    } else {
        backgroundMusic.play().catch(error => {
            console.log("Audio playback failed: ", error);
        });
        musicToggle.classList.add('playing');
    }
    
    isPlaying = !isPlaying;
    // Guardar el estado en localStorage
    localStorage.setItem('musicPlaying', isPlaying);
});

// Reproducir automáticamente al cambiar de página (si estaba activo)
window.addEventListener('pageshow', function() {
    if (isPlaying) {
        backgroundMusic.play().catch(error => {
            console.log("Auto-play failed: ", error);
        });
    }
});
    
    // Animaciones al cargar
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.me-card, .proyecto-card, .contact-card');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (position < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('proyecto-modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalContent = document.getElementById('modal-proyecto-content');
    
    // Datos de los proyectos (puedes expandir esto con más información)
    const proyectosData = {
        1: {
            title: "FearMC Network",
            description: "FearMC es una red de servidores de Minecraft que he desarrollado y configurado completamente. Incluye varios modos de juego como SkyWars, BedWars y Survival, con sistemas personalizados de economía, rangos y eventos especiales.",
            role: "Owner & Configurador principal",
            tech: ["Minecraft", "Plugins", "Configuración"],
            links: [
                {icon: "fab fa-discord", text: "Discord", url: "https://discord.fearmc.xyz"},
                {icon: "fas fa-shopping-cart", text: "Tienda", url: "https://tienda.fearmc.xyz"}
            ]
        },
        2: {
            title: "MineDou",
            description: "MineDou fue mi primer proyecto de servidor de Minecraft, donde aprendí las bases de la configuración de servidores y el manejo de plugins. Fue una experiencia de aprendizaje muy valiosa.",
            role: "Owner & Configurador principal",
            tech: ["Minecraft", "Plugins", "Configuración"],
            links: []
        },
        3: {
            title: "RazBoxPvP Network",
            description: "Una red de servidores PvP con modos de juego competitivos. Implementé sistemas de clasificación, recompensas y eventos especiales para mantener a la comunidad activa.",
            role: "Owner & Configurador principal",
            tech: ["Minecraft", "PvP", "Configuración"],
            links: [
                {icon: "fab fa-discord", text: "Discord", url: "https://discord.gg/Dv6M8BcgTB"}
            ]
        },
        4: {
            title: "FearBot",
            description: "Un bot de Discord multifuncional desarrollado en JavaScript. Incluye comandos de moderación, entretenimiento y utilidades para servidores de Discord.",
            role: "Desarrollador",
            tech: ["JavaScript", "Discord.js", "SQLite"],
            links: []
        },
        5: {
            title: "Portafolio Web",
            description: "Este mismo portafolio que estás viendo, desarrollado con HTML, CSS y JavaScript para mostrar mis proyectos y habilidades.",
            role: "Desarrollador Frontend", 
            tech: ["HTML", "CSS", "JavaScript"],
            links: [
                {icon: "fab fa-github", text: "Github", url: "https://github.com/gaelbloqueado/portafolio"}
            ]
        },
        6: {
            title: "Fear Web",
            description: "Una pagina web para FearMC, donde los usuarios pueden encontrar información sobre los servidores, eventos y más.",
            role: "Desarrollador Frontend",
            tech: ["HTML", "CSS", "JavaScript"],
            links: [
                {icon: "fab fa-github", text: "Github", url: "https://github.com/gaelbloqueado/fearmcweb"}
            ]
        }        
    };

    // Abrir modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.proyecto-card');
            const projectId = card.getAttribute('data-id');
            const projectData = proyectosData[projectId];
            
            modalContent.innerHTML = `
                <h3>${projectData.title}</h3>
                <p><strong>Rol:</strong> ${projectData.role}</p>
                <p>${projectData.description}</p>
                
                <div class="modal-tech">
                    ${projectData.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                
                ${projectData.links.length > 0 ? `
                <div class="modal-links">
                    ${projectData.links.map(link => `
                        <a href="${link.url}" target="_blank">
                            <i class="${link.icon}"></i> ${link.text}
                        </a>
                    `).join('')}
                </div>
                ` : ''}
            `;
            
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Filtrado de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Quitar active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const projects = document.querySelectorAll('.proyecto-card');
            
            projects.forEach(project => {
                if (filter === 'all' || project.getAttribute('data-category') === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});