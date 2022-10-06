// Pokemon list with items



//IIFE pokemonRepository and pokemonList from API
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Fetching pokemon list
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }

      function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            'name' in pokemon && 'detailsUrl' in pokemon
          ) {

            pokemonList.push(pokemon);
        }else{
            console.log('Pokemon is not correct');
        }
    }

    //Returning the pokemonList array
    function getAll() {
    return pokemonList;
    }
    
    //Adding pokemon items into buttons into .pokemon-list on the index page
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-list-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(event) {showDetails(pokemon);
        });
    }

    //Fetching details of a single pokemon from API.
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
          item.ability = details.ability.name;
        }).catch(function (e) {
          console.error(e);
        });
      }
  
    

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
           showModal(pokemon);
            // console.log(pokemon);
          });
    };

    function showModal(pokemonList) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        
        let pokemonTitle = document.createElement('h1');
        pokemonTitle.innerText = pokemon.name;

        let pokemonAbilities = document.createElement('p');
        pokemonAbilities.innerText = "Abilitiy " + pokemon.ability;
        
        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = "Height: " + pokemon.height;

        let pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = "Type: " + pokemon.ability;

        let pokemonImage = document.createElement('img');
        pokemonImage.innerText = pokemon.imageUrl;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonTitle);
        modal.appendChild(pokemonAbilities);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
      }
      
      function hideModal() {
        modalContainer.classList.remove('is-visible');
        
        if (dialogPromiseReject) {
          dialogPromiseReject();
          dialogPromiseRejct = null;
        }
      }
      
      function showDialog(title, text) {
        showModal(title, text);
        
        // We want to add a confirm and cancel button to the modal
        let modal = modalContainer.querySelector('.modal');
        
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';
        
        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';
        
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);
        
        // We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();
        
        // Return a promise that resolves when confirmed, else rejects
        return new Promise((resolve, reject) => {
          cancelButton.addEventListener('click', hideModal);
          confirmButton.addEventListener('click', () => {
            dialogPromiseReject = null; // Reset this
            hideModal();
            resolve();
          });
          // This can be used to reject from other functions
          dialogPromiseReject = reject;
        });
      }
    
      
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
      });
      
      document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
          alert('confirmed!');
        }, () => {
          alert('not confirmed');
        });
      });
    
    
      
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
    

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
      
    };

  })();

  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    // forEach function for pokemonlist
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });