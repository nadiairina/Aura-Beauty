document.addEventListener('DOMContentLoaded', () => {

    // 1. Animações Suaves ao Fazer Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
            // Não remove a classe 'active' para a animação só ocorrer uma vez
        });
    }, {
        threshold: 0.2 // A secção é visível em 20%
    });

    document.querySelectorAll('.scroll-animation').forEach(section => {
        observer.observe(section);
    });

    // 2. Formulário de Contacto Funcional (com validação)
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão
        formStatus.textContent = '';
        
        let isValid = validateForm();

        if (isValid) {
            // **IMPORTANTE:** Para o envio automático por email funcionar
            // no mundo real (como no GitHub/servidor), precisaria de
            // um serviço de backend (como Netlify Forms, Formspree, ou
            // um script PHP/Node.js).
            
            // Aqui, simulamos o sucesso para fins de demonstração no frontend.
            
            // Simular um atraso para dar a sensação de processamento
            formStatus.style.color = '#D4A373';
            formStatus.textContent = 'A enviar...';

            setTimeout(() => {
                formStatus.style.color = 'green';
                formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contacto.';
                form.reset(); // Limpa o formulário após o sucesso
                clearErrors();
            }, 2000);
            
        } else {
            formStatus.style.color = 'red';
            formStatus.textContent = 'Por favor, preencha todos os campos corretamente.';
        }
    });

    function validateForm() {
        let valid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        clearErrors();

        // Validação do Nome
        if (name.value.trim() === '') {
            displayError('nameError', 'O nome é obrigatório.');
            valid = false;
        }

        // Validação do Email
        if (email.value.trim() === '') {
            displayError('emailError', 'O email é obrigatório.');
            valid = false;
        } else if (!isValidEmail(email.value.trim())) {
            displayError('emailError', 'Por favor, insira um email válido.');
            valid = false;
        }

        // Validação da Mensagem
        if (message.value.trim() === '' || message.value.trim().length < 10) {
            displayError('messageError', 'A mensagem é obrigatória e deve ter pelo menos 10 caracteres.');
            valid = false;
        }

        return valid;
    }

    function isValidEmail(email) {
        // Expressão regular simples para validação de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    }
});
