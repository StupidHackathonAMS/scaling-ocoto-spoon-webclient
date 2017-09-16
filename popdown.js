function getSavedType(callback) {
    chrome.storage.sync.get("methodtype", function (type) {
        callback(type["methodtype"]);
    });
}

function getSavedCats(callback) {
    chrome.storage.sync.get("cats", function (type) {
        callback(type["cats"]);
    });
}

function saveType(type) {
    chrome.storage.sync.set({"methodtype": type});
}

function saveCats(type) {
    chrome.storage.sync.set({"cats": type});
}

document.addEventListener('DOMContentLoaded', function () {
    var dropdown = document.getElementById('dropdown');
    var catbox = document.getElementById('catbox');

    getSavedType(function (savedType) {
        if (savedType)
            dropdown.value = savedType;
    });
    getSavedCats(function(cats) {
        catbox.checked = cats;
    });

    dropdown.addEventListener('change', function() {
        saveType(dropdown.value);
    });
    catbox.addEventListener('change', function(){
        saveCats(catbox.checked);
    })

});