class PokemonsController < ApplicationController
	def create
		pokemon = Pokemon.new(species: params["species"], nickname: params["nickname"], trainer_id: params["trainer_id"])
		if pokemon.save
			render json: {
						  message: "Pokemon created",
						  pokemon: {
						  			id: pokemon.id,
						  			nickname: pokemon.nickname,
						  			species: pokemon.species,
						  			trainer_id: pokemon.trainer_id
						  }
			}
		else
			render json: {
						  message: "Something went wrong"
			}
		end
	end

	def destroy
		pokemon = Pokemon.find_by(id: params["id"])
		if pokemon.destroy
			render json: {
						  message: "Pokemon released",
						  pokemon: {
							  id: pokemon.id,
							  nickname: pokemon.nickname,
							  species: pokemon.species,
							  trainer_id: pokemon.trainer_id
				}
			}
		else
			render json: {
				message: "Something went wrong"
			}
		end
	end
end
