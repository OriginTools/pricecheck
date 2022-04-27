document.addEventListener("DOMContentLoaded", function () {
    FastClick.attach(document.body);
}, false);

var params = new URLSearchParams(window.location.search);

if (params.has("item")) {
    document.querySelector("#item").value = params.get("item");
}

const search = new Search();