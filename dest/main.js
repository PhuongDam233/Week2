window.addEventListener("load", function () {
  handleSliderProduct();
  checkPopup();
  checkCookie();
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
  const btnClose = document.querySelector(".closepopup"),
    btnCloseSuccess = document.querySelector(".closepopupsuccess"),
    popup = document.querySelector(".popup"),
    popupSuccess = document.querySelector(".popup-success");

  btnClose.addEventListener("click", closePopup);

  popup.addEventListener("click", closePopup);
  // btn close success
  btnCloseSuccess.addEventListener("click", () => {
    popupSuccess.classList.remove("active");
  });
  // Close popup
  function closePopup() {
    popup.classList.remove("active");
    localStorage.setItem("popupClosedAt", Date.now());
  }
}

handlePopup();

function checkPopup() {
  const popup = document.querySelector(".popup");
  const lastClosedAt = localStorage.getItem("popupClosedAt");
  const now = Date.now();
  if (lastClosedAt) {
    const timeDiff = now - parseInt(lastClosedAt);
    if (timeDiff >= 4 * 60 * 60 * 1000) {
      // 4 giờ = 4 * 60 * 60 * 1000 milliseconds
      localStorage.removeItem("popupClosedAt");
    }
  } else {
    // Hiển thị popup lần đầu
    userContact();
  }
  function userContact() {
    let timeout;
    document.addEventListener("mousemove", () => {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        popup.classList.add("active");
      }, 3000);
    });
    document.addEventListener("touchstart", () => {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        popup.classList.add("active");
      }, 3000);
    });
  }
  // let value = getCookie("timeDiff");
  // if (value !== "") {
  //   userContact();
  // } else {
  //   popup.classList.remove("active");
  // }
  // const cookies = document.cookie.split(";");
  // for (let i = 0; i < cookies.length; i++) {
  //   const cookie = cookies[i].trim();
  //   if (cookie.startsWith("timeDiff")) {
  //     popup.classList.remove("active");
  //     return true;
  //   }
  // }
  // return false;
}

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
    return !errorMessage;
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
        if (typeof options.onsubmit === "function") {
          // Lấy giá trị từ các trường của Contact Form
          var enableInput = formElement.querySelectorAll("[name]");
          var formValue = Array.from(enableInput).reduce(function (
            value,
            input
          ) {
            return (value[input.name] = input.value) && value;
          },
          {});
          let body = JSON.stringify({
            name: formValue.name,
            email: formValue.email,
            phone: formValue.phone,
            address: formValue.address,
          });
          const storedData = JSON.parse(localStorage.getItem("formData"));
          if (storedData) {
            formValue.name = storedData.name;
            formValue.email = storedData.email;
            formValue.phone = storedData.phone;
            formValue.address = storedData.address;
          }
        }
        // Gửi email đến file excel khi validate thành công
        sendForm();
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
      return regex.test(value)
        ? undefined
        : "Please enter a valid number phone";
    },
  };
};

Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : "Please enter a valid email address.";
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
  onsubmit: function (data) {
    fetch("https://testapi.demo.wgentech.com/notify.php", {
      body,
      method: "POST",
      keepalive: true,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
});

Validator({
  form: "#from",
  formGroupSelector: ".formcontact",
  errorSelector: ".form-error",
  rules: [Validator.isEmail("#emailfooter")],
  // onsubmit: sendForm(),
});

// SEND EMAIL TO EXCEL
function sendForm() {
  const popupSuccess = document.querySelector(".popup-success"),
    btnCloseS = document.querySelector(".popup__inner-close");

  var $form = $("form"),
    url =
      "https://script.google.com/macros/s/AKfycbwBstL25AahbiFJ3duU9fWGxcNhHr49NT7XYGOXpyyolcgCGWZ2OITTVOjnJc5KDOoLHQ/exec";
  var jqxhr = $.ajax({
    url: url,
    method: "POST",
    dataType: "json",
    data: $form.serialize(),
  }).done(function () {
    {
      popupSuccess.classList.add("active");
    }
  });
}

// HANDLE COOKIE BAR
// Hàm để đặt cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Hàm để lấy giá trị của một cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return;
}

// Kiểm tra xem người dùng đã đồng ý với cookie chưa
function checkCookie() {
  let value = getCookie("cookieConsent");
  if (value !== "") {
    // Nếu đã đồng ý, ẩn cookie bar
    document.querySelector(".cookie-bar").classList.remove("active"); // Cookie đã tồn tại, không hiển thị
  } else {
    document.querySelector(".cookie-bar").classList.add("active"); // Cookie chưa tồn tại, hiển thị cookie bar
  }
}
function handleCookieBar() {
  const btnAccept = document.querySelector(".accept-cookies"),
    btnReject = document.querySelector(".reject-cookies"),
    cookiBar = document.querySelector(".cookie-bar");

  // Sự kiện khi người dùng click vào nút đồng ý
  btnAccept.addEventListener("click", () => {
    setCookie("cookieConsent", "true", 180); // Lưu cookie đồng ý trong 6 tháng
    cookiBar.classList.remove("active");
  });

  // Sự kiện khi người dùng click vào nút từ chối
  btnReject.addEventListener("click", () => {
    cookiBar.classList.remove("active");
  });
}
handleCookieBar();
