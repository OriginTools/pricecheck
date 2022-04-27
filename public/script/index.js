var params = new URLSearchParams(window.location.search);

if (params.has("item")) {
    document.querySelector("#item").value = params.get("item");
}

if (document.activeElement != document.querySelector("#item")) { // fix for mobile's refusal to autofocus
    document.querySelector("#item").focus();
}