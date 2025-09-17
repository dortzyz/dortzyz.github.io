/* test de ventana para catalogo */

// deteccion de click en la pagina
document.addEventListener('click', function(event) {
    // This function will execute whenever a click occurs anywhere on the document.
    // The 'event' object contains details about the click, including the target element.
    const target = event.target;
    const classes = event.target.classList;
    //console.log('Clicked on:', target);
    //console.log(classes);
    
    
    if ( classes.contains("btn-show-more")){ // check if show more button was click
        console.log("open show more");
        //const sibling = target.nextElementSibling; // select card-hidden
        //console.log(sibling);
        //sibling.classList.toggle('card-hidden-reveal')
        //console.log(sibling.classList.length);
        toggleTest(target.nextElementSibling);
        
    }

    if ( classes.contains("btn-close-show-more") ){
        console.log("close show more");
        toggleTest(target.parentElement.parentElement);
    }


    // Example: Check if the click was outside a specific element
    const myElement = document.getElementById('mySpecificElement');
    if (myElement && !myElement.contains(event.target)) {
        console.log('Clicked outside mySpecificElement');
        // Perform actions when clicked outside
    }
});

function toggleTest(targetElement){
    targetElement.classList.toggle("hide-card");
}