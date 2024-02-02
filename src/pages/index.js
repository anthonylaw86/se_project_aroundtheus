import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*ELEMENTS*/

const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const previewImageElement = previewImageModal.querySelector(".modal__image");
const previewImageCaptionElement = previewImageModal.querySelector(
  ".modal__image-title"
);

/*BUTTONS*/

const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const closeButtons = document.querySelectorAll(".modal__close");

/*FORM DATA*/

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visable",
};
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = editProfileModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*FUNCTIONS*/

function closeModal(modal) {
  // modal.classList.remove("modal_opened");
  //  document.removeEventListener("keydown", closeModalEscape);
  //modal.removeEventListener("mousedown", closeModalOutside);
}

//function openModal(modal) {
// modal.classList.add("modal_opened");
// document.addEventListener("keydown", closeModalEscape);
// modal.addEventListener("mousedown", closeModalOutside);
//}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

new Section({
  renderer: () => {
    const card = new Card(cardData, "#card-template", handleImageClick);
    wrapper.prepend(card.getView());
  },
});

//const previewPopup = new PopupWithImage({
//popupSelector: "#preview-image-modal",
//});
//previewPopup.setEventListeners();

function handleImageClick(data) {
  previewPopup.open(data);
}

const previewPopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewPopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFromSubmit: () => {},
});
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm({
  popupSelector: "#edit-profile-form",
  handleFormSubmit: () => {},
});
profileEditPopup.setEventListeners();

//function closeModalOutside(e) {
//if (e.target === e.currentTarget) {
// closeModal(e.currentTarget);
//}
//}

//function closeModalEscape(e) {
// if (e.key === "Escape") {
// const openModal = document.querySelector(".modal_opened");
//close(openModal);
//}
//}

/*EVENT HANDLERS*/

function handleProfileFormSubmit({ title, description }) {
  // profileTitle.textContent = profileTitleInput.value;
  //profileDescription.textContent = profileDescriptionInput.value;
  userInfo.setUserInfo({ title, description });
  editFormValidator.resetValidation();
  profileEditPopup.close(editProfileModal);
}

function handleAddCardFormSubmit({ name, link }) {
  // e.preventDefault();

  renderCard({ name, link }, cardsWrap);
  name = cardTitleInput.value;
  link = cardURLInput.value;
  newCardPopup.close(addCardModal);
  e.reset();
}

/*EVENT LISTENERS*/

profileEditButton.addEventListener("click", () => {
  // profileTitleInput.value = profileTitle.textContent;
  //profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
