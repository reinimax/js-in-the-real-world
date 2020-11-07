/* For this to work, the dropdown-toggler and the dropdown-menu must be nested 
   into a container. The container needs to have a position other than static 
   and the dropdown-menu position: absolute.
*/
const dropdownOnClick = document.querySelectorAll(".dropdown-toggle");

function toggleVisible(item) {
  item.classList.toggle("visible");
}

dropdownOnClick.forEach((d) =>
  d.addEventListener("click", (e) => {
    toggleVisible(
      e.target.parentElement.getElementsByClassName("dropdown-menu")[0]
    );
  })
);
