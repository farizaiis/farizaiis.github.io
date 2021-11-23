function myFunction() {
    var element = document.getElementById('experiencepage');
    element.classList.toggle('dark-mode');

    var element = document.getElementById('kontenpage');
    element.classList.toggle('dark-mode');

    var element = document.getElementById('contactpage');
    element.classList.toggle('dark-mode');
}

function onSubmit(e) {
    e.preventDefault();

    let data = {
        email: document.querySelector('input[name = email]').value,
        company: document.querySelector('input[name = company]').value,
        message: document.querySelector('textarea[name = message]').value,
    };
    
    
}
