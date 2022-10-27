///Bootstrap modal
function showModal(item) {
		
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    //let modalContainer = document.querySelector('.modal-container');
    //modalContainer.innerHTML = ''; // Clear all existing modal content

    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $('<h1>' + item.name + '</h1>');
    //creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:40%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:40%">');
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
};