/* For this to work, the dropdown-toggler and the dropdown-menu must be nested 
   into a container. The container needs to have a position other than static 
   and the dropdown-menu position: absolute.
*/
const toggler = document.querySelectorAll(".mobile-toggler");
const mobileMenu = document.querySelector(".mobile-menu");
const main = document.querySelector(".main");

function moveMenu() {
  mobileMenu.classList.toggle("move-in");
}

function collapse() {
  main.classList.toggle("collapse");
}

toggler.forEach((d) =>
  d.addEventListener("click", (e) => {
    moveMenu();
    collapse();
  })
);
