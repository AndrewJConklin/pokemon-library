const pokemon = document.querySelector("#pokemon")

function capitalize(name) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    return capitalizedName
}

function createContainer(parsedObject) {
    const div = document.createElement("div")
    pokemon.append(div)
    div.classList.add("pokemon-details")
    div.innerHTML = `<figure><img src=${parsedObject.sprites.front_default} alt=${capitalize(parsedObject.name)}
    </figure>
    <h2>Abilities</h2>
    <ul class="abilities">
        <li>
            <span class="ability-name">${parsedObject.abilities[0].ability.name}</span>
            <span class="ability-short-description">Ability's short description goes here</span>
        </li>
        <li>
            <span class="ability-name">Ability's name goes here</span>
            <span class="ability-short-description">Ability's short description goes here</span>
        </li>
        <li>
            <span class="ability-name">Ability's name goes here</span>
            <span class="ability-short-description">Ability's short description goes here</span>
        </li>
    </ul>`
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        console.log(parsedResponse)
        createContainer(parsedResponse)
    })

