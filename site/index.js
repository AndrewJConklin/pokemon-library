const url = "https://pokeapi.co/api/v2/pokemon?limit=50"
const pokemonList = document.querySelector(".pokemon")

function capitalize(name) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalizedName
}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const pokemonUrls = parsedResponse.results.map(result => result.url)
        const pokemonFetches = pokemonUrls.map(pokemonUrl => fetch(pokemonUrl)
            .then(response => response.json()))
        return Promise.all(pokemonFetches)
    }).then(parsedResponses => {
        parsedResponses.forEach(parsedResponse => {
            const li = document.createElement("li")
            pokemonList.append(li)
            li.innerHTML = '<div><figure><img/><figcaption><a></a></figcaption></figure></div > '
            div.textContent = capitalize(parsedResponse.name)
        })
    })
