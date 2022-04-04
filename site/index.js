const url = "https://pokeapi.co/api/v2/pokemon?limit=50"
const pokemonList = document.querySelector(".pokemon")

function capitalize(name) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalizedName
}

function createDiv(parsedObject) {
    const li = document.createElement("li")
    pokemonList.append(li)

    const div = document.createElement("div")
    li.append(div)
    div.classList.add("pokemon-listing")

    const figure = document.createElement("figure")
    div.append(figure)

    const img = document.createElement("img")
    img.src = parsedObject.sprites.front_default
    figure.append(img)
    img.alt = capitalize(parsedObject.name)

    const figcaption = document.createElement("figcaption")
    figure.append(figcaption)

    const a = document.createElement("a")
    figcaption.append(a)
    a.innerHTML = capitalize(parsedObject.name)
    a.href = 'pokemon.html?pokemon=' + parsedObject.name
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
            createDiv(parsedResponse);
        })
    })

