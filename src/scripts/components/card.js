const cardTemplate = document.querySelector("#card-template").content;

export const handleLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

export const deleteCard = (card) => {
  card.remove();
};

export const createCard = ({ name, link }, { onPreview, onLike, onDelete }) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  onPreview &&
    cardImage.addEventListener("click", () => onPreview({ name, link }));
  onLike && likeButton.addEventListener("click", onLike);
  onDelete && deleteButton.addEventListener("click", () => onDelete(card));

  return card;
};
