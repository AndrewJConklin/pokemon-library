const url = "https://pokeapi.co/api/v2/pokemon?limit=50'"
const pokemonList = document.querySelector("ul")
function capitalize(name) {
    const capitilizedName = name.charAt(0).toUpperCase() + name.slice(1);
    return capitilizedName
}

fetch(url).then(response => {
    return response.json()
}).then(parsedReponse => {
    parsedReponse.results
        .map(pokemon => {
            const li = document.createElement("li");
            const pokemonUrl = pokemon.url;
            li.textContent = capitalize(pokemon.name);
            li.href = pokemonUrl
            pokemonList.append(li);
            console.log(li)
        })
})