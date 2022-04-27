var params = new URLSearchParams(window.location.search);

if (params.has("item")) {
    document.querySelector("#item").value = params.get("item");
}