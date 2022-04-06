const pokemon = document.querySelector("#pokemon")

function capitalize(name) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalizedName
}

function createDiv(pokemonInfo) {
    const div = document.createElement("div")
    div.classList.add("pokemon-details")
    div.innerHTML = `<figure><img src=${pokemonInfo.sprites.front_default} alt=${capitalize(pokemonInfo.name)}>
    <figcaption>${capitalize(pokemonInfo.name)}</figcaption></figure>
    <h2>Abilities</h2>`
    return div
}

function createUl(pokemonInfo) {
    const ul = document.createElement("ul")
    const div = document.querySelector(".pokemon-details")
    ul.classList.add("abilities")
    div.append(ul)
    pokemonInfo.abilities.forEach(element => {
        fetch(element.ability.url)
            .then(response => {
                return response.json()
            }).then(parsedResponse => {
                const englishDescription = parsedResponse.flavor_text_entries.find(ability => ability.language.name = "en")
                const li = document.createElement("li")
                li.innerHTML = `<span class="ability-name">${capitalize(parsedResponse.name)}</span>
                <span class="ability-short-description">${englishDescription.flavor_text}</span > `
                ul.append(li)
            })
    })
}


const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(pokemonInfo => {
        pokemon.append(createDiv(pokemonInfo))
        createUl(pokemonInfo)
        const spinner = document.querySelector(".spinner")
        spinner.classList.add("hidden")
    })

