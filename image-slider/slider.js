const slideshow = document.querySelector(".slideshow");

const control = document.querySelectorAll(".control");
const nextBtn = document.querySelector(".next");

const navCircles = document.querySelectorAll(".nav-circle");

let counter = 0;
const slideshowLength = slideshow.childElementCount;

// Functions
function toggleSlider(ctrl) {
  if (ctrl.classList.contains("next")) {
    counter += 1;
    if (counter >= slideshowLength) {
      counter = 0;
    }
    slideshow.style.left = `${-counter}00%`;
  }

  if (ctrl.classList.contains("previous")) {
    counter -= 1;
    if (counter < 0) {
      counter = slideshowLength - 1;
    }
    slideshow.style.left = `${-counter}00%`;
  }
  toggleCurrent(navCircles[counter]);
}

function jumpToSlide(target) {
  counter = Number(target.getAttribute("data-index"));
  slideshow.style.left = `${-counter}00%`;
}

function removeCurrent() {
  navCircles.forEach((circle) => circle.classList.remove("current"));
}

function toggleCurrent(target) {
  removeCurrent();
  target.classList.add("current");
}

// Listeners
control.forEach((control) =>
  control.addEventListener("click", (e) => {
    toggleSlider(e.currentTarget);
  })
);

navCircles.forEach((circle) =>
  circle.addEventListener("click", (e) => {
    jumpToSlide(e.currentTarget);
    toggleCurrent(e.currentTarget);
  })
);

// Automatic Slide
setInterval(toggleSlider, 5000, nextBtn);
