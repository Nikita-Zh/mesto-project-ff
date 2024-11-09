import "../pages/index.css";
import { initialCards } from "./cards.js";

const cardTemplate = document.querySelector("#card-template").content;
const listCards = document.querySelector(".places__list");

const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  }
};

const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEsc);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEsc);
};

const closePopupWithEventListeners = (popup) => {
  const closeButton = imagePopup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
};

const handleOpenImagePopup = ({ name, link }, evt) => {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(imagePopup);
  closePopupWithEventListeners(imagePopup);
};

const createCard = ({ name, link }, deleteCard) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");

  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  deleteButton.addEventListener("click", () => deleteCard(card));

  cardImage.addEventListener("click", (evt) =>
    handleOpenImagePopup({ name, link }, evt)
  );

  return card;
};

const deleteCard = (card) => {
  card.remove();
};

const placeCard = (card) => {
  listCards.append(card);
};

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placeCard(card);
});

const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const addNewCardButton = document.querySelector(".profile__add-button");

addNewCardButton.addEventListener("click", (evt) =>
  openPopup(newCardPopup, evt)
);
// addNewCardButton.addEventListener("click", () => {
//   newCardPopup.style.display = "flex";

// });

