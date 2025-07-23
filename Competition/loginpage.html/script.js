// Store users in localStorage if not exists
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Password strength indicator
if (document.getElementById('signupPassword')) {
    const passwordInput = document.getElementById('signupPassword');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Update UI
        strengthBars.forEach((bar, index) => {
            bar.style.backgroundColor = index < strength ? 
                (strength < 3 ? '#f72585' : strength < 5 ? '#4895ef' : '#4cc9f0') : 
                '#e2e8f0';
        });
        
        strengthText.textContent = 
            strength < 3 ? 'Weak' : 
            strength < 5 ? 'Moderate' : 'Strong';
    });
}

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Login Form Handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('users'));
        
        const user = users.find(u => u.email === email && u.password === password);
        
        const messageElement = document.getElementById('loginMessage');
        messageElement.textContent = '';
        messageElement.className = 'message';
        
        if (user) {
            messageElement.textContent = '🎉 Login successful! Redirecting...';
            messageElement.className = 'message success';
            
            // Add loading state to button
            const btn = this.querySelector('button');
            const btnText = btn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Please wait...';
            btn.disabled = true;
            
            // Redirect to dashboard or home page after successful login
            setTimeout(() => {
                // window.location.href = 'dashboard.html';
                btnText.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        } else {
            messageElement.textContent = '❌ Invalid email or password';
            messageElement.className = 'message error';
            
            // Add shake animation to form
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        }
    });
}

// Signup Form Handler
if (document.getElementById('signupForm')) {
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const age = document.getElementById('signupAge').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        const messageElement = document.getElementById('signupMessage');
        messageElement.textContent = '';
        messageElement.className = 'message';
        
        // Validate password match
        if (password !== confirmPassword) {
            messageElement.textContent = '❌ Passwords do not match';
            messageElement.className = 'message error';
            
            // Highlight the password fields
            document.getElementById('signupPassword').style.borderColor = 'var(--danger)';
            document.getElementById('confirmPassword').style.borderColor = 'var(--danger)';
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users'));
        const userExists = users.some(u => u.email === email);
        
        if (userExists) {
            messageElement.textContent = '❌ Email already registered';
            messageElement.className = 'message error';
            return;
        }
        
        // Add new user
        users.push({
            name,
            age,
            email,
            password
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        messageElement.textContent = '🎉 Registration successful! Redirecting to login...';
        messageElement.className = 'message success';
        
        // Add loading state to button
        const btn = this.querySelector('button');
        const btnText = btn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        btnText.textContent = 'Creating account...';
        btn.disabled = true;
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
            btnText.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    });
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
        10%, 90% { transform: translateX(-2px); }
        20%, 80% { transform: translateX(4px); }
        30%, 50%, 70% { transform: translateX(-6px); }
        40%, 60% { transform: translateX(6px); }
    }
`;
document.head.appendChild(style);