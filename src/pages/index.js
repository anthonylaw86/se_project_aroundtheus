import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Constants from "../utils/constants.js";

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

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardURLInput = addCardFormElement.querySelector(".modal__input_type_url");
const constants = new Constants();

const editFormElement = editProfileModal.querySelector(".modal__form");

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
  return cardsWrap.addItem(card.getView());
}

const cardsWrap = new Section(
  {
    items: constants.initialCards,
    renderer: (cardData) => {
      const card = renderCard(cardData);
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
const userData = userInfo.getUserInfo();

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
  userInfo.getUserInfo(
    (profileTitleInput.value = profileTitle.textContent),
    (profileDescriptionInput.value = profileDescription.textContent)
  );
  profileEditPopup.open();
});

cardsWrap.renderItems();

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});
