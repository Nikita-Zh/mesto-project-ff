const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".popup_is-opened");
    closeModal(activeModal);
  }
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEsc);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEsc);
};

export const closeModalWithEventListeners = (modal) => {
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(modal);
    }
  });
};
