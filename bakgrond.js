var elements = ['translate', 'reverse', 'emoji'];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var xhr = new XMLHttpRequest();

        var endpointrand = elements[Math.floor(Math.random() * elements.length)];

        xhr.open("POST", "http://localhost:3000/" + endpointrand, true);
        xhr.onload = function() {
            if (xhr.readyState === xhr.DONE)
                sendResponse(xhr.response.cookie);
        };
        xhr.onerror = function(reporse) {
            console.log("Could not send message to translator", reporse);
        };
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.responseType = "json";
        xhr.send(JSON.stringify({"cookie": request}));

        return true;
    }
);