function toggleSettingDropdown() {
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (window.innerWidth < 768) {
    dropdownMenu.classList.toggle("hidden");
  }
}
function toggleDashboardDropdown() {
  const dasnboardDropdownMenu = document.getElementById(
    "dasnboardDropdownMenu"
  );
  if (window.innerWidth < 768) {
    dasnboardDropdownMenu.classList.toggle("hidden");
  }
}
function toggleProfiledropdown() {
  const profileDropdown = document.getElementById("profileDropdown");
  profileDropdown.classList.toggle("hidden");
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
