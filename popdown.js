function getSavedType(callback) {
    chrome.storage.sync.get("methodtype", function (type) {
        callback(type["methodtype"]);
    });
}

function saveType(type) {
    chrome.storage.sync.set({"methodtype": type});
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("Loaded");
    var dropdown = document.getElementById('dropdown');

    getSavedType(function (savedType) {
        console.log("Loading ", savedType);
        if (savedType) {
            dropdown.value = savedType;
        }
    });

    dropdown.addEventListener('change', function() {
        console.log("Saving " + dropdown.value);
        saveType(dropdown.value);
    });

});