window.addEventListener("load", function () {
  handleSliderProduct();
});

// RESIZE WINDOW
window.addEventListener("resize", function () {
  let wwindow = window.innerWidth;
  if (wwindow < 768) {
    handleHeader();
  }
});

// HEADER SLIDER
function handleHeader() {
  var swiper = new Swiper(".header__top", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// SCROLL TO
function scrollToSection() {
  const btn = document.querySelector(".btnexplore"),
    section = document.querySelector(".sctabs");
  btn.addEventListener("click", function () {
    window.scrollTo({
      top: section.offsetTop,
      behavior: "smooth",
    });
  });
}
scrollToSection();

// HANDLE TABS
function handleTabsNew() {
  let tabs = document.querySelectorAll(".sctabs__tab-item"),
    listNews = document.querySelectorAll(".sctabs__wrap .article__list");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // remove all class active of tabs
      tabs.forEach(function (tab) {
        tab.classList.remove("active");
      });

      //   add class active
      this.classList.add("active");

      // hide all news list
      listNews.forEach(function (newList) {
        newList.classList.remove("active");
      });

      // get data-tab
      let id = this.dataset.tab;
      // addclass active to news list
      document.querySelector(".article__list-" + id).classList.add("active");
    });
  });
}
handleTabsNew();

// SLIDER PRODUCT
function handleSliderProduct() {
  var swiper = new Swiper(".slider__list", {
    slidesPerView: 4,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      350: {
        slidesPerView: 1.5,
        spaceBetween: 48,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      767: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });
}

// HANDLE ACCORDION
function handleAccordion() {
  const accordions = document.querySelectorAll(".accordion_list-item");

  accordions.forEach((item, index) => {
    let answer = item.querySelector(".answer");
    item.addEventListener("click", () => {
      item.classList.toggle("--active");
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
      removeActive(index);
    });
  });

  function removeActive(index1) {
    accordions.forEach((item2, index2) => {
      let answer = item2.querySelector(".answer");
      if (index1 != index2) {
        item2.classList.remove("--active");
        answer.style.maxHeight = null;
      }
    });
  }
}
handleAccordion();

// //FORM VALIDATE
function validateForm() {
  const form = document.querySelector("#from");
  // submit form
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}
validateForm();
