/**
 * Example legacy script
 */

var form = document.querySelector('.js-main-form');

var toDateObject = function (datestring) {
    var dateObj = new Date(datestring);
    return isValidDate(dateObj) ? dateObj : null;
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

var transformConfig = {
    born: toDateObject
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmitForm(e.target, afterSubmit);
});

function afterSubmit(data) {
    console.log(data);
}

function transformData(data, transformObject) {
    var entryList = Object.entries(data);
    var transformedEntryList = entryList.map(
        function (entry) {
            var hasTransformFunction = Object
                .prototype
                .hasOwnProperty
                .call(
                    transformObject,
                    entry[0]
                );

            entry[1] = hasTransformFunction
                ? transformObject[entry[0]](entry[1])
                : entry[1];

            return entry;
        }
    )

    return Object.fromEntries(transformedEntryList);
}

function handleSubmitForm(form, callback) {
    var formData = getObjectFromFormData(new FormData(form));

    callback(transformData(formData, transformConfig));
}

function getObjectFromFormData(formData) {
    var formEntries = Array.from(formData)

    return Object.fromEntries(formEntries);
}