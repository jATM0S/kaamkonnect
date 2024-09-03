function toggleSettingDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (window.innerWidth < 768) {
    dropdownMenu.classList.toggle("hidden");
  }
}
