document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.querySelector('#togglePassword'); 
    const register = document.querySelector('.register');
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');
    const passDiv = document.querySelector('.password-error');
    const emailDiv = document.querySelector('.email-error');

    const setEmailError = (message) => {
        emailDiv.textContent = message;
        emailDiv.classList.remove('success');
        emailDiv.classList.add('error-visible');
    }

    const setEmailSuccess = (message) => {
        emailDiv.textContent = message;
        emailDiv.classList.remove('error-visible');
        emailDiv.classList.add('success');
    }

    const setPasswordError = (message) => {
        passDiv.textContent = message;
        passDiv.classList.remove('success');
        passDiv.classList.add('error-visible');
    }

    const setPasswordSuccess = (message) => {
        passDiv.textContent = message;
        passDiv.classList.remove('error-visible');
        passDiv.classList.add('success');
    }


    const emailIsValid = (emailValue) => {
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        return emailRegex.test(emailValue);
    }

    const passwordIsValid = (passwordValue) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{9,}$/;
        return passwordRegex.test(passwordValue);
    }

    register.addEventListener('click', (event) => {
        const emailtext = email.value.trim();
        const passwordValue = password.value.trim();

        let valid = true;

        if (emailtext === "") {
            setEmailError('Email is required');
            valid = false;
        } else if (!emailIsValid(emailtext)) {
            setEmailError('Please make sure your email is a valid gmail address');
            valid = false;
        } else {
            setEmailSuccess('Valid Email');
        }

        if (passwordValue === "") {
            setPasswordError('Password is required');
            valid = false;
        } else if (!passwordIsValid(passwordValue)) {
            setPasswordError('Password must be above 8 characters with special characters');
            valid = false;
        } else {
            setPasswordSuccess('Valid Password');
        }

        if (!valid) {
            event.preventDefault();
        }
    });


    togglePassword.addEventListener('click', function () {
        // Twitches the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        // Toggle the eye icon
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
});