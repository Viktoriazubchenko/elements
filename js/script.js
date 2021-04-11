

window.addEventListener('DOMContentLoaded', () =>{
    'use strict';
    //slider


    

    let slides = document.querySelectorAll('.slider__item');
    let prev = document.querySelector('.shadow-left');
    let next = document.querySelector('.shadow-right');
    let dotsWrap = document.querySelector('.slider__dots');
    let dots = document.querySelectorAll('.dot');

    let slideIndex = Math.floor(Math.random() * dots.length);

    // nachalnoe sostoyanie i specialnye usloviya
    const showSlides = (num) => {
        //esli perevalilo za kolichestvo kartinok, to nachinaem snachala
        if( num > slides.length){
            slideIndex = 1;
        }
        // elsi 0, to idem k poslednej, eto pro otkrutku v obratnuu storonu
        if( num < 1){
            slideIndex = slides.length;
        }
        // pryachem vse slidy
        slides.forEach((item) => item.style.display = 'none');
        // delaem vse knopki ne aktivnymi
        dots.forEach((item) => item.classList.remove('dot-active'));
        // pokazyvaem nuzhnyj nam slajd
        slides[slideIndex - 1].style.display = 'block';
        // delaem activnoj nuzhnuu tochku
        dots[slideIndex - 1].classList.add('dot-active');

    }

    showSlides(slideIndex);

    const changeSlide = (num) => {
        showSlides(slideIndex += num);
    }

    const currentSlide = (num) => {
        showSlides(slideIndex = num);
    }

   

    prev.addEventListener('click', () =>{
        changeSlide(-1);
    })
     
    next.addEventListener('click', () =>{
        changeSlide(1);
    })


    dotsWrap.addEventListener('click', function(event){
        for (let i = 0; i < dots.length + 1; i++){
            if( event.target.classList.contains('dot') && event.target == dots[i - 1]){
                currentSlide(i);
            }
        }
    });


// auto-slider

    const autoSlide = document.querySelector('.auto-slide');

    const images = [ 'slide-3.jpg', 'slide-4.jpg', 'slide-5.jpg', 'slide-6.jpg', 'slide-7.jpg'];

    let x = 0;

    const autoSlider =  () => {
        if(x < images.length){
            x = x+1;
        } else {
            x = 1;
        }

        autoSlide.innerHTML = `<img src="./img/${images[x - 1]}"/>`;
    }

    setInterval(autoSlider, 1000);
})

/// header





const hamburger = document.querySelector('.header__icon');
const menu = document.querySelector('.header__menu');

hamburger.addEventListener('click', (e) => {
    hamburger.classList.toggle('open');
    menu.classList.toggle('visible');
})

// blog
// post-card

const moreInfoBtn = document.querySelectorAll('.post-card__more');
const moreInfo = document.querySelectorAll('.post-card__info');

moreInfoBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let parent = e.target.parentElement.parentElement.parentElement;
        let target = parent.childNodes;
        if(target[1].style.display === '' ){
            target[1].style.display = 'flex'; 
        } else {
            target[1].style.display = '';
        }
    })
})

const readMoreBtn = document.querySelectorAll('.post-card__btn');
const etc = document.querySelectorAll('.dots');
const addText = document.querySelectorAll('.more-text');


readMoreBtn.forEach((btn) => btn.addEventListener('click', ()=>{
    let parent = btn.parentElement;
    let target = parent.childNodes[7];
    let dots = target.childNodes[1];
    let more_text = target.childNodes[3];
    console.log(dots, more_text);
    if(btn.innerHTML === 'Read more'){
        btn.innerHTML = 'Read less';
        dots.style.display = 'none';
        more_text.style.display = 'inline';
    } else {
        btn.innerHTML = 'Read more';
        dots.style.display = 'inline';
        more_text.style.display = 'none';
    }

}))

// pagination

const posts = [...document.querySelectorAll('.multiple-blog__item')];
const postsWrap = document.querySelector('.multiple-blog__items');
const paginationWrap = document.querySelector('.pagination__pages');

let postsCount = posts.length;
let postsPerPage = 3;
let currentPage = 1;
let pagesCount = Math.ceil(postsCount/postsPerPage);

const showPosts = (page) => {
    postsWrap.innerHTML = '';
    let firstPost = (page - 1) * postsPerPage;
    let lastPost = firstPost + postsPerPage;
    let pagePosts = posts.slice(firstPost, lastPost);
    postsWrap.innerHTML = '';
    pagePosts.map((p) => {
        postsWrap.appendChild(p);
    })
}

const PageBtn = (page) => {
    let btn = document.createElement('span');
    btn.innerHTML = page;
    btn.classList.add('pagination__element');
    if(page === currentPage){
        btn.classList.add('current')
    }
    btn.addEventListener('click', () => {
        currentPage = page;
        showPosts(currentPage);
        document.querySelector('.current').classList.remove('current');
        btn.classList.add('current');
        document.querySelector('.pagination__info').innerHTML = `Page ${page} from ${pagesCount}`;
    })
    return btn;
}

const pagination = (page) => {
    let buttons = [];
    for(let i = 1; i <= pagesCount; i++){
        buttons.push(i);   
    }
    buttons.map((i) => {
        paginationWrap.appendChild(PageBtn(i));
    })
}
 
showPosts(currentPage);
pagination(currentPage);

const searchButton = document.querySelector('.search-button');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const searchComment = document.querySelector('.search-comment');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    let text = searchInput.value;
    if(!text){
        searchComment.innerText = 'Please, enter your text';
    }
    if( !window.find(text)){
        searchComment.innerText = `Can't find ${text}`;
    } 
        searchComment.innerText = '';
        let search = new RegExp("(\\b" + text + "\\b)", "gim");
        let searchArea = document.querySelector('.multiple-blog__items').innerHTML;
        let searchAreaClean = searchArea.replace(/(<mark class="mark">|<\/mark>)/igm, "");
        document.querySelector('.multiple-blog__items').innerHTML = searchAreaClean;
        let result = searchAreaClean.replace(search, `<mark class="mark">$1</mark>`);
        document.querySelector('.multiple-blog__items').innerHTML = result;
        
})


// tabs

tabs = [...document.querySelectorAll('.tab')];
infoWrap = document.querySelector('.tabs-info');
info = document.querySelectorAll('.tab-info');

const actual = 0;

const showInfo = (tab) => {
    info.forEach((i) => {
        i.style.display = 'none';
        
    })
    info[tab].style = 'block'
    //document.classList.contains('now').classList.remove('now');
    tabs[tab].classList.add('now');
}



showInfo(actual);

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelector('.now').classList.remove('now');
        showInfo(tabs.indexOf(tab))   
    })
})

