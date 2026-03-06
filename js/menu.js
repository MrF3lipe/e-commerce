const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");

openMenu.addEventListener("click", (e) =>{
    e.stopPropagation();
    aside.classList.add("aside-visible");
});

closeMenu.addEventListener("click", () =>{
    aside.classList.remove("aside-visible");
});

document.addEventListener('click', (e) => {
    if (aside.classList.contains('aside-visible') && 
        !aside.contains(e.target))
      aside.classList.remove('aside-visible');
});