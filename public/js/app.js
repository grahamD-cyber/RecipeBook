//App.js includes animations and logic defining the header menu.

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav1 = document.querySelector('.background');
    const homeButton = document.querySelector('.homeButton');
    const browseButton = document.querySelector('.browseButton');

    burger.addEventListener('click', () => {
        nav1.classList.toggle('nav1-active');
    //Animate Links
    if(homeButton.style.animation) {
        homeButton.style.animation = ``;
        browseButton.style.animation = ``;
    } else {
        homeButton.style.animation = `navLinkFade 0.5s ease forwards ${0/7 + 0.5}s`
        browseButton.style.animation = `navLinkFade 0.5s ease forwards ${1/7 + 0.5}s`
    }

    burger.classList.toggle('toggle');

    });
  }
  //Call function
  navSlide();