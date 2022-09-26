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
    pokemonList.push(pokemon);
    }
  
    return {
        getAll: getAll,
        add: add
      
    };

  })();
  

// forEach function for pokemonlist
pokemonRepository.getAll().forEach (function(pokemon) {
    console.log (pokemon.name + 's height is ' + pokemon.height + '<br>' );
    document.write (pokemon.name + 's height is ' + pokemon.height + '<br>' );
});

pokemonRepository.add(pokemon);
    