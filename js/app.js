/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/
if(window.location.href.includes("#")){
    window.location = window.location.href.split("#")[0];
    window.scrollTo(0,0);
}
/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
//const navMenu = document.querySelector('.navbar__menu');
const navList = document.querySelector('#navbar__list');
const navFrag = document.createDocumentFragment();
const navListCount = 1;
let secIdsArr = [];
const collapsHeads = document.querySelectorAll('h2');
const topBtn = document.getElementById("topBtn");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function sectionsIds(){
    for(i=0;i<sections.length;i++){
        secIdsArr.push(sections[i].id);
    };
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// Build the nav
function menuPrep(){
    for(const secId of secIdsArr){
        const tileLink = document.createElement("a");
        tileLink.setAttribute("id",`${secId}-link`);
        tileLink.className = "menu__link";
        tileLink.setAttribute("href",`#${secId}`); 
        tileLink.textContent = secId;
        const listTile = document.createElement("li");
        listTile.appendChild(tileLink);
        navFrag.appendChild(listTile);
    }
    navList.appendChild(navFrag);
}
// Add class 'active' to section when near top of viewport
let observer = new IntersectionObserver(
    (entries , observer) => {
        entries.forEach(
            entry => {
                if(entry.isIntersecting===true){
                entry.target.classList.add("your-active-class");
                }else if(entry.isIntersecting===false){
                entry.target.classList.remove("your-active-class");
                }
            }
        );
    },{threshold: 1/2 }
)
// Scroll to anchor ID using scrollTO event
function scrollBehavior(){
    const aLinks = document.querySelectorAll("a");
    for (const link of aLinks) {
        for(const section of sections){
            const rect = section.getBoundingClientRect();
            if(section.id === link.id.slice(0,8)){
                link.addEventListener("click", function () {
                    //window.location.href = window.location.href + `#${section.id}`;
                    for(i=0;i<1;i++){
                    window.scrollTo(rect.top, rect.y);
                    }
                });}
        }
    }

}
// Making each sections's h2 title Collapsable buttons
function addingColClass(){
    for(let head of collapsHeads){
        head.classList.add("colapsee");
        const content = head.nextElementSibling;
        let contentStyle = window.getComputedStyle(content);
        head.addEventListener('click',function (){
            if(contentStyle.getPropertyValue("display") === "block"){
                content.setAttribute("style" , "display:none;");
            }else{
                content.setAttribute("style" , "display:block;");
            }
        });
    }
}
// Hide fixed navigation bar while not scrolling
function hidingNavBar(){
    let previousPos = window.pageYOffset;
    const navBar =  document.getElementById("navbar__list");
    document.addEventListener("scroll",()=>{
        let currentPos = window.pageYOffset;
        setTimeout(()=>{
            if(previousPos === currentPos){
                navBar.style.display = "none";
            }else{
                navBar.style.display = "block";
            }
        },2000);
        previousPos = currentPos;
    });

}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("load",sectionsIds());
document.addEventListener("load",menuPrep());
// Scroll to section on link clickmanipulating the url with js
scrollBehavior();
// Set sections as active
document.addEventListener("click",() =>{
  document.querySelectorAll('section').forEach(sec =>{observer.observe(sec)});  
});
// Calling the Collapse function
addingColClass();
// Calling Hidding the NavBar while not Scrolling Function
hidingNavBar();
// Floating the ScrollToTop Button
window.onscroll = () => {
    if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }
}





















