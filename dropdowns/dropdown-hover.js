/* For this to work, the dropdown-toggler and the dropdown-menu must be nested 
   into a container with the class dropdown-on-hover (that must not be bigger 
   than the toggler itself). The container needs to have a position other than 
   static and the dropdown-menu position: absolute.
*/

const dropdownOnHover = document.querySelectorAll(".dropdown-on-hover");

function toggleVisible(item) {
  item.classList.toggle("visible");
}

dropdownOnHover.forEach((d) =>
  d.addEventListener("mouseenter", (e) => {
    toggleVisible(e.target.getElementsByClassName("dropdown-menu")[0]);
  })
);

dropdownOnHover.forEach((d) =>
  d.addEventListener("mouseleave", (e) => {
    toggleVisible(e.target.getElementsByClassName("dropdown-menu")[0]);
  })
);
