/* test de ventana para catalogo */

// deteccion de click en la pagina
document.addEventListener('click', function(event) {
    // This function will execute whenever a click occurs anywhere on the document.
    // The 'event' object contains details about the click, including the target element.
    const target = event.target;
    const classes = event.target.classList;
    //console.log('Clicked on:', target);
    //console.log(classes);
    
    if ( classes.contains("btn-show-more") ){ // check if show more button was click
        console.log("open show more");
        //console.log(sibling);
        toggleTest(target.nextElementSibling); // select card-hidden
    }

    if ( classes.contains("btn-close-show-more") ){
        console.log("close show more");
        toggleTest(target.parentElement.parentElement);
    }

});

function toggleTest(targetElement){
    targetElement.classList.toggle("hide-card");
}