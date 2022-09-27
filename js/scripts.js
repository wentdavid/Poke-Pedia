// Pokemon list with items



//IIFE pokemonRepository and pokemonList
let pokemonRepository = (function () {
    let pokemonList= 
                    [{name: 'Machamp',height: '1.6',types: ['Fighting']}, 
                    {name: 'Magneton',height: '1',types: ['Electric','Steel']},
                    {name: 'Shiftry',height: '1.3',types: ['Dark','Grass']},
                    {name: 'Charizard',height: '1.7',types: ['Fire','Flying']}];

    function getAll() {
    return pokemonList;
    }
    
    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
          ) {

            pokemonList.push(pokemon);
        }else{
            console.log('Pokemon is not correct');
        }
    }
  
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-list-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
      
    };

  })();
  

// forEach function for pokemonlist
pokemonRepository.getAll().forEach (function(pokemon) {
    pokemonRepository.addListItem(pokemon);
   

});

pokemonRepository.add(pokemon);
    