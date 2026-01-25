/* test de ventana para catalogo */

// deteccion de click en la pagina
document.addEventListener('click', function(event) {
    // This function will execute whenever a click occurs anywhere on the document.
    // The 'event' object contains details about the click, including the target element.
    const target = event.target;
    const classes = event.target.classList;
    //console.log('Clicked on:', target);
    //console.log(classes);
    
    if ( classes.contains("btn-show-more") ){
        if (classes.contains("pos-absolute-BR")){
            toggleTest(target.nextElementSibling); // select card-hidden
        }
        else {
            toggleTest(target.parentElement.parentElement.nextElementSibling); // select card-hidden
        }
        
    }

/*     if ( classes.contains("btn-show-more") ){ // check if show more button was click
        console.log("open show more");
        //console.log(sibling);
        toggleTest(target.nextElementSibling); // select card-hidden
    } */

    if ( classes.contains("btn-close-show-more") ){
        console.log("close show more");
        toggleTest(target.parentElement.parentElement);
    }
});

function toggleTest(targetElement){
    targetElement.classList.toggle("hide-card"); //css con propiedad transform: translateY
}

const template_card_class = ".card-section-box"
const section_title_class = ".titulo-index"
const gb_style_no_display = "gb-no-display"

function holaMundo(){
    console.log("hola mundo");

    let templateNode = document.querySelector(template_card_class);
    console.log(templateNode)
    dummyToggleStyle(templateNode,gb_style_no_display)
    templateNode = document.querySelector(section_title_class);
    dummyToggleStyle(templateNode,gb_style_no_display)
    //fetchJsonFiles();
    //dummyToggleStyle(document.querySelector("div.section-box"),"gb-no-display")
    //dummyToggleStyle(document.querySelector("footer"),"gb-no-display")
    //dummyToggleStyle(document.querySelector("div.nav-box"),"gb-blur-effect")
}

// active link on scroll
// https://www.youtube.com/watch?v=UoE1hqfpXX0

window.onload = () => {
    fetchJsonFiles();
    activeLinkOnScreen();
    //dummyToggleStyle(document.querySelector("div.section-box"),"gb-no-display")
};

window.onscroll = () => {
    activeLinkOnScreen();
};

window.onresize = () => { 
    activeLinkOnScreen(); 
}

window.onbeforeunload = () => {
    window.scrollTo(0,0);
    //window.location.reload();
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
    //console.log(currPos); // debug

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
        //console.log("ventana",selectorTop,selectorBottom);

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
                //console.log("section",id); //debug
            }
            
        }

    });
}

function removeActiveLink(){
    let navlinks = document.querySelectorAll('div.nav-bar a');
    for (link of navlinks){
        link.classList.remove("active");
    }
}

function dummyToggleStyle(selectorHtml,style){
    selectorHtml.classList.toggle(style);
    //console.log(selectorHtml);
}


/* Lectura de datos desde archivo json */
function fetchJsonFiles(){
    fetch("./json/datos.json") // comprobacion de carga
        .then(res => res.json())
        .then(data => readJSONData(data))
        .catch(info => errorFun(info))
        
}

function errorFun(error){
    console.log("json file not found.")
    console.log(`error: ${error}`)
}


const main_container_node = "div.main-box";

function readJSONData(json_file){
    //console.log("json data",json_file);
    let element_selector = document.querySelector(main_container_node);
    const sectionCount = element_selector.children.length - 1;
    //console.log("secciones en html: ",sectionCount)

    for (let i = 0; i < sectionCount; i++ ){
        let json_element = 0;

        if (json_file[i]){
            json_element = json_file[i]
        }
        //console.log(i,"json elemnt",json_element)
        if (json_element.filename){
            //fetchSectionData(json_element.filename);
            fetchSectionData2(json_element.sectionId,json_element.filename)
        }
    }
}

function fetchSectionData2(sectionId,filename){
    fetch(`./json/${filename}.json`)
        .then(res => res.json())
        .then(fileValues => {
            //console.log("json data fetch: ",fileValues[0].cards);

            let boxes = findEmptyBoxes(sectionId);
            let elementsToShow = getElementsToShow(fileValues);
            console.log(sectionId,"cajas: ",boxes.length, "elementos: ",elementsToShow.length);
            //console.log(elementsToShow);

            let elementsToFill = [];
            let elementsToMake = [];
            let boxesToErase = [];
            
            elementsToFill = elementsToShow.slice(0,boxes.length);
            elementsToMake = elementsToShow.slice(elementsToFill.length,elementsToShow.length);
            if ( boxes.length > elementsToShow.length ){
                boxesToErase = boxes.slice(elementsToShow.length,boxes.length);
            }
            //console.log(sectionId,"to fill:",elementsToFill.length,"to make: ",elementsToMake.length,"to erase: ", boxesToErase.length);

            for (let i = 0; i < elementsToFill.length; i++){
                fillHtmlBox(elementsToFill[i],sectionId,boxes[i]);
            }

            for (element of elementsToMake){
                createCardBox(element,sectionId);
            }

            for (value of boxesToErase){
                dummyToggleStyle(getChildBoxNode(sectionId,value),"gb-no-display")
            }
        })
        
        .catch(info => console.log(`error : ${info}`))
}

