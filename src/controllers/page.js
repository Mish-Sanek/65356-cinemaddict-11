import FilmComponent from '../components/film';
import ShowMoreButton from '../components/show-more';
import NoFilmComponent from '../components/no-film';
import FilmsListBlockComponent from '../components/films-list-block';
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

const createFilmsContainers = (place, count) => {
  new Array(count)
    .fill(``)
    .forEach((i) => {
      renderComponent(place, new TopFilmsComponent(rubricsForTop[i]));
    });
};

const renderTopListFilms = (container, films) => {
  const ratedFilmsContainers = container.querySelectorAll(`section.films-list--extra > .films-list__container`);

  Array.from(ratedFilmsContainers).forEach((it) => {

    switch (it.previousElementSibling.firstChild.data) {
      case `Top rated`:
        getConditionFilms(films, TOP_TWO, `rating`).forEach((item) => renderFilm(it, item));
        break;
      case `Most commented`:
        getConditionFilms(films, TOP_TWO, `comments`).forEach((item) => renderFilm(it, item));
        break;
    }

  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._showMoreButton = new ShowMoreButton();
    this._noFilmComponent = new NoFilmComponent();
    this._filmsListBlockComponent = new FilmsListBlockComponent();
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

    const container = this._container.getElement();
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
  }
}
