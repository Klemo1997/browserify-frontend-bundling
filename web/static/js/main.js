/**
 * Example legacy script
 */

var form = document.querySelector('.js-main-form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmitForm(e.target, afterSubmit);
});

function afterSubmit(data) {
    console.log(data);
}

function handleSubmitForm(form, callback) {
    var formData = getObjectFromFormData(new FormData(form));

    callback(formData);
}

function getObjectFromFormData(formData) {
    var formEntries = Array.from(formData)

    return Object.fromEntries(formEntries);
}