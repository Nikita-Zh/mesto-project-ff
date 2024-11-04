const cardTemplate = document.querySelector("#card-template").content;
const listCards = document.querySelector(".places__list");

const createCard = ({ name, link }, deleteCard) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  card.querySelector(".card__title").textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", () => deleteCard(card));

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
