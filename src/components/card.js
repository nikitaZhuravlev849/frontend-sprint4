function createCard(cardData, onDelete, onLike, onImageClick) {
  const cardTemplate = document.querySelector('#card-template');
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => onDelete(cardElement));
  likeButton.addEventListener('click', () => onLike(likeButton));
  cardImage.addEventListener('click', () => onImageClick(cardData));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function handleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, handleLike };
