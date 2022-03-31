const url = "https://pokeapi.co/api/v2/pokemon?limit=50'"
const pokemonList = document.querySelector("ul")
function capitalize(name) {
    const capitilizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return capitilizedName
}

fetch(url).then(response => {
    return response.json()
}).then(parsedReponse => {
    console.log(parsedReponse)
    parsedReponse.results
        .map(pokemon => {
            const li = document.createElement("li");
            li.textContent = capitalize(pokemon.name);
            pokemonList.append(li);
        })
})