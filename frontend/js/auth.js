document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginButton = document.getElementById('login-btn');
    const signupButton = document.getElementById('signup-btn');
    const authSection = document.getElementById('auth-section');

    // Renderiza os botões de login e cadastro
    renderButtons();

    // Função para renderizar os botões com base no estado de login
    function renderButtons() {
        // Mostra os botões de login e cadastro
        loginButton.style.display = 'inline';
        signupButton.style.display = 'inline';
    }

    // Adiciona eventos para os botões de login e cadastro
    loginButton.addEventListener('click', () => {
        loginForm.style.display = 'block';   // Mostra o formulário de login
        signupForm.style.display = 'none';    // Esconde o formulário de cadastro
        authSection.style.display = 'block';  // Mostra a seção de autenticação
    });

    signupButton.addEventListener('click', () => {
        signupForm.style.display = 'block';   // Mostra o formulário de cadastro
        loginForm.style.display = 'none';      // Esconde o formulário de login
        authSection.style.display = 'block';   // Mostra a seção de autenticação
    });

    // Enviar formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data.user));
                alert(`Bem-vindo, ${data.user.name}!`);
                authSection.style.display = 'none'; // Esconde a seção de autenticação após login
            } else {
                alert('Login falhou');
            }
        } catch (error) {
            console.error('Erro no login:', error);
        }
    });

    // Enviar formulário de cadastro
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data.user));
                alert(`Cadastro realizado com sucesso! Bem-vindo, ${data.user.name}!`);
                authSection.style.display = 'none'; // Esconde a seção de autenticação após cadastro
            } else {
                alert('Cadastro falhou');
            }
        } catch (error) {
            console.error('Erro no cadastro:', error);
        }
    });

    // Adiciona eventos para fechar os formulários
    document.getElementById('close-login').addEventListener('click', () => {
        loginForm.style.display = 'none';  // Esconde o formulário de login
        authSection.style.display = 'none'; // Esconde a seção de autenticação
    });

    document.getElementById('close-signup').addEventListener('click', () => {
        signupForm.style.display = 'none';  // Esconde o formulário de cadastro
        authSection.style.display = 'none';  // Esconde a seção de autenticação
    });
});
