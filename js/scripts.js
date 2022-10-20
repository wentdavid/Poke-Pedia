// Pokemon list with items

//IIFE pokemonRepository and pokemonList from API
const pokemonRepository = (function() {
	const pokemonList = [];
	const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18';
	
	//Fetching pokemon list
	function loadList() {
		return fetch(apiUrl).then(function(response) {
			return response.json();
		}).then(function(json) {
			json.results.forEach(function(item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
				console.log(pokemon);
			});
		}).catch(function(e) {
			console.error(e);
		})
	};

	function add(pokemon) {
		if (
			typeof pokemon === 'object' &&
			'name' in pokemon
		) {

			pokemonList.push(pokemon);
		} else {
			console.log('Pokemon is not correct');
		}
	};

	//Returning the pokemonList array
	function getAll() {
		return pokemonList;
	};

	//Adding pokemon items into buttons into .pokemon-list on the index page
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');

		button.innerText = pokemon.name;
		button.classList.add('pokemon-list-button');
		//For Bootstrap Modal
		button.setAttribute('data-toggle', 'modal');
   		button.setAttribute('data-target', '#pokemon-modal')
        button.classList.add('btn')
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		button.addEventListener('click', function(event) {
			showDetails(pokemon);
		});
	};

	//search function
	const searchInput = document.querySelector('[data-search]')

	searchInput.addEventListener('input', e => {
	const value = e.target.value.toLowerCase()
	pokemonList.forEach(item => {
		const isVisible =
		item.name.toLowerCase().includes(value) 
		button.classList.toggle('hide', !isVisible)
	})
	})

	//Fetching details of a single pokemon from API.
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function(response) {
			return response.json();
		}).then(function(details) {
			// Now we add the details to the item
			item.imageUrlFront = details.sprites.front_default;
			item.imageUrlBack = details.sprites.back_default;
			item.height = details.height;
			item.types = details.types.map((t) => t.type.name);
			item.abilities = details.abilities.map((a) => a.ability.name);


		}).catch(function(e) {
			console.error(e);
		});
	};

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			showModal(pokemon)
			// console.log(pokemon);
		});
	};

	return {
		getAll,
		add,
		addListItem,
		showDetails,
		loadList,
		loadDetails,
		showModal,
	};
})();

pokemonRepository.loadList().then(function() {
	// Now the data is loaded!
	// forEach function for pokemonlist
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});