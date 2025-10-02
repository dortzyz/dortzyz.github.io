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

function holaMundo(){
    console.log("hola mundo");
}

// active link on scroll
// https://www.youtube.com/watch?v=UoE1hqfpXX0

window.onload = () => {
    activeLinkOnScreen();
};

window.onscroll = () => {
    activeLinkOnScreen();
};

window.onresize = () => { 
    activeLinkOnScreen(); 
}

//document.addEventListener( "touchmove", activeNavLink, true);
//document.addEventListener( "scroll", activeNavLink, false);

function activeLinkOnScreen(){
    let screenX = window.innerWidth;
    //let screenY = window.innerHeight;
    //console.log(screenX,screenY)
    if ( screenX > 700){
        activeNavLink();
    }
    else {
        removeActiveLink();
    }
}

function activeNavLink(){
    let sections = document.querySelectorAll('section');
    let navlinks = document.querySelectorAll('div.nav-bar a');
    let navBar = document.querySelector('div.nav-box');

    let currPos = window.pageYOffset + 120;// + navBar.offsetHeight; // offset del navbar
    //let viewPosX = window.pageXOffset;
    //let viewPosY = window.pageYOffset;
    console.log(currPos);

    let firstNavLink = navlinks[0];
    let firsSection = sections[0];
    //console.log(firstNavLink); 

    sections.forEach(sec => {
        
        //let offset = sec.offsetTop - 0;
        //let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        //console.log(sec);

        let selectorTop = sec.offsetTop - (sec.offsetHeight * 0);
        let selectorBottom = sec.offsetTop + sec.offsetHeight - (sec.offsetHeight * 0);

        if (sec == firsSection){
            selectorTop = 0;
        }

        //console.log( sec, `offset: ${offset}`, `height: ${height}` );
        console.log("ventana",selectorTop,selectorBottom);

        if ( currPos >= selectorTop && currPos <= selectorBottom ){
            navlinks.forEach(links => {
                links.classList.remove('active');
            });
            //console.log(sec,firstNavLink);
            if (sec == firsSection){
                firstNavLink.classList.add('active');
            }
            else{
                document.querySelector(`div.nav-bar a[href*="${id}"]`)?.classList.add('active');
            }
            
        }

    });
}

function removeActiveLink(){
    let navlinks = document.querySelectorAll('div.nav-bar a');
    navlinks.forEach( links => {links.classList.remove('active');} );
}


/*
document.addEventListener('DOMContentLoaded', () => {
    //const currentPath = window.location.pathname;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('div.nav-bar a');

    console.log(navLinks);

    sections.forEach( (sec) => {
        let id = sec.getAttribute('id');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === id) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    })

    
});
*/