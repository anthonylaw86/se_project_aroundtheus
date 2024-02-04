import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Constants from "../utils/constants.js";

// const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

/*ELEMENTS*/

const editProfileModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addCardFormElement = addCardModal.querySelector(".modal__form");

/*BUTTONS*/

const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");

/*FORM DATA*/

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visable",
// };
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");
const constants = new Constants();

// const validationSettings = {
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

const editFormElement = editProfileModal.querySelector(".modal__form");
// const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(
  constants.settings,
  editFormElement
);
const addFormValidator = new FormValidator(
  constants.settings,
  addCardFormElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*FUNCTIONS*/

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);

  return card.getView();
}

const cardsWrap = new Section(
  {
    items: constants.initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleImageClick);
      cardsWrap.addItem(card.getView());
    },
  },
  ".cards__list"
);

function handleImageClick(data) {
  previewPopup.open(data);
}

const previewPopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
previewPopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    handleAddCardFormSubmit(data);
  },
});
newCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    handleProfileFormSubmit(data);
  },
});
profileEditPopup.setEventListeners();

const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

/*EVENT HANDLERS*/

function handleProfileFormSubmit({ title, description }) {
  userInfo.setUserInfo({ title, description });
  profileEditPopup.close();
}

function handleAddCardFormSubmit({ name, link }) {
  const newCard = renderCard({ name, link });
  cardsWrap.addItem(newCard);
  newCardPopup.close();
  newCardPopup.reset();
}

/*EVENT LISTENERS*/

profileEditButton.addEventListener("click", () => {
  userInfo.getUserInfo({
    title: profileTitle.textContent,
    description: profileDescription.textContent,
  });
  // profileTitleInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

cardsWrap.renderItems();

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});
