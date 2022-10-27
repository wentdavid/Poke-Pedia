// Pokemon list with items

//IIFE pokemonRepository and pokemonList from API
const pokemonRepository = (function() {
	const pokemonList = [];
	let prevURL = '';
	let nextURL = ''; 
	
	//Fetching pokemon list
	function loadList(apiUrl) {
		return fetch(apiUrl).then(function(response) {
			return response.json();
		}).then(function(json) {
			console.log("nextUIRL", json.next)
			prevURL = json.previous;
			nextURL = json.next;
			pokemonList.length = 0;
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

	function clearList() {
		let pokemonList = document.querySelector('.pokemon-list');
		pokemonList.innerHTML = '';
	}

	//Returning the pokemonList array
	function getAll() {
		return pokemonList;
	};

	function getNextURL() {
		return nextURL;
	}

	function getPrevURL() {
		return prevURL;
	}

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
		const pokemonList = document.querySelectorAll('.pokemon-list-button');
		pokemonList.forEach(pokemon => {
			if(pokemon.innerText.toLowerCase().includes(value)) {
				pokemon.style.display = '';
			}
			else {
				pokemon.style.display = 'none';
			}
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
		getNextURL,
		getPrevURL,
		clearList,
	};
})();

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18';
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

console.log(prevBtn)

prevBtn.addEventListener('click', (e) => {
	const prevURL = pokemonRepository.getPrevURL();
	if (!prevURL) {
		return;
	}
	pokemonRepository.loadList(prevURL).then(function() {
		pokemonRepository.clearList();
		// Now the data is loaded!
		// forEach function for pokemonlist
		pokemonRepository.getAll().forEach(function(pokemon) {
			pokemonRepository.addListItem(pokemon);
		});
	});
	console.log(pokemonRepository.getPrevURL());
});

nextBtn.addEventListener('click', (e) => {
	const nextURL = pokemonRepository.getNextURL();
	if (!nextURL) {
		return;
	}
	pokemonRepository.loadList(nextURL).then(function() {
		pokemonRepository.clearList();
		// Now the data is loaded!
		// forEach function for pokemonlist
		pokemonRepository.getAll().forEach(function(pokemon) {
			pokemonRepository.addListItem(pokemon);
		});
	});
	console.log(pokemonRepository.getNextURL());
});

pokemonRepository.loadList(apiUrl).then(function() {
	// Now the data is loaded!
	// forEach function for pokemonlist
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});