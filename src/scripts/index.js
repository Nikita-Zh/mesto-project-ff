import "../pages/index.css";
import { initialCards } from "./cards.js";
import {
  openModal,
  closeModalWithEventListeners,
  closeModal,
} from "./components/modal.js";
import { createCard, deleteCard, handleLike } from "./components/card";

const listCards = document.querySelector(".places__list");

const editProfileModal = document.querySelector(".popup_type_edit");
const addNewCardModal = document.querySelector(".popup_type_new-card");
const imagePreviewModal = document.querySelector(".popup_type_image");

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  closeModalWithEventListeners(popup);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileFormElement = editProfileModal.querySelector(".popup__form");
const profileNameInput = editProfileModal.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = editProfileModal.querySelector(
  ".popup__input_type_description"
);

const cardFormElement = addNewCardModal.querySelector(".popup__form");
const cardUrlInput = addNewCardModal.querySelector(".popup__input_type_url");
const cardNameInput = addNewCardModal.querySelector(
  ".popup__input_type_card-name"
);

const addNewCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});
editProfileButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;
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
  const name = profileNameInput.value;
  const job = profileJobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;
  closeModal(editProfileModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const link = cardUrlInput.value;
  const name = cardNameInput.value;

  const card = createCard(
    { name, link },
    {
      onPreview: handlePreviewImage,
      onDelete: deleteCard,
      onLike: handleLike,
    }
  );
  prependCard(card);
  closeModal(addNewCardModal);
  cardFormElement.reset();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
cardFormElement.addEventListener("submit", handleCardFormSubmit);

initialCards.forEach((item) => {
  const card = createCard(item, {
    onPreview: handlePreviewImage,
    onDelete: deleteCard,
    onLike: handleLike,
  });
  placeCard(card);
});
