document.addEventListener('DOMContentLoaded', () => {

  const password = document.querySelector('#password');

  togglePassword.addEventListener('click', function () {
    // Twitches the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    // Toggle the eye icon
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
  });
});