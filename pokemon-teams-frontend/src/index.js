const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", sitesetUp)

function sitesetUp() {
	fetch(TRAINERS_URL)
		.then((response) => response.json())
		.then((jso) => {setUpTrainersandPokemons(jso)});

}

function setUpTrainersandPokemons(trainerArr) {
	let main = document.querySelector("main")

	trainerArr.forEach((trainer) => {
		let div = document.createElement("div")
		div.className = "card"
		div["data-id"] = trainer.id
		div.innerHTML = `<p>${trainer.name}</p>
  						 <button data-trainer-id="${trainer.id}">Add Pokemon</button>`

  		let ul = document.createElement("ul")
  		trainer.pokemons.forEach((pokemon) => {
  				let li = document.createElement("li")
  				li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
  				ul.appendChild(li)
  			}
  		)
  		div.appendChild(ul)
  		main.appendChild(div)
		}
	)

	trainerArr.forEach((trainer) => {
		trainer.pokemons.forEach((pokemon) => {
			let pokemonDeleteButton = document.querySelector(`[data-pokemon-id='${pokemon.id}']`)
			pokemonDeleteButton.addEventListener("click", pokeRelease)
			}
		)
		}
	)
}

function pokeRelease(event) {
	let pokeId = event.target.dataset.pokemonId
	let deleteConfig = {
        method: 'DELETE'
    }
    let currentpokemon = event.target.parentElement
    
    fetch(POKEMONS_URL + `/${pokeId}`, deleteConfig)
    	.then((response) => response.json())
    	.then((jso) => {
    		console.log(jso)
    		currentpokemon.remove()
    		}
    	)
    	.catch((response) => console.log("Error:", response))


}