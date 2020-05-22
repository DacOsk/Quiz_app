const loginForm = document.querySelector('#login');
const userName = document.querySelector('#user-name');
const userPass = document.querySelector('#user-password');
const submitBtn = document.querySelector('#submit');
const result = document.querySelector('#result');

let userOK = false;
let passOK = false;

formCheck = () => {
    userOK = userName.checkValidity();
    passOK = userPass.checkValidity();
    submitBtn.disabled = !(userOK && passOK);
};

loginForm.addEventListener('change', formCheck);

submitBtn.addEventListener('mouseenter', formCheck);

getFormData = () => {
    const formData = {
        name: loginForm.name.value,
        password: loginForm.password.value
    };
    postData(formData);
}

// Prevent form from submitting
loginForm.addEventListener('submit', event => {
    event.preventDefault();
    formCheck();
    getFormData();
});

window.onload = formCheck;

// Submit click handler
submitBtn.addEventListener('click', getFormData);

// Send form data to backend
async function postData(data) {
    const response = await fetch(
        'php/login.php', {
            method: 'POST',
            body: JSON.stringify(data)
        }
    );
    const serverResponse = await response.json();
    result.innerText = serverResponse.name;
}