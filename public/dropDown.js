function toggleSettingDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (window.innerWidth < 768) {
    dropdownMenu.classList.toggle("hidden");
  }
}
function toggleNavMenu() {
  const dropdownNav = document.getElementById("dropdownNav");
  if (window.innerWidth < 768) {
    dropdownNav.classList.toggle("hidden");
    const openIcon = document.getElementById("menu-open-icon");
    const closeIcon = document.getElementById("menu-close-icon");
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  }
}
