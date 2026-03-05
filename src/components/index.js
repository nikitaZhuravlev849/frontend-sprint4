import '../pages/index.css';
import { createCard, deleteCard, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validate.js';
import { initialCards } from './cards.js';

// Настройки валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editForm = editPopup.querySelector('.popup__form');
const newCardForm = newCardPopup.querySelector('.popup__form');

const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');
const cardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Добавить анимацию ко всем попапам
document.querySelectorAll('.popup').forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Закрытие попапов крестиком
document.querySelectorAll('.popup__close').forEach((closeBtn) => {
  closeBtn.addEventListener('click', () => {
    const popup = closeBtn.closest('.popup');
    closeModal(popup);
  });
});

// Открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editForm, validationSettings);
  openModal(editPopup);
});

// Сохранение профиля
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
});

// Открытие попапа добавления карточки
addButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationSettings);
  openModal(newCardPopup);
});

// Добавление новой карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  const cardElement = createCard(cardData, deleteCard, handleLike, openImagePopup);
  placesList.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardPopup);
});

// Функция открытия попапа с изображением
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

// Отрисовка начальных карточек
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, handleLike, openImagePopup);
  placesList.append(cardElement);
});

// Включение валидации
enableValidation(validationSettings);
