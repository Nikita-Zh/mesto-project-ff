import { changeCardLike, deleteCard } from "../api";

const cardTemplate = document.querySelector("#card-template").content;

export const handleLike = (cardId, likeButton, likeCounter) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  changeCardLike({ cardId, isLiked })
    .then((card) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = card.likes.length;
    })
    .catch(console.log);
};

export const handleDeleteCard = (card, cardId) => {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch(console.log);
};

export const createCard = (
  cardData,
  { onPreview, onLike, onDelete },
  userId
) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-counter");

  card.querySelector(".card__title").textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === userId);
  isLiked && likeButton.classList.add("card__like-button_is-active");

  onPreview &&
    cardImage.addEventListener("click", () =>
      onPreview({
        name: cardData.name,
        link: cardData.link,
      })
    );

  onLike &&
    likeButton.addEventListener("click", () =>
      onLike(cardData._id, likeButton, likeCounter)
    );

  if (cardData.owner._id === userId && onDelete) {
    deleteButton.addEventListener("click", () => onDelete(card, cardData._id));
  } else {
    deleteButton.remove();
  }

  return card;
};
