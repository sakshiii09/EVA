$(document).ready(function () {
  $(".hamburger").on("click", () => {
    $(".hamburger").toggleClass("active");
    $(".nav-menu").toggleClass("active");
  });

  // carousel js=======
  var owl = $(".owl-carousel.sliderTheme");
  owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
  });
  $(".play").on("click", function () {
    owl.trigger("play.owl.autoplay", [1000]);
  });
  $(".stop").on("click", function () {
    owl.trigger("stop.owl.autoplay");
  });

  //Round trip Listing date slider
  $(".owl-carousel.dateSecondUl").owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      1200: {
        items: 3,
      },
      1400: {
        items: 4,
      },
      1600: {
        items: 4,
      },
    },
  });
  // Flight one way Listing date slider
  $(".owl-carousel.fullSlider").owlCarousel({
    loop: false,
    nav: true,
    dots: false,
    items: 6,
    responsive: {
      0: {
        items: 1,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 6,
      },
      1600: {
        items: 6,
      },
    },
  });
  // Category in index page slider
  $(".owl-carousel.imageSlider").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    dots: false,
    items: 7,
    responsive: {
      0: {
        items: 4,
      },
      980: {
        items: 5,
      },
      1200: {
        items: 6,
      },
      1400: {
        items: 6,
      },
      1600: {
        items: 7,
      },
    },
  });

  document.addEventListener("DOMContentLoaded", function () {
    var buttons = document.querySelectorAll(".dateLi .dateItem");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (btn) {
          btn.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  });

  //   password visibility
  $(".toggle-password").on("click", function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    const input = $(this).closest(".showPassword").find(".inputField");
    input.attr("type", input.attr("type") === "password" ? "text" : "password");
  });
});

// header js
$(function () {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".mainheader").addClass("activeHeader");
    } else {
      //remove the background property so it comes transparent again (defined in your css)
      $(".mainheader").removeClass("activeHeader");
    }
  });
});

// ============ modal tab activation js
$(document).ready(function () {
  $(".listTab a").click(function (event) {
    event.preventDefault();

    // Toggle active class on tab buttons
    $(this).parent().addClass("activeTab");
    $(this).parent().siblings().removeClass("activeTab");

    // display only active tab content
    var activeTab = $(this).attr("href");
    $(".tabContent").not(activeTab).css("display", "none");
    $(activeTab).fadeIn();
  });
});

// Time out modal script js ======================
setTimeout(function () {
  $("#confirmModal").modal("hide");
}, 4000);

// Auto Hide modal js ==========================
setTimeout(function () {
  $("#confirmModal").modal("hide");
}, 4000);

// Select popup dropdrown js
// document.addEventListener("click", function (event) {
//   var dropdown = document.getElementsByClassName("newdropdownSelecetd")[0];
//   var dropdownContent = document.getElementById("dropdownContent");
//   var dropdownBtn = document.getElementById("dropdown-btn");

//   if (!dropdown.contains(event.target)) {
//     dropdownContent.classList.remove("show");
//   }
// });

// function toggleDropdown() {
//   var dropdownContent = document.getElementById("dropdownContent");
//   dropdownContent.classList.toggle("show");
// }

// function selectOption(option) {
//   document.getElementById("dropdown-btn").textContent = option;
//   toggleDropdown(); // Close the dropdown after selecting an option
// }

function closeDropdown() {
  $(".dropdown-menu").removeClass("show");
}

// Display some text when the checkbox is checked

function myFunction() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("myText");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

// Custom select js ====================
function create_custom_dropdowns() {
  $("select").each(function (i, select) {
    if (!$(this).next().hasClass("dropdownItem")) {
      $(this).after(
        '<div class="dropdownItem ' +
          ($(this).attr("class") || "") +
          '" tabindex="0"><span class="currentItem"> </span><div class="dropdownList"><ul></ul></div></div>'
      );
      var dropdown = $(this).next();
      var options = $(select).find("option");
      var selected = $(this).find("option:selected");
      dropdown
        .find(".currentItem")
        .html(selected.data("display-text") || selected.text());
      options.each(function (j, o) {
        var display = $(o).data("display-text") || "";
        dropdown
          .find("ul")
          .append(
            '<li class="option ' +
              ($(o).is(":selected") ? "selected" : "") +
              '" data-value="' +
              $(o).val() +
              '" data-display-text="' +
              display +
              '">' +
              $(o).text() +
              "</li>"
          );
      });
    }
  });
}

