const cardTemplate = document.querySelector("#card-template").content;
const listCards = document.querySelector(".places__list");

const createCard = ({ name, link }, deleteCard) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").src = link;
  card.querySelector(".card__title").textContent = name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", (e) => deleteCard(e.target));

  return card;
};

const deleteCard = (cardDeleteButton) => {
  cardDeleteButton.closest(".card").remove();
};

const placeCard = (card) => {
  listCards.append(card);
};

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placeCard(card);
});
