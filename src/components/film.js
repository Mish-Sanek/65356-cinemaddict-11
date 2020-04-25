import AbstractComponent from './abstract-component';
import {filmHandlerElements} from '../mock/const';

const createFilmTemplate = (film) => {
  const {title, poster, rating, year, runtime, genres, description, comments, isFavorites, isWatched, isLookingThrough} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genres}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length >= 140 ? description.substring(138, description.length) + `...` : description}</p>
      <a class="film-card__comments">${comments.length > 1 ? comments.length + ` comments` : comments.length + ` comment`}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item ${isFavorites ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item ${isWatched ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item ${isLookingThrough ? `film-card__controls-item--active` : ``} button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  getHandlerElements() {
    const elements = [];
    filmHandlerElements.forEach((it) => elements.push(this.getElement().querySelector(it)));

    return elements;
  }

  setClickHandler(handler) {
    this.getHandlerElements().forEach((it) => {
      it.addEventListener(`click`, handler);
    });
  }
}
