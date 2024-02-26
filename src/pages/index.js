import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Constants from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
const avatarElement = document.querySelector(".profile__image");

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

function handleLikeIcon(card) {
  if (!card.isLiked) {
    api
      .isLiked(card.id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .unliked(card.id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

let popupWithConfirm = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: () => {
    console.log(123);
  },
});
popupWithConfirm.setEventListeners();

function handleDeleteClick(card) {
  popupWithConfirm.open();
  popupWithConfirm.setSubmitAction(() => {
    api
      .deleteCard(card.id)
      .then(() => {
        card.removeCard();
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeIcon
  );
  return card.getView();
}
const cardsWrap = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = renderCard(cardData);
      cardsWrap.addItem(card);
    },
  },
  ".cards__list"
);

api
  .getInitialCards()
  .then((cards) => {
    cardsWrap.setItems(cards);
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

const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});
Promise.all([api.getUserInfo(), api.getInitialCards(), userInfo.setAvatar()]);
api
  .getUserInfo(userInfo._title, userInfo._description)
  .then((res) => {
    userInfo.setUserInfo({ title: res.name, description: res.about });
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    profileEditPopup.renderLoading(true);
    api
      .editUserInfo({ name: data.title, about: data.description })
      .then((res) => {
        userInfo.setUserInfo({ title: res.name, description: res.about });
        profileEditPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        profileEditPopup.renderLoading(false);
      });
  },
});
const updateAvatar = new PopupWithForm({
  popupSelector: "#update-avatar-modal",
  handleFormSubmit: (avatar) => {
    updateAvatar.renderLoading(true);
    api
      .updateAvatar({ avatar: avatar.link })
      .then((res) => {
        console.log(res);
        userInfo.setAvatar(res.avatar);
        updateAvatar.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        updateAvatar.renderLoading(false);
      });
  },
});

/*EVENT HANDLERS*/

profileEditPopup.setEventListeners();

function handleAddCardFormSubmit({ name, link }) {
  newCardPopup.renderLoading(true);
  api
    .createNewCard(name, link)
    .then((res) => {
      const newCard = renderCard(res);
      cardsWrap.addItem(newCard);
      newCardPopup.close();
      newCardPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
}

function handleProfileFormSubmit({ title, description }) {
  profileEditPopup.close();
}

function avatarFormSubmit(avatar) {
  updateAvatar.close();
}

/*EVENT LISTENERS*/

avatarElement.addEventListener("click", () => {
  updateAvatar.open();
});

updateAvatar.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  profileEditPopup.open();
});
