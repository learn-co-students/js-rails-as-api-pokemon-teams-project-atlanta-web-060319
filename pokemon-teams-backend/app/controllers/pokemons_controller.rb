class PokemonsController < ApplicationController
	def destroy
		pokemon = Pokemon.find_by(id: params["id"])
		if pokemon.destroy
			render json: {
				message: "Pokemon released"
			}
		else
			render json: {
				message: "Something went wrong"
			}
		end
	end
end
