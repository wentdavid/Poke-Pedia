// Pokemon list with items



//IIFE pokemonRepository and pokemonList from API
let pokemonRepository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let pokemonListElement = document.querySelector('.list-group-item');
	

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
			});
		}).catch(function(e) {
			console.error(e);
		})
	}

	function add(pokemon) {
		if (
			typeof pokemon === "object" &&
			'name' in pokemon
		) {

			pokemonList.push(pokemon);
		} else {
			console.log('Pokemon is not correct');
		}
	}

	//Returning the pokemonList array
	function getAll() {
		return pokemonList;
	}

	//Adding pokemon items into buttons into .pokemon-list on the index page
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.list-group-item');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-list-button');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		button.addEventListener('click', function(event) {
			showDetails(pokemon);
		});
	};

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
			item.types = details.types;
			item.abilities = details.abilities;
		}).catch(function(e) {
			console.error(e);
		});
	}



	function showDetails(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function() {
			showModal(pokemon);
			// console.log(pokemon);
		});
	};

///Bootstrap modal
	function showModal(item) {
		let modalBody = $('.modal-body');
		let modalTile = $('.modal-title');
		let modalHeader = $('.modal-title');

		//let modalContainer = document.querySelector('.modal-container');
		//modalContainer.innerHTML = ''; // Clear all existing modal content

		modalTile.empty();
		modalBody.empty();

        //creating element for name in modal content
		let nameElement = $('<h1>' + item.name + '</h1>');
		//creating img in modal content
		let imageElementFront = $('<img class="modal-img" style="width:50%">');
		imageElementFront.attr('src', item.imageUrlFront);
		let imageElementBack = $('<img class="modal-img" style="width:50%">');
		imageElementBack.attr('src', item.imageUrlBack);
		//creating element for height in modal content
		let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
		//creating element for abilitiy in modal content
		let abilitiesElement = $('<p>' + 'Ability: ' + item.abilities + '</p>');
		//creating element for types in modal content
		let typesElement = $('<p>' + 'Type: ' + item.types + '</p>');

		modalTitle.append(nameElement);
		modalBody.append(imageElementFront);
		modalBody.append(imageElementBack);
		modalBody.append(heightElement);
		modalBody.append(abilitiesElement);
		modalBody.append(typesElement);
	}




	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
	};
})();


pokemonRepository.loadList().then(function() {
	// Now the data is loaded!
	// forEach function for pokemonlist
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});