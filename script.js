document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const modal = document.getElementById('proyecto-modal');
    const closeBtn = document.querySelector('.close-btn');
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    const modalContent = document.getElementById('modal-proyecto-content');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    // Proyectos Data
    const proyectosData = [
        {
            id: 1,
            title: "FearMC Network",    
            role: "Owner",
            description: "Una Network de minecraft con multiples modos de juegos.",
            technologies: ["Abierto"],
            achievements: "fearmc.xyz / 26542",
            image: "img/fearlogo.png"
        },
        {
            id: 2,
            title: "MineDou",
            role: "Owner",
            description: "Un servidor de Minecraft con tematica en BoxPvP.",
            technologies: ["Cerrado"],
            achievements: "N/A",
            image: "img/proyecto2.jpg"
        },
        {
            id: 3,
            title: "RazBoxPvP Network",
            role: "Owner",
            description: "Una Network de minecraft con multiples modos de juegos.",
            technologies: ["Abierto"],
            achievements: "razboxnet.org / 26157",
            image: "img/razbox2.png"
        },
        {
            id: 4,
            title: "FearBot",
            role: "Desarrollador",
            description: "Un bot de discord para la comunidad de FearMC. Contiene: Sistema de sorteos, Sistema de tickets, Un antitag para la administracion, Comandos slash basicos y mas!",
            technologies: ["Activo"],
            achievements: "Tecnologias: JavaScript & SQLite",
            image: "img/fearlogo.png"
        }
    ];
    
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
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navHeight = document.querySelector('#navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(li => {
            const link = li.querySelector('a');
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
    
        if (window.scrollY > 100) {
            document.querySelector('#navbar').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        } else {
            document.querySelector('#navbar').style.backgroundColor = 'transparent';
        }
    });
    
    proyectoCards.forEach(card => {
        card.addEventListener('click', () => {
            const proyectoId = card.getAttribute('data-id');
            const proyecto = proyectosData.find(p => p.id == proyectoId);
            
        
            modalContent.innerHTML = `
                <div class="modal-proyecto">
                    <div class="modal-proyecto-img">
                        <img src="${proyecto.image}" alt="${proyecto.title}">
                    </div>
                    <div class="modal-proyecto-info">
                        <h2>${proyecto.title}</h2>
                        <h3>${proyecto.role}</h3>
                        <p>${proyecto.description}</p>
                        
                        <div class="modal-proyecto-details">
                            <div class="detail">
                                <h4>Estado</h4>
                                <div class="tech-tags">
                                    ${proyecto.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="detail">
                                <h4>Informacion</h4>
                                <p>${proyecto.achievements}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
         
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }
    });
    
    let isPlaying = false;
    
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
    });

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
    
    document.querySelectorAll('.me-card, .proyecto-card, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    
    animateOnScroll();
  
    const animateBurger = () => {
        burger.addEventListener('click', () => {
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
    };
    
    animateBurger();
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});