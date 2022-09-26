// Pokemon list with items
let pokemonList=[{name: 'Machamp',height: '1.6',types: ['Fighting']}, 
                {name: 'Magneton',height: '1',types: ['Electric','Steel']},
                {name: 'Shiftry',height: '1.3',types: ['Dark','Grass']},
                {name: 'Charizard',height: '1.7',types: ['Fire','Flying']}]






function divide (dividend, divisor) {
    if(divisor === 0) {
    return 'You are trying to divide by zero.'
    

    }else{ 
        let result = dividend / divisor;
        return result;
}
}