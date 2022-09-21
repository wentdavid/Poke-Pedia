// Pokemon list with items
let pokemonList=[{name: 'Machamp',height: '1.6',types: ['Fighting']}, 
                {name: 'Magneton',height: '1',types: ['Electric','Steel']},
                {name: 'Shiftry',height: '1.3',types: ['Dark','Grass']},
                {name: 'Charizard',height: '1.7',types: ['Fire','Flying']}]

// for loop that iterates over each item in pokemonList
for (let i = 0; i < pokemonList.length; i++) 
{
    // looks for the biggest Pokémon and adds text
        if(pokemonList[i].height > 1.6) {
            document.write(pokemonList[i].name + ' ' + '\(height: ' + pokemonList[i].height + '\)' + ' - With ' + pokemonList[i].name + ' you have a huge Pokémon!' + '<br>');
    } else {  
        // goes through the rest of the items without further comments
            document.write(pokemonList[i].name + ' ' + '\(height: ' + pokemonList[i].height + '\)' + '<br>');
        }

}