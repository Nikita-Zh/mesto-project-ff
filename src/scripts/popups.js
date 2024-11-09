const handleOpenPopup = (popup, evt) => {
  popup.style.display = "flex";
  const closeButton = popup.querySelector(".popup__close");

  closeButton.addEventListener(
    "click",
    () => {
      popup.style.display = "none";
    },
    { once: true }
  );
};
// const handleOpenImagePopup = (card, evt) => {

const escListener = (evt) => {
  console.log(evt.key);
  console.log("ABOBAS");
  if (evt.key === "Escape") {
    evt.target.removeEventListener("keydown", escListener);
  }
};

const handleOpenImagePopup = ({ name, link }, evt) => {
  imagePopup.style.display = "flex";
  const popupImage = imagePopup.querySelector(".popup__image");
  const closeButton = imagePopup.querySelector(".popup__close");
  const popupCaption = imagePopup.querySelector(".popup__caption");
  // const cardImage = card.querySelector(".card__image");
  // popupImage.src = cardImage.src;
  // popupImage.alt = cardImage.alt;
  // popupCaption.textContent = card.querySelector(".card__title").textContent;
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  window.addEventListener("keydown", escListener);

  closeButton.addEventListener(
    "click",
    () => {
      imagePopup.style.display = "none";
    },
    { once: true }
  );

  // imagePopup.onkeydown = (evt) => {
  //   console.log(evt.key);
  // };
};
