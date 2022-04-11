const url = "https://pokeapi.co/api/v2/pokemon?limit=50"
const pokemonList = document.querySelector(".pokemon")

fetchAndParse(url)
    .then(parsedResponse => {
        const pokemonUrls = parsedResponse.results
            .map(result => result.url)
        const pokemonFetches = pokemonUrls
            .map(pokemonUrl => fetchAndParse(pokemonUrl))
        return Promise.all(pokemonFetches)
    }).then(pokemonArray => {
        pokemonArray.map(pokemon => {
            return createLi(pokemon)
        }).forEach(pokemonLi => {
            pokemonList.append(pokemonLi)
        })
        const spinner = document.querySelector(".spinner")
        spinner.classList.add("hidden")
    })

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function createLi(pokemon) {
    const li = document.createElement("li")
    li.innerHTML = `
    <div class ="pokemon-listing">
        <figure>
            <img src="${pokemon.sprites.front_default}" alt="${capitalize(pokemon.name)}">
            <figcaption>
                <a href="pokemon.html?pokemon=${pokemon.name}">${capitalize(pokemon.name)}</a>
            </figcaption>
        </figure>
    </div>`
    return li
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}