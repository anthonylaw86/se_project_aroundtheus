import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Constants from "../utils/constants.js";
import Api from "../components/Api.js";

/*SERVER REQUESTS*/

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fc353c45-617d-4c7e-a1fb-ad5ad438ee63",
    "Content-Type": "application/json",
  },
});

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
  return card.getView();
}

api
  .getInitialCards()
  .then(() => {
    const cardsWrap = new Section(
      {
        items: constants.initialCards,
        renderer: (cardData) => {
          const card = renderCard(cardData);
          cardsWrap.addItem(card);
        },
      },
      ".cards__list"
    );
    cardsWrap.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

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

api
  .getUserInfo()
  .then(() => {
    const userInfo = new UserInfo({
      profileTitleSelector: ".profile__title",
      profileDescriptionSelector: ".profile__description",
    });
    profileEditButton.addEventListener("click", () => {
      const userData = userInfo.getUserInfo();
      profileTitleInput.value = userData.title;
      profileDescriptionInput.value = userData.description;
      profileEditPopup.open();
    });
    function handleProfileFormSubmit({ title, description }) {
      userInfo.setUserInfo({ title, description });
      profileEditPopup.close();
    }

    
      const profileEditPopup = new PopupWithForm(
        api.editUserInfo().then(() => {
        popupSelector: "#profile-edit-modal",
        handleFormSubmit: (data) => {
          handleProfileFormSubmit(data);
        },
      
      profileEditPopup.setEventListeners();
      }))
  })
  .catch((err) => {
    console.error(err);
  });

/*EVENT HANDLERS*/

function handleAddCardFormSubmit({ name, link }) {
  const newCard = renderCard({ name, link });
  cardsWrap.addItem(newCard);
  newCardPopup.close();
  newCardPopup.reset();
}

/*EVENT LISTENERS*/

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});
