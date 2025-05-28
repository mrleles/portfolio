document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('nav ul');

    navToggle.addEventListener('click', function () {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('open');
    });

    // Função de filtro para projetos
    window.filterProjects = function(category) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Validação do formulário de contato com feedback em tempo real
    const contactForm = document.querySelector('form[role="form"]');
    if (contactForm) {
        const name = contactForm.querySelector('#name');
        const email = contactForm.querySelector('#email');
        const message = contactForm.querySelector('#message');

        // Função para mostrar feedback
        function showFieldError(field, message) {
            let error = field.parentElement.querySelector('.field-error');
            if (!error) {
                error = document.createElement('span');
                error.className = 'field-error';
                error.style.color = '#ff3333';
                error.style.fontSize = '0.95em';
                error.style.display = 'block';
                error.style.marginTop = '0.2em';
                field.parentElement.appendChild(error);
            }
            error.textContent = message;
        }

        function clearFieldError(field) {
            const error = field.parentElement.querySelector('.field-error');
            if (error) error.remove();
        }

        // Validação em tempo real
        [name, email, message].forEach(field => {
            field.addEventListener('input', function () {
                if (!field.value.trim()) {
                    showFieldError(field, 'Campo obrigatório.');
                } else {
                    clearFieldError(field);
                }
            });
        });

        contactForm.addEventListener('submit', function (e) {
            let valid = true;

            if (!name.value.trim()) {
                showFieldError(name, 'Por favor, preencha o nome.');
                valid = false;
            }
            if (!email.value.trim()) {
                showFieldError(email, 'Por favor, preencha o e-mail.');
                valid = false;
            }
            if (!message.value.trim()) {
                showFieldError(message, 'Por favor, preencha a mensagem.');
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }
});

// Lightbox para imagens dos projetos
document.querySelectorAll('.project-image').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('open');
        lightbox.style.display = 'flex';
        lightbox.focus();
    });
});

document.querySelector('.lightbox-close').addEventListener('click', function () {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('open');
    lightbox.style.display = 'none';
    lightbox.querySelector('.lightbox-img').src = '';
});

// Fechar com ESC ou clique fora da imagem
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('open');
        this.style.display = 'none';
        this.querySelector('.lightbox-img').src = '';
    }
});
document.addEventListener('keydown', function (e) {
    const lightbox = document.getElementById('lightbox');
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        lightbox.style.display = 'none';
        lightbox.querySelector('.lightbox-img').src = '';
    }
});