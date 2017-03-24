function onReady() { // Handler when the DOM is fully loaded
  var navHamburger = document.querySelector(".nav__hamburger");
  var navMenu = document.querySelector(".nav-menu");
  var navMenuCross = document.querySelector(".nav-menu__cross");
  var navMenuListItems = document.querySelectorAll(".nav-menu__list-item");
  var navMenuSeparator = document.querySelector(".nav-menu__separator");
  var navMenuText = document.querySelector(".nav-menu__text");
  var navMenuEmail = document.querySelector(".nav-menu__email");
  var navMenuSocialBtn = document.querySelector(".nav-menu__social-btn");
  var readMoreArray = "";
  navMenu.inert = true;

  function animateElements() {
    // Creating array from NodeList:
    var menuItemsArray = [].slice.call(navMenuListItems);
    // Concat all elements for animation together:
    var elementsForAnimation = [navMenuSeparator, navMenuText, navMenuEmail, navMenuSocialBtn].concat(menuItemsArray);
    // Loop through elements
    elementsForAnimation.forEach(function(element) {
      element.classList.toggle("nav-menu__items__animation");
    });

    navMenuCross.classList.toggle("nav-menu__cross__animation");
  }

  /* show menu */
  function showMenu(e){
    e.stopPropagation();
    navHamburger.style.visibility = "hidden";
    navMenu.style.width = "250px";
    navMenuCross.style.display = "block";
    animateElements();
    navMenu.inert = false;
  }

  /* hide menu */
  function hideMenu(){
    navMenuCross.style.display = "none";
    navMenu.style.width = "0px";
    navHamburger.style.visibility = "visible";
    animateElements();
    navMenu.inert = true;
  }

  /* show more text */
  function aboutText(e){
    var itemOne = document.querySelector("#item__one");
    var itemTwo = document.querySelector("#item__two");
    var itemThree = document.querySelector("#item__three");
    var readMoreData = e.target.dataset.name;

    function textUnfold(item, height){
      if(item.style.height != height){
        item.style.transition = "all 1s ease-out";
        item.style.height = height;
        e.target.classList.toggle("about__me__more__slide");
        e.target.innerHTML = "read less";
      }else{
        item.style.transition = "all 1s ease-out";
        item.style.height = "360px";
        e.target.classList.toggle("about__me__more__slide");
        e.target.innerHTML = "read more";
      }
    }

    if(readMoreData == "item-one-more"){
      textUnfold(itemOne, "660px");
    }else if(readMoreData == "item-two-more"){
      textUnfold(itemTwo, "820px");
    }else if(readMoreData == "item-three-more"){
      textUnfold(itemThree, "750px");
    }
  }

  /* Check body */
  function checkBody(){
    var nav = document.querySelector(".nav");
    var header = document.querySelector(".header");
    var mainContainer= document.querySelector(".main-container");
    var aboutMeContainer = document.querySelector(".about-me__container");
    var projectContainer = document.querySelector(".project__container");
    var readMore = document.querySelectorAll(".about-me__more");

    if(document.body.id == "body-index"){
      nav.addEventListener("click", hideMenu);
      header.addEventListener("click", hideMenu);
      mainContainer.addEventListener("click", hideMenu);
    }else if(document.body.id == "body-project"){
      nav.addEventListener("click", hideMenu);
      projectContainer.addEventListener("click", hideMenu);
    }else if(document.body.id == "body-about"){
      nav.addEventListener("click", hideMenu);
      aboutMeContainer.addEventListener("click", hideMenu);
      readMoreArray = [].slice.call(readMore);
      readMoreArray.forEach(function(element){
        element.addEventListener("click", aboutText, false);
      });

    }
  }
  /*function addClickListener(elements, callback) {
    elements.forEach(function(element) {
      element.addEventListener("click", callback);
    });
  }

  function checkBody(){
    var nav = document.querySelector(".nav");
    var header = document.querySelector(".header");
    var mainContainer= document.querySelector(".main-container");
    var aboutMeContainer = document.querySelector(".about-me__container");
    var projectContainer = document.querySelector(".project__container");
    var readMore = document.querySelector(".about-me__more");

    var settings = {
      "body-index": [nav, header, mainContainer],
      "body-project": [nav, projectContainer],
      "body-about": [nav, aboutMeContainer, readMore]
    };

    addClickListener(settings[document.body.id], hideMenu);
    addClickListener(settings[document.body.id], showAboutText);

  }*/


  function addClickListener(elements, callback) {
    elements.forEach(function(element) {
      element.addEventListener("click", callback);
    });
  }

/* Portfolio buttons */
  function selectButton(){
    var portfolioButtons = document.querySelectorAll(".portfolio__nav__btn");
    var buttonsArray = [].slice.call(portfolioButtons);

    addClickListener(buttonsArray, portfolioItems);
  }

/* Portfolio items to sort */
  function portfolioItems(e){
    var button = e.target.dataset.btnName;
    var portfolioItems = document.querySelectorAll(".portfolio__item");
    var portfolioItemsArray = [].slice.call(portfolioItems);

    portfolioItemsArray.forEach(function(element){

      function showElement(){
        element.classList.remove("portfolio__item__hide");
        element.classList.add("portfolio__item__show");
        /*element.style.width = "450px";
        element.style.transform = "translate(0px, 0px) scale(1, 1)";
        element.style.height = "320px";
        element.style.margin = ".5em";
        element.style.opacity = 1;
        element.style.zIndex = "2";*/
      }
      function hideElement(){
        element.classList.remove("portfolio__item__show");
        element.classList.add("portfolio__item__hide");
        /*element.style.width = "0px";
        element.style.transform = "translate(-450px, 320px) scale(.5, .5)";
        element.style.height = "0";
        element.style.margin = "0";
        element.style.opacity = 0.5;
        element.style.zIndex = "1";*/

      }
      function portfolioItemSort(elementName){
        if(element.dataset.name != elementName){
          hideElement();
        }else{
          showElement();
        }
      }
      if(button == "websites-btn"){
        portfolioItemSort("website");
      }else if(button == "apps-btn"){
        portfolioItemSort("app");
      }else if(button == "illustrations-btn"){
        portfolioItemSort("illustration");
      }else if (button == "all-btn"){
        showElement();
      }
    });
  }

  /* Scroll to a section */
  function addScrollEffects() {
    $(".nav-menu__link").click(function(){
      hideMenu();
      $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top
      }, 800);
      return false;
    });

    $(".nav__logo__link, .header__btn").click(function(){
      $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top
      }, 800);
      return false;
    });
  }

  // Make all initial processes in one place
  function init() {
    addScrollEffects();
    navHamburger.addEventListener("click", showMenu);
    navMenuCross.addEventListener("click", hideMenu);
    checkBody();
    selectButton();
  }

  init();

}

// Vanilla JS analogue $(document).ready
(function() {
  if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    onReady();
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
})();
