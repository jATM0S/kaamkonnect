function toggleSettingDropdown() {
  const settingsDropdownsm = document.getElementById("settingsDropdownsm");
  const settingsDropdownmd = document.getElementById("settingsDropdownmd");

  if (window.innerWidth < 768) {
    settingsDropdownsm.classList.toggle("hidden");
  } else settingsDropdownmd.classList.toggle("hidden");
}
function toggleDashboardDropdown() {
  const dashboardDropdownsm = document.getElementById("dashboardDropdownsm");
  const dashboardDropdownmd = document.getElementById("dashboardDropdownmd");
  if (window.innerWidth < 768) {
    dashboardDropdownsm.classList.toggle("hidden");
  } else dashboardDropdownmd.classList.toggle("hidden");
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
function toggleFilter() {
  const filterDropdown = document.getElementById("filterDropdown");
  if (window.innerWidth < 768) {
    filterDropdown.classList.toggle("hidden");
  }
}
