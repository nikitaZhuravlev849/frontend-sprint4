// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

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

// Функция открытия попапа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия попапа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Закрытие по Escape
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Добавить анимацию и закрытие по оверлею всем попапам
document.querySelectorAll('.popup').forEach(function(popup) {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Закрытие крестиком
document.querySelectorAll('.popup__close').forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeModal(closeBtn.closest('.popup'));
  });
});

// Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Функция удаления карточки
  deleteButton.addEventListener('click', function() {
    cardElement.remove();
  });

  // Лайк
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  // Открытие картинки
  cardImage.addEventListener('click', function() {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  return cardElement;
}

// Открытие попапа редактирования профиля
editButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

// Сохранение профиля
editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
});

// Открытие попапа добавления карточки
addButton.addEventListener('click', function() {
  newCardForm.reset();
  openModal(newCardPopup);
});

// Добавление новой карточки
newCardForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardElement = createCard({ name: cardNameInput.value, link: cardLinkInput.value });
  placesList.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardPopup);
});

// Вывести карточки на страницу
initialCards.forEach(function(cardData) {
  placesList.append(createCard(cardData));
});
