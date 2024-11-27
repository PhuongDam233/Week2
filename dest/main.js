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

// HANDLE POPUP
function handlePopup() {
  const btnClose = document.querySelector(".popup__inner-close"),
    btnShop = document.querySelector(".btnshop"),
    popup = document.querySelector(".popup"),
    sectabs = document.querySelector(".sctabs");

  btnClose.addEventListener("click", closePopup);

  btnShop.addEventListener("click", () => {
    closePopup();
    window.scrollTo({
      top: sectabs.offsetTop,
      behavior: "smooth",
    });
  });

  popup.addEventListener("click", closePopup);
  // Close popup
  function closePopup() {
    popup.classList.remove("active");
    localStorage.setItem("lastShown", Date.now());
  }
  // add popup
  function openPopup() {
    popup.classList.add("active");
  }
  const lastShown = localStorage.getItem("lastShown");
  // Kiểm tra xem đã quá 4h kể từ lần hiển thị cuối cùng chưa
  if (lastShown) {
    const now = Date.now();
    const diff = now - parseInt(lastShown);
    if (diff < 4 * 60 * 60 * 1000) {
      return;
    }
  }
  // Sự kiện khi người dùng tương tác
  let timeout;
  document.addEventListener("mousemove", () => {
    clearTimeout(timeout);
    timeout = setTimeout(openPopup, 3000);
  });
  document.addEventListener("touchstart", () => {
    clearTimeout(timeout);
    timeout = setTimeout(openPopup, 3000);
  });
}
handlePopup();

// FORM VALIDATE
function Validator(options) {
  function valiate(inputElement, rule) {
    var errorMessage = rule.test(inputElement.value);
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("--invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("--invalid");
    }
  }

  // lấy element của form cần validate
  var formElement = document.querySelector(options.form);

  if (formElement) {
    //khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();
      var isFormValid = true;

      // lặp qua từng rule và validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = valiate(inputElement, rule);
        // Tồn tại 1 kí tự invalid rule => error
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        var $form = $("form#from"),
          url =
            "https://script.google.com/macros/s/AKfycbwBstL25AahbiFJ3duU9fWGxcNhHr49NT7XYGOXpyyolcgCGWZ2OITTVOjnJc5KDOoLHQ/exec";
        e.preventDefault();
        var data = $form.serialize();
        var jqxhr = $.ajax({
          url: url,
          method: "POST",
          dataType: "json",
          data: data,
          success: function (data) {
            if (data == "false") {
              alert("Thêm không thành công");
            } else {
              alert("Đã thêm dữ liệu vào Form");
            }
          },
        });
        // return false;
      }
    };

    // lặp qua và xử lí
    options.rules.forEach(function (rule) {
      var inputElement = formElement.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.querySelector(
        options.errorSelector
      );

      if (inputElement) {
        // xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          valiate(inputElement, rule);
        };
        // Xử lí khi người dùng nhập
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("--invalid");
        };
      }
    });
  }
}
// Nguyên tắc của rules:
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Please fill out this field";
    },
  };
};

Validator.isNumber = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\d{10}$/;
      return regex.test(value) ? undefined : "This field must be number";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "This field must be email";
    },
  };
};

Validator({
  form: "#formgroup",
  formGroupSelector: ".formgroup__input",
  errorSelector: ".form-error",
  rules: [
    Validator.isRequired("#name"),
    Validator.isEmail("#email"),
    Validator.isNumber("#phone"),
    Validator.isRequired("#address"),
    Validator.isRequired("#message"),
  ],
});

Validator({
  form: "#from",
  formGroupSelector: ".formcontact",
  errorSelector: ".form-error",
  rules: [Validator.isEmail("#emailfooter")],
});

// SEND EMAIL TO EXCEL
function sendForm() {
  // đem tất cả dữ liệu trong form id là 'google-form' gom thành biến data
  let data = $("#from").serialize();

  $.ajax({
    //Sử dụng Ajax gửi dữ liệu đi
    url: "https://script.google.com/macros/s/AKfycbwyHfwLLFRgypFtdRUc-bVXP69t1TxqSn7fIIzOZ5n-avLWrY8BkM6_7rjbolewers2zw/exec",
    method: "GET",
    dataType: "json",
    data: data,
    success: function (responseData, textStatus, jqXHR) {},
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });

  window.jQuery(this).trigger("reset");
  alert("Success!");

  return true;
}
