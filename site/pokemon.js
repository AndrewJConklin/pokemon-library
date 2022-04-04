const pokemon = document.querySelector("#pokemon")

function capitalize(name) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalizedName
}

function createContainer(parsedObject) {
    const div = document.createElement("div")
    pokemon.append(div)
    div.classList.add("pokemon-details")
    div.innerHTML = `<figure><img src=${parsedObject.sprites.front_default} alt=${capitalize(parsedObject.name)}>
    <figcaption>${capitalize(parsedObject.name)}</figcaption></figure>
    <h2>Abilities</h2>`
}

function createUl(parsedObject) {
    const ul = document.createElement("ul")
    const div = document.querySelector(".pokemon-details")
    ul.classList.add("abilities")
    div.append(ul)

    parsedObject.abilities.forEach(element => {
        fetch(element.ability.url)
            .then(response => {
                return response.json()
            }).then(parsedResponse => {
                const li = document.createElement("li")
                li.innerHTML = `<span class="ability-name">${capitalize(parsedResponse.name)}</span>
                <span class="ability-short-description">${parsedResponse.flavor_text_entries[0].flavor_text}</span > `
                ul.append(li)
            })
    })
}


const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        createContainer(parsedResponse)
        createUl(parsedResponse)
    })
