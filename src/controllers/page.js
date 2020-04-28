import FilmsComponent from "../components/films-block";
import FilmComponent from '../components/film';
import ShowMoreButton from '../components/show-more';
import NoFilmComponent from '../components/no-film';
import FilmsListBlockComponent from '../components/films-list-block';
import SortComponent, {SortType} from '../components/sort-block';
import TopFilmsComponent from '../components/top-films';
import PopupComponent from '../components/film-detail';
import {renderComponent, remove} from '../utils/render';
import {rubricsForTop} from '../mock/const';
import {getConditionFilms} from '../utils/common';

const TOP_TWO = 2;
const SHOWING_CARD = 5;
const FILM_COUNT_BY_BUTTON = 5;

let showingFilmCount = SHOWING_CARD;

const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmComponent(film);

  renderComponent(filmsListElement, filmComponent);

  const createPopupElement = (item) => {
    const popupComponent = new PopupComponent(item);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    popupComponent.setButtonCloseHandler(() => {
      remove(popupComponent);
    });

    return popupComponent;
  };

  filmComponent.setClickHandler(() => {
    const isPopup = document.querySelector(`.film-details`);
    const bodyElement = document.querySelector(`body`);

    if (isPopup) {
      isPopup.remove();
    }

    renderComponent(bodyElement, createPopupElement(film));
  });
};

const renderFilms = (filmsListElement, films) => {
  films.forEach((film) => renderFilm(filmsListElement, film));
};

const createFilmsContainers = (place) => {
  for (let i = 0; i < rubricsForTop.length; i++) {
    renderComponent(place, new TopFilmsComponent(rubricsForTop[i]));
  }
};

const renderTopListFilms = (container, films) => {
  const [topRatedContainer, mostCommentedContainer] = container.querySelectorAll(`section.films-list--extra > .films-list__container`);
  getConditionFilms(films, TOP_TWO, `rating`).forEach((item) => renderFilm(topRatedContainer, item));
  getConditionFilms(films, TOP_TWO, `comments`).forEach((item) => renderFilm(mostCommentedContainer, item));
};

export default class PageController {
  constructor(main) {
    this._showMoreButton = new ShowMoreButton();
    this._noFilmComponent = new NoFilmComponent();
    this._filmsListBlockComponent = new FilmsListBlockComponent();
    this._sortComponent = new SortComponent();
    this._main = main;
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmCount >= films.length) {
        return;
      }

      const container = this._filmsListBlockComponent.getElement();

      renderComponent(container, this._showMoreButton);

      this._showMoreButton.setButtonClickHandler(() => {
        const showedFilms = showingFilmCount;
        showingFilmCount += FILM_COUNT_BY_BUTTON;

        renderFilms(filmsListElement, films.slice(showedFilms, showingFilmCount));

        if (showingFilmCount >= films.length) {
          remove(this._showMoreButton);
        }
      });
    };

    renderComponent(this._main, this._sortComponent);

    this._filmsContainerElement = new FilmsComponent();
    renderComponent(this._main, this._filmsContainerElement);


    const container = this._filmsContainerElement.getElement();
    const isFilms = films.length;

    if (!isFilms) {
      renderComponent(container, this._noFilmComponent);
      return;
    }

    renderComponent(container, this._filmsListBlockComponent);

    const filmsListElement = this._filmsListBlockComponent.getElement().querySelector(`.films-list__container`);

    renderFilms(filmsListElement, films.slice(0, showingFilmCount));
    renderShowMoreButton();

    createFilmsContainers(container, TOP_TWO);

    renderTopListFilms(container, films);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {

      let sortedFilms = [];

      switch (sortType) {
        case SortType.DATE:
          sortedFilms = films.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortedFilms = films.slice(0, showingFilmCount);
          break;
      }

      filmsListElement.innerHTML = ``;
      renderFilms(filmsListElement, sortedFilms);
    });
  }
}
