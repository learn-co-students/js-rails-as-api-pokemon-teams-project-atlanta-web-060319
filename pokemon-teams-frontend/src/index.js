const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", sitesetUp)

function sitesetUp() {
	fetch(TRAINERS_URL)
		.then((response) => response.json())
		.then((jso) => {setUpTrainers(jso);
						return jso
		})
		.then((jso) => {setUpPokemons(jso);
						return jso
		})
		.then((jso) => {addPokemonDelete(jso);
						return jso
		})

}

function setUpTrainers(trainerArr) {
	trainerArr.forEach((trainer) => {
		let div = document.createElement("div")
		div.className = "card"
		div.dataset.id = trainer.id 
		// div["data-id"] = trainer.id 	THIS LINE WAS INCORRECT, I HAVE CORRECTED IT ABOVE.
		div.innerHTML = `<p>${trainer.name}</p>
						 <form class="add-pokemon-${trainer.id}" data-trainer-id="${trainer.id}" action="${POKEMONS_URL}" method="post">
						 	Species:<input type="text" name="species"> </br>
						 	Nickname: <input type="text" name="nickname">
						 	<input type="hidden" name="trainer_id" value=${trainer.id}>
						 	<input type="submit" value="Add Pokemon">
						 </form>`
  		main.appendChild(div)

  		let currentAddBtn = div.querySelector(`.add-pokemon-${trainer.id}`)
  		currentAddBtn.addEventListener("submit", handleAddPoke)
	})
}

function handleAddPoke(event) {
	event.preventDefault()
	let futureLisCount = event.target.parentNode.querySelectorAll("ul li").length + 1

	if (futureLisCount <= 6) {
		let pokeSubmit = {
					  species: event.target[0].value,
					  nickname: event.target[1].value,
					  trainer_id: event.target[2].value
		}

		let addPokeRequestConfig = {
							        method: 'POST',
							        headers: {
									          'Content-Type': 'application/json',
									          "Accept": "application/json"
							        },
						    	    body: JSON.stringify(pokeSubmit)
		}

		fetch(POKEMONS_URL, addPokeRequestConfig)
		.then((response) => response.json())
		.then((jso) => setUp1Pokemon(jso.pokemon))
		.then(() => event.target.reset())
	}
	else {
		event.target.reset()
		console.log("Too many pokemons")
	}

}

function setUpPokemons(trainerArr) {
	trainerArr.forEach((trainer) => {
		let trainerCard = document.querySelector(`[data-id='${trainer.id}']`)
		let ul = document.createElement("ul")
  		
  		trainer.pokemons.forEach((pokemon) => {
			let li = document.createElement("li")
			li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
			ul.appendChild(li)
  		})

  		trainerCard.appendChild(ul)
	})
}

function setUp1Pokemon(pokemon) {
	let trainerCard = document.querySelector(`[data-id='${pokemon["trainer_id"]}']`)
	let ul = trainerCard.querySelector("ul")
	let li = document.createElement("li")

	li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
	
	ul.appendChild(li)
	trainerCard.appendChild(ul)

	let pokemonDeleteButton = document.querySelector(`[data-pokemon-id='${pokemon.id}']`)
	pokemonDeleteButton.addEventListener("click", pokeRelease)
}

function addPokemonDelete(trainerArr) {
	trainerArr.forEach((trainer) => {
		trainer.pokemons.forEach((pokemon) => {
			let pokemonDeleteButton = document.querySelector(`[data-pokemon-id='${pokemon.id}']`)
			pokemonDeleteButton.addEventListener("click", pokeRelease)
		})
	})
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
    	})
    	.catch((response) => console.log("Error:", response))
}