// const findEmptyBoxes = (htmlId) =>
function findEmptyBoxes(htmlId){
    let emptyBoxes = [];
    const sectionNode = document.querySelector(`#${htmlId}`);

    for (let i = 0; i < sectionNode.children.length; i++){
        if ( sectionNode.children[i].classList.contains("card-section-box") && !(sectionNode.children[i].classList.contains("gb-no-display")) ){
            emptyBoxes.push(i);
        }
    }
    //if (emptyBoxes.length == 0){ console.log("vacio")}
    //console.log(htmlId,emptyBoxes)
    return emptyBoxes
}

function getElementsToShow(object){ // agregar elemento si hay algun item para mostrar
    let validElements = [];
    
    for ( let element of object ){
        let items = element.cards;
        let check = 0;
        for ( let item of items){
            check = check + item.itemShow;
        }
        if ( check ){
            validElements.push(element);
        }
    }
    //console.log(validElements.length)

    return validElements
}

function fillHtmlBox(element,idNode,childPos){
    let string = createHtmlCards(element.cards);

    const parentNode = document.querySelector(`#${idNode}`);
    const childBoxNode = parentNode.children[childPos];
    //console.log(childBoxNode.children[1])
    childBoxNode.children[0].textContent = element.subsectionTitle;
    childBoxNode.children[1].insertAdjacentHTML('beforeend',string);

}

function createHtmlCards(array){
    let htmlString = "";
    for (const card of array){
        if ( card.itemShow ){
            htmlString = htmlString + createItemCard(card);
        }
    }
    return htmlString

}

function createCardBox(jsonObject,sectionId){
    const title = jsonObject.subsectionTitle;
    let cardsCreated = createHtmlCards(jsonObject.cards);
    //console.log("cards: ",cardsCreated);
    
    let card_box_template =
        `<div class="card-section-box">
            <div class="subsection-title">${title}</div>
            <div class="card-section-container">${cardsCreated}</div>
        </div>`;

    const parentNode = document.querySelector(`#${sectionId}`);
    parentNode.insertAdjacentHTML('beforeend',card_box_template);
    //card_container_selector.insertAdjacentHTML('beforeend',cardsCreated);
}

function getChildBoxNode(idNode,childPos){
    const parentNode = document.querySelector(`#${idNode}`);
    const childBoxNode = parentNode.children[childPos];

    return childBoxNode;
}

function createItemCard(card_object){
    //console.log(card_object);
    const sku = card_object.itemSku;
    const available = card_object.itemAvailable;
    const title = card_object.itemTitle;
    const subtitle = card_object.itemSubtitle;
    let price = card_object.price;
    let sale_price = card_object.salePrice;
    let features = card_object.itemFeat;
    let imgName = card_object.itemImg;

    let availableTag = "$";
    let showSaleTag = "gb-no-display";
    let wholeprice = 0;
    let discount = 0;
    let imgPath = "";

    if ( available ){
        if ( (price > sale_price) && (sale_price > 0) ){
            discount = (1 - (sale_price / price)) * 100;
            //console.log(discount.toFixed(0));
            wholeprice = price;
            price = sale_price;
            showSaleTag = "";
        }
    }else{
        availableTag = "No disponible";
        price = "";
    }

    //console.log(typeof imgName)
    if ( sku ){
        imgPath = "img/" + "store_sku_" + sku + ".jpg";
    }

    if ( imgName ) {
        imgPath = "img/" + imgName +".jpg";
    }

    let list_html = array2htmlList(features);
    
    let item_card_template = 
        `<div class="item-box">
            <div class="item--container">
                <div class="item--info">
                    <div class="item--img">
                        <div class="lc-item-img-size-x">
                            <img src="${imgPath}" alt=" Sin imagen de ${title}">
                        </div>
                    </div>
                    <div class="item--title">
                        <p class="gb-truncate-text-lines-1">${subtitle}</p>
                        <h3 class="gb-truncate-text-lines-3">${title}</h3>
                    </div>
                </div>
                <div class="item--footer">
                    <div>
                        <div class="item--price">${availableTag}${price}</div>
                        <div class="gb-flex-container lc-item-sale-tag ${showSaleTag}">
                            <div class="item--wholeprice">$${wholeprice}</div>
                            <div class="item--discount">-${discount.toFixed(0)}%</div>
                        </div>
                    </div>
                    
                    <button type="button" class="btn-show-more gb-open-new-symbol">Ver mas</button>
                </div>
            </div>
            <div class="hide-card item-description-box">
                <div class="item-description--header">
                    <div class="btn-close-show-more">Cerrar</div>
                    <div class="gb-flex-container">
                        <h3 class="gb-truncate-text-lines-2">${title}</h3>
                    </div>
                </div>
                <div class="item-description--feat">
                    <p>Caracteristicas</p>
                    <ul>
                        ${list_html}
                    </ul>
                </div>
            </div>
        </div>`;
        
    return item_card_template
}

function array2htmlList(array){
    let html = "";
    if ( typeof array == "object" ){
        array.forEach( item => {
            html = html + `<li>${item}</li>`;
        });
        //console.log("html: ",html);
    }
    return html
}

/*
function cardContainerSelector(baseSelector){
    let lastCardBox = baseSelector.lastChild;
    let cardContainerPos = (lastCardBox.children.length - 1);

    return lastCardBox.children[cardContainerPos]
}
*/

/* opener rest to secure external links */
/*
var newWnd = window.open();
newWnd.opener = null;
console.log("reset opner")
*/
