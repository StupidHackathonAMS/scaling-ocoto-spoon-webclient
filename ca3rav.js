var walker =document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
    false);
while(walker.nextNode()){
    var cur = walker.currentNode;
    var txt = cur.textContent;
    if(isWrong(txt))
        continue;
    translate(cur);
}
function getSavedCats(callback) {
    chrome.storage.sync.get("cats", function (type) {
        callback(type["cats"]);
    });
}
getSavedCats(function(cats) {
    if(cats === true){
        var ilist = document.images;
        for(var i = 0; i < ilist.length; i++){
            ilist[i].src = "https://thecatapi.com/api/images/get?format=src&type=gif&rand=" + Math.random();
            ilist[i].srcset = "";
        }
    }
});

function isWrong(txt){
    return isEmpty(txt) || isCode(txt) || isTooShort(txt);
}

function isCode(txt){
    return count(txt, "{") + count(txt, "}")  + count(txt, "<") + count(txt, ">") >= 2
}
function isEmpty(txt){
    return txt == null || txt.trim().length == 0;
}
function isTooShort(txt){
    return txt.trim().length < 3;
}

function count(s1, s2) {
    return (s1.length - s1.replace(new RegExp(s2,"g"), '').length) / s2.length;
}

function translate(element){
    // string extensionId, any message, object options, function responseCallback
    chrome.runtime.sendMessage(element.textContent, function(response) {
        // if(element.parentElement !== null)
            element.parentElement.innerHTML = response;
        // else
        //     element.textContent = response;
    });
}