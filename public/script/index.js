document.addEventListener("DOMContentLoaded", function () {
    FastClick.attach(document.body);
}, false);

var params = new URLSearchParams(window.location.search);

if (params.has("item")) {
    document.querySelector("#item").value = params.get("item");
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

const search = new Search();

function updateSearch() {
    let val = document.querySelector("#item").value;
    if (val == "") {
        document.querySelector("#m-txt-pre").innerText = "How much is my ";
        document.querySelector("#m-txt-post").innerText = " worth?";
        document.querySelector("#query").innerText = "";
        document.querySelector("#disagree").style.visibility = "hidden";
        document.querySelectorAll(".main-text").forEach(e => e.classList.remove("long"));
        return;
    }
    let closestItem = search.parseSearch(val);
    let closestPrice = search.getPrice(closestItem);
    if (closestPrice.toString().length > 3) {
        document.querySelectorAll(".main-text").forEach(e => e.classList.add("long"));
    } else {
        document.querySelectorAll(".main-text").forEach(e => e.classList.remove("long"));
    }
    document.querySelector("#query").innerText = "(For item: " + closestItem + ")";
    document.querySelector("#disagree").style.visibility = "visible";
    document.querySelector("#m-txt-pre").innerText = "One ";
    if (closestPrice == 1) {
        document.querySelector("#m-txt-post").innerText = " is worth 1 ruby.";
    } else {
        document.querySelector("#m-txt-post").innerText = " is worth " + closestPrice + " rubies.";
    }
}