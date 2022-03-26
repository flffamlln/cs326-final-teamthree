const changePasswordOverlay = document.getElementById("change-password-overlay");
const editProfileOverlay = document.getElementById("edit-profile-overlay");
const profileContainer = document.getElementById("profile-container");



const editProfileButton = document.getElementById("edit-profile-button");
editProfileButton.addEventListener("click", () => {
  profileContainer.style.filter = "blur(8px)";
  profileContainer.style.pointerEvents = "none";
  editProfileOverlay.style.visibility = "visible";
});

const backToProfile = document.getElementById("back-to-profile-button");
backToProfile.addEventListener("click", () => {
  profileContainer.style.filter = "";
  profileContainer.style.pointerEvents = "";
  editProfileOverlay.style.visibility = "hidden";
});



const changePassword = document.getElementById("change-password-button");
changePassword.addEventListener("click", () => {
  editProfileOverlay.style.visibility = "hidden";
  changePasswordOverlay.style.visibility = "visible";
});

const backToEdit = document.getElementById("back-to-edit-button");
backToEdit.addEventListener("click", () => {
  editProfileOverlay.style.visibility = "visible";
  changePasswordOverlay.style.visibility = "hidden";
});