// Event listeners

// Open/close
$(document).on("click", ".dropdownItem", function (event) {
  $(".dropdownItem").not($(this)).removeClass("open");
  $(this).toggleClass("open");
  if ($(this).hasClass("open")) {
    $(this).find(".option").attr("tabindex", 0);
    $(this).find(".selected").focus();
  } else {
    $(this).find(".option").removeAttr("tabindex");
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on("click", function (event) {
  if ($(event.target).closest(".dropdownItem").length === 0) {
    $(".dropdownItem").removeClass("open");
    $(".dropdownItem .option").removeAttr("tabindex");
  }
  event.stopPropagation();
});
// Option click
$(document).on("click", ".dropdownItem .option", function (event) {
  $(this).closest(".list").find(".selected").removeClass("selected");
  $(this).addClass("selected");
  var text = $(this).data("display-text") || $(this).text();
  $(this).closest(".dropdownItem").find(".currentItem").text(text);
  $(this)
    .closest(".dropdownItem")
    .prev("select")
    .val($(this).data("value"))
    .trigger("change");
});

// Keyboard events
$(document).on("keydown", ".dropdownItem", function (event) {
  var focused_option = $(
    $(this).find(".list .option:focus")[0] ||
      $(this).find(".list .option.selected")[0]
  );
  // Space or Enter
  if (event.keyCode == 32 || event.keyCode == 13) {
    if ($(this).hasClass("open")) {
      focused_option.trigger("click");
    } else {
      $(this).trigger("click");
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass("open")) {
      $(this).trigger("click");
    } else {
      var focused_option = $(
        $(this).find(".list .option:focus")[0] ||
          $(this).find(".list .option.selected")[0]
      );
      focused_option.prev().focus();
    }
    return false;
    // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass("open")) {
      $(this).trigger("click");
    }
    return false;
  }
});

$(document).ready(function () {
  create_custom_dropdowns();
});

// Swap the flights value in flight search js ============================
function swapFunction() {
  var para1 = document.getElementById("para1");
  var para2 = document.getElementById("para2");
  var para3 = document.getElementById("para3");
  var para4 = document.getElementById("para4");
  var para5 = document.getElementById("para5");
  var para6 = document.getElementById("para6");

  var content1 = para1.innerText;
  var content2 = para2.innerText;
  var content3 = para3.innerText;
  var content4 = para4.innerText;
  var content5 = para5.innerText;
  var content6 = para6.innerText;

  para1.innerText = content2;
  para2.innerText = content1;
  para3.innerText = content4;
  para4.innerText = content3;
  para5.innerText = content6;
  para6.innerText = content5;
}

// Flight search select
function cityListContent1() {
  var xcity1 = document.getElementById("cityName1");
  var xairport1 = document.getElementById("para1");
  var line = document.getElementById("blueLine");
  if (
    xcity1.style.display === "none" ||
    xairport1.style.display === "block" ||
    line.style.display === "block"
  ) {
    xcity1.style.display = "block";
    xairport1.style.display = "none";
    line.style.display = "none";
  } else {
    xcity1.style.display = "none";
    xairport1.style.display = "block";
    line.style.display = "block";
  }
}
// Flight search select
function cityListContent2() {
  var xcity2 = document.getElementById("cityName2");
  var xairport2 = document.getElementById("para2");
  var line2 = document.getElementById("blueLine2");
  if (
    xcity2.style.display === "none" ||
    xairport2.style.display === "block" ||
    line2.style.display === "block"
  ) {
    xcity2.style.display = "block";
    xairport2.style.display = "none";
    line2.style.display = "none";
  } else {
    xcity2.style.display = "none";
    xairport2.style.display = "block";
    line2.style.display = "block";
  }
}

// when user click on from input in flight search  the blue line in bottom will appear =========================
function hideCityBlueUnderline() {
  var blueLine = document.getElementById("blueLine");
  if (blueLine.style.display === "none") {
    blueLine.style.display = "block";
  } else {
    blueLine.style.display = "none";
  }
}
// when user click on to input in flight search  the blue line in bottom will appear =========================
function hideToBlueUnderline() {
  var blueLine2 = document.getElementById("blueLine2");
  if (blueLine2.style.display === "none") {
    blueLine2.style.display = "block";
  } else {
    blueLine2.style.display = "none";
  }
}
// when user click on traveller dropdown in flight search  the blue line in bottom will appear
function hideTravellerBlueUnderline() {
  var blueLine3 = document.getElementById("blueLine3");
  if (blueLine3.style.display === "none") {
    blueLine3.style.display = "block";
  } else {
    blueLine3.style.display = "none";
  }
}

// hotel search select
function hotelListContent() {
  var xcity1 = document.getElementById("cityName");
  var xairport1 = document.getElementById("para1");
  var line4 = document.getElementById("blueLine4");
  if (
    xcity1.style.display === "none" ||
    xairport1.style.display === "block" ||
    line4.style.display === "block"
  ) {
    xcity1.style.display = "block";
    xairport1.style.display = "none";
    line4.style.display = "none";
  } else {
    xcity1.style.display = "none";
    xairport1.style.display = "block";
    line4.style.display = "block";
  }
}
function hotelHideInput() {
  var blueLine4 = document.getElementById("blueLine4");
  if (blueLine4.style.display === "none") {
    blueLine4.style.display = "block";
  } else {
    blueLine4.style.display = "none";
  }
}
// in proceed form hide details js =========================
function hideDetails() {
  var x = document.getElementById("myDip");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// in proceed form hide child details js =============================
function hideChildDetails() {
  var x = document.getElementById("myDip1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// in hotel when you click on multiple input tag ==============================
function hideInputBtn() {
  var x = document.getElementById("myInput");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// in bus when you click on multiple input tag ==============================
function hideBusBtn() {
  var x = document.getElementById("myBusInput");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// in cab when you click on multiple input tag ==============================
function hideCabBtn() {
  var x = document.getElementById("myCabInput");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// when you click on select Room this js property will apply ================================
function changeBackgroundColor() {
  var select = document.getElementById("blue");
  var color = document.getElementById("whiteBg");
  if (select.style.display === "block") {
    select.style.display = "inline-block";
    select.style.boxShadow = "none";
    select.style.backgroundColor = "#fff";
    select.style.border = " 1px solid rgba(220, 220, 220, 1)";
    document.getElementById("slectRoomClass").innerHTML = "Select Room";
    document.getElementById("whiteBg1").style.background = "#eff6ff";
    document.getElementById("whiteBg2").style.background = "#eff6ff";
    document.getElementById("whiteBg3").style.background = "#eff6ff";
  } else {
    select.style.display = "block";
    select.style.backgroundColor = "#eff6ff";
    select.style.boxShadow =
      "0px 10px 23px 0px #9CA1A51A, 0px 42px 42px 0px #9CA1A517, 0px 94px 56px 0px #9CA1A50D, 0px 167px 67px 0px #9CA1A503, 0px 261px 73px 0px #9CA1A500 ";
    select.style.border = " 1px solid #014ea2";
    document.getElementById("slectRoomClass").innerHTML = "Deselect Room";
    document.getElementById("whiteBg1").style.background = "#fff";
    document.getElementById("whiteBg2").style.background = "#fff";
    document.getElementById("whiteBg3").style.background = "#fff";
  }
}

// when you click on select Room this js property will apply =============================
function activeCard() {
  var select = document.getElementById("activeCard");
  if (select.style.display === "block") {
    select.style.display = "inline-block";
    select.style.boxShadow = "none";
    select.style.border = " 1px solid rgba(220, 220, 220, 1)";
  } else {
    select.style.display = "block";
    select.style.backgroundColor = "#eff6ff";
    select.style.boxShadow = " 0px 10px 23px 0px #9ca1a51a";
    select.style.border = " 1px solid #014ea2";
  }
}

// in hotel when you click on multiple input tag =================================
function hideRadioBtn() {
  var x = document.getElementById("r1");
  var y = document.getElementById("r2");
  if (x.style.display === "none" || y.style.display === "block") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
  var x = document.getElementById("r3");
  var y = document.getElementById("r4");
  if (x.style.display === "none" || y.style.display === "block") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
  var x = document.getElementById("r5");
  var y = document.getElementById("r6");
  if (x.style.display === "none" || y.style.display === "block") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
  var x = document.getElementById("r7");
  var y = document.getElementById("r8");
  if (x.style.display === "none" || y.style.display === "block") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
}

// in proceed form hide/Show More flight in flight search js =========================
function hideMoreFlight() {
  var x = document.getElementById("addMoreFlight");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// in Cab search file will hide/Show More cab (JS) =========================
function addMoreCabs() {
  var x = document.getElementById("addMoreCabs");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// when you click on select in cab listing file this js property will apply ================================
function cabListingColr() {
  var select = document.getElementById("cabListing");
  var color = document.getElementById("carStylingTxt");
  var styling = document.getElementById("carStyling");
  if (select.style.display === "block") {
    select.style.display = "inline-block";
    select.style.boxShadow = "none";
    select.style.backgroundColor = "#fff";
    select.style.border = " 1px solid rgba(220, 220, 220, 1)";
    document.getElementById("carStylingTxt").style.color = "#bfcde0";
    document.getElementById("carStyling").style.background = "#e6edf6";
    document.getElementById("slectCabClass").innerHTML = "Select";
  } else {
    select.style.display = "block";
    select.style.backgroundColor = "#eff6ff";
    select.style.boxShadow =
      "0px 10px 23px 0px #9CA1A51A, 0px 42px 42px 0px #9CA1A517, 0px 94px 56px 0px #9CA1A50D, 0px 167px 67px 0px #9CA1A503, 0px 261px 73px 0px #9CA1A500 ";
    select.style.border = " 1px solid #014ea2";
    document.getElementById("carStylingTxt").style.color = "#014EA2";
    document.getElementById("carStyling").style.background = "#DBE5F3";
    document.getElementById("slectCabClass").innerHTML = "Deselect";
  }
}

// In trip Detail when you click on mail Container tab this js will apply
function mailContainer() {
  var x = document.getElementById("mailPopup");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// // this js belongs to container of notifications hide and show =========================
function notifyContainer() {
  var x = document.getElementById("notifyMenu");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// // this js belongs to container of profile hide and show =========================
function profileViewContainer() {
  var x = document.getElementById("profileMenu");
  var y = document.getElementById("profileArrow");
  if (x.style.display === "none" || y.style.transform === "rotata(0deg)") {
    x.style.display = "block";
    y.style.transform = "rotate(180deg)";
  } else {
    x.style.display = "none";
    y.style.transform = "rotate(0deg)";
  }
}

// when you click on select in cab listing file this js property will apply ================================
function viewRecmmdDetail() {
  var x = document.getElementById("hotelRcmmdBottomDetail");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("viewRoom").innerHTML = "Hide Room details";
  } else {
    x.style.display = "none";
    document.getElementById("viewRoom").innerHTML = "View Room details";
  }
}

function hotelSelctBottomDetail() {
  var x = document.getElementById("hotelSelctBottomDetail");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("hotelSelctRoom").innerHTML = "Hide Room details";
  } else {
    x.style.display = "none";
    document.getElementById("hotelSelctRoom").innerHTML = "View Room details";
  }
}

// in flight-trip-details when you click on submit popup this js will apply ==============================
function flagModal() {
  var x = document.getElementById("flagModal");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
