const pokemon = document.querySelector("#pokemon")
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetchAndParse(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(pokemonInfo => {
        pokemon.append(createDiv(pokemonInfo))
        const div = document.querySelector(".pokemon-details")
        div.append(createUl(pokemonInfo))
        const spinner = document.querySelector(".spinner")
        spinner.classList.add("hidden")
    })

function capitalize(name) {
    return capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
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
    ul.classList.add("abilities")
    pokemonInfo.abilities.forEach(abilitityObject => {
        fetch(abilitityObject.ability.url)
            .then(abilityUrl => {
                return abilityUrl.json()
            }).then(abilityInfo => {
                ul.append(createAbilityLi(abilityInfo))
            })
    })
    return ul
}

function createAbilityLi(abilityInfo) {
    const englishDescription = abilityInfo.flavor_text_entries.find(ability => ability.language.name = "en")
    const li = document.createElement("li")
    li.innerHTML = `<span class="ability-name">${capitalize(abilityInfo.name)}</span>
    <span class="ability-short-description">${englishDescription.flavor_text}</span > `
    return li
}

function fetchAndParse(url) {
    return fetch(url).then(response => response.json())
}