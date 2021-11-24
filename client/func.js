function myFunction() {
    var element = document.getElementById('darkmodeid');
    element.classList.toggle('dark-mode');

    var element = document.getElementById('experiencepage');
    element.classList.toggle('dark-mode');

    var element = document.getElementById('contactpage');
    element.classList.toggle('dark-mode');

    var element = document.getElementById('kontenpage');
    element.classList.toggle('dark-mode');

    var element = document.getElementById('clientpage');
    element.classList.toggle('dark-mode');
}

function onSubmit(e) {
    e.preventDefault();

    let dataCust = {
        email: document.querySelector('input[name = email]').value,
        company: document.querySelector('input[name = company]').value,
        message: document.querySelector('textarea[name = message]').value,
    };

    let myModal = $('#modalContact');

    fetch('https://phoenix-organizer.herokuapp.com/v1/contact-customer/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: dataCust.email,
            company: dataCust.company,
            message: dataCust.message,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 'success') {
                document.querySelector('input[name = email]').value = '';
                document.querySelector('input[name = company]').value = '';
                document.querySelector('textarea[name = message]').value = '';
            }
            myModal.find('.text-contents').text(data.message);
            myModal.modal('show');

            return data;
        })
        .catch((error) => {
            return error;
        });
}
