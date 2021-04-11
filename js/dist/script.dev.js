"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.addEventListener('DOMContentLoaded', function () {
  'use strict'; //slider

  var slides = document.querySelectorAll('.slider__item');
  var prev = document.querySelector('.shadow-left');
  var next = document.querySelector('.shadow-right');
  var dotsWrap = document.querySelector('.slider__dots');
  var dots = document.querySelectorAll('.dot');
  var slideIndex = Math.floor(Math.random() * dots.length); // nachalnoe sostoyanie i specialnye usloviya

  var showSlides = function showSlides(num) {
    //esli perevalilo za kolichestvo kartinok, to nachinaem snachala
    if (num > slides.length) {
      slideIndex = 1;
    } // elsi 0, to idem k poslednej, eto pro otkrutku v obratnuu storonu


    if (num < 1) {
      slideIndex = slides.length;
    } // pryachem vse slidy


    slides.forEach(function (item) {
      return item.style.display = 'none';
    }); // delaem vse knopki ne aktivnymi

    dots.forEach(function (item) {
      return item.classList.remove('dot-active');
    }); // pokazyvaem nuzhnyj nam slajd

    slides[slideIndex - 1].style.display = 'block'; // delaem activnoj nuzhnuu tochku

    dots[slideIndex - 1].classList.add('dot-active');
  };

  showSlides(slideIndex);

  var changeSlide = function changeSlide(num) {
    showSlides(slideIndex += num);
  };

  var currentSlide = function currentSlide(num) {
    showSlides(slideIndex = num);
  };

  prev.addEventListener('click', function () {
    changeSlide(-1);
  });
  next.addEventListener('click', function () {
    changeSlide(1);
  });
  dotsWrap.addEventListener('click', function (event) {
    for (var i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  }); // auto-slider

  var autoSlide = document.querySelector('.auto-slide');
  var images = ['slide-3.jpg', 'slide-4.jpg', 'slide-5.jpg', 'slide-6.jpg', 'slide-7.jpg'];
  var x = 0;

  var autoSlider = function autoSlider() {
    if (x < images.length) {
      x = x + 1;
    } else {
      x = 1;
    }

    autoSlide.innerHTML = "<img src=\"./img/".concat(images[x - 1], "\"/>");
  };

  setInterval(autoSlider, 1000);
}); /// header

var hamburger = document.querySelector('.header__icon');
var menu = document.querySelector('.header__menu');
hamburger.addEventListener('click', function (e) {
  hamburger.classList.toggle('open');
  menu.classList.toggle('visible');
}); // blog
// post-card

var moreInfoBtn = document.querySelectorAll('.post-card__more');
var moreInfo = document.querySelectorAll('.post-card__info');
moreInfoBtn.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var parent = e.target.parentElement.parentElement.parentElement;
    var target = parent.childNodes;

    if (target[1].style.display === '') {
      target[1].style.display = 'flex';
    } else {
      target[1].style.display = '';
    }
  });
});
var readMoreBtn = document.querySelectorAll('.post-card__btn');
var etc = document.querySelectorAll('.dots');
var addText = document.querySelectorAll('.more-text');
readMoreBtn.forEach(function (btn) {
  return btn.addEventListener('click', function () {
    var parent = btn.parentElement;
    var target = parent.childNodes[7];
    var dots = target.childNodes[1];
    var more_text = target.childNodes[3];
    console.log(dots, more_text);

    if (btn.innerHTML === 'Read more') {
      btn.innerHTML = 'Read less';
      dots.style.display = 'none';
      more_text.style.display = 'inline';
    } else {
      btn.innerHTML = 'Read more';
      dots.style.display = 'inline';
      more_text.style.display = 'none';
    }
  });
}); // pagination

var posts = _toConsumableArray(document.querySelectorAll('.multiple-blog__item'));

var postsWrap = document.querySelector('.multiple-blog__items');
var paginationWrap = document.querySelector('.pagination__pages');
var postsCount = posts.length;
var postsPerPage = 3;
var currentPage = 1;
var pagesCount = Math.ceil(postsCount / postsPerPage);

var showPosts = function showPosts(page) {
  postsWrap.innerHTML = '';
  var firstPost = (page - 1) * postsPerPage;
  var lastPost = firstPost + postsPerPage;
  var pagePosts = posts.slice(firstPost, lastPost);
  postsWrap.innerHTML = '';
  pagePosts.map(function (p) {
    postsWrap.appendChild(p);
  });
};

var PageBtn = function PageBtn(page) {
  var btn = document.createElement('span');
  btn.innerHTML = page;
  btn.classList.add('pagination__element');

  if (page === currentPage) {
    btn.classList.add('current');
  }

  btn.addEventListener('click', function () {
    currentPage = page;
    showPosts(currentPage);
    document.querySelector('.current').classList.remove('current');
    btn.classList.add('current');
    document.querySelector('.pagination__info').innerHTML = "Page ".concat(page, " from ").concat(pagesCount);
  });
  return btn;
};

var pagination = function pagination(page) {
  var buttons = [];

  for (var i = 1; i <= pagesCount; i++) {
    buttons.push(i);
  }

  buttons.map(function (i) {
    paginationWrap.appendChild(PageBtn(i));
  });
};

showPosts(currentPage);
pagination(currentPage);
var searchButton = document.querySelector('.search-button');
var searchForm = document.querySelector('.search-form');
var searchInput = document.querySelector('.search-input');
var searchComment = document.querySelector('.search-comment');
searchButton.addEventListener('click', function (e) {
  e.preventDefault();
  var text = searchInput.value;

  if (!text) {
    searchComment.innerText = 'Please, enter your text';
  }

  if (!window.find(text)) {
    searchComment.innerText = "Can't find ".concat(text);
  }

  searchComment.innerText = '';
  var search = new RegExp("(\\b" + text + "\\b)", "gim");
  var searchArea = document.querySelector('.multiple-blog__items').innerHTML;
  var searchAreaClean = searchArea.replace(/(<mark class="mark">|<\/mark>)/igm, "");
  document.querySelector('.multiple-blog__items').innerHTML = searchAreaClean;
  var result = searchAreaClean.replace(search, "<mark class=\"mark\">$1</mark>");
  document.querySelector('.multiple-blog__items').innerHTML = result;
}); // tabs

tabs = _toConsumableArray(document.querySelectorAll('.tab'));
infoWrap = document.querySelector('.tabs-info');
info = document.querySelectorAll('.tab-info');
var actual = 0;

var showInfo = function showInfo(tab) {
  info.forEach(function (i) {
    i.style.display = 'none';
  });
  info[tab].style = 'block'; //document.classList.contains('now').classList.remove('now');

  tabs[tab].classList.add('now');
};

showInfo(actual);
tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelector('.now').classList.remove('now');
    showInfo(tabs.indexOf(tab));
  });
});