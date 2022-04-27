class Search {
    #prices = null;
    constructor() {
        fetch("./public/data/prices.json").then(response => response.json().then(data => { this.#prices = data; })).catch(error => console.error(error));
    }
    getPrice(item) {
        return this.#prices[item];
    }
    parseSearch(input) {
        let dists = {};
        for (let i in Object.keys(this.#prices)) {
            let item = Object.keys(this.#prices)[i];
            dists[item] = levenshtein(input.toLowerCase(), item.toLowerCase());
        }
        console.log(dists);
        return Object.keys(dists).find(k => dists[k] === Math.min(...Object.values(dists)));
    }
}