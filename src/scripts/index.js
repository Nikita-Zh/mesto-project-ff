import "../pages/index.css";
import {
  openModal,
  closeModalWithEventListeners,
  closeModal,
} from "./components/modal.js";
import { createCard, handleDeleteCard, handleLike } from "./components/card";
import { clearValidation, enableValidation } from "./validation.js";
import {
  addCard,
  editUserAvatar,
  editUserProfile,
  getCards,
  getUser,
} from "./api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = null;

const listCards = document.querySelector(".places__list");

const editProfileModal = document.querySelector(".popup_type_edit");
const addNewCardModal = document.querySelector(".popup_type_new-card");
const imagePreviewModal = document.querySelector(".popup_type_image");
const editProfileAvatarModal = document.querySelector(".popup_type_avatar");

const editProfileSubmitButton =
  editProfileModal.querySelector(".popup__button");
const addNewCardSubmitButton = addNewCardModal.querySelector(".popup__button");
const editProfileAvatarSubmitButton =
  editProfileAvatarModal.querySelector(".popup__button");

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  closeModalWithEventListeners(popup);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileFormElement = editProfileModal.querySelector(".popup__form");
const profileAvatarFormElement =
  editProfileAvatarModal.querySelector(".popup__form");
const profileNameInput = editProfileModal.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);
const profileAvatarUrlInput = editProfileAvatarModal.querySelector(
  ".popup__input_type_avatar_url"
);

const cardFormElement = addNewCardModal.querySelector(".popup__form");
const cardUrlInput = addNewCardModal.querySelector(
  ".popup__input_type_card_url"
);
const cardNameInput = addNewCardModal.querySelector(
  ".popup__input_type_card-name"
);

const addNewCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileAvatarButton = document.querySelector(".profile__image");
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});
editProfileAvatarButton.addEventListener("click", () => {
  openModal(editProfileAvatarModal);
});
editProfileButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
  clearValidation(profileFormElement, validationConfig);
  openModal(editProfileModal);
});

const previewModalImage = imagePreviewModal.querySelector(".popup__image");
const previewModalCaption = imagePreviewModal.querySelector(".popup__caption");

const placeCard = (card) => {
  listCards.append(card);
};

const prependCard = (card) => {
  listCards.prepend(card);
};

const handlePreviewImage = ({ name, link }) => {
  previewModalImage.src = link;
  previewModalImage.alt = name;
  previewModalCaption.textContent = name;

  openModal(imagePreviewModal);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  editProfileSubmitButton.textContent = "Сохранение...";
  editUserProfile({
    name: profileNameInput.value,
    about: profileJobInput.value,
  })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(editProfileModal);
    })
    .catch(console.log)
    .finally(() => {
      editProfileSubmitButton.textContent = "Сохранить";
    });
}

function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();

  editProfileAvatarSubmitButton.textContent = "Сохранение...";
  editUserAvatar(profileAvatarUrlInput.value)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      closeModal(editProfileAvatarModal);
      profileAvatarFormElement.reset();
      clearValidation(profileAvatarFormElement, validationConfig);
    })
    .catch(console.log)
    .finally(() => {
      editProfileAvatarSubmitButton.textContent = "Сохранить";
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addNewCardSubmitButton.textContent = "Сохранение...";
  addCard({
    name: cardNameInput.value,
    link: cardUrlInput.value,
  })
    .then((cardData) => {
      const card = createCard(
        cardData,
        {
          onPreview: handlePreviewImage,
          onDelete: handleDeleteCard,
          onLike: handleLike,
        },
        userId
      );
      prependCard(card);
      closeModal(addNewCardModal);
      cardFormElement.reset();
      clearValidation(cardFormElement, validationConfig);
    })
    .catch(console.log)
    .finally(() => {
      addNewCardSubmitButton.textContent = "Сохранить";
    });
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileAvatarFormElement.addEventListener(
  "submit",
  handleProfileAvatarFormSubmit
);
cardFormElement.addEventListener("submit", handleCardFormSubmit);

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach((item) => {
      const card = createCard(
        item,
        {
          onPreview: handlePreviewImage,
          onDelete: handleDeleteCard,
          onLike: handleLike,
        },
        userId
      );
      placeCard(card);
    });
  })
  .catch(console.log);

enableValidation(validationConfig);
