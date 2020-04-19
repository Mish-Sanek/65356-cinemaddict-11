import HeaderProfileComponent from './components/header-profile';
import MainNavComponent from './components/main-nav';
import SortComponent from './components/sort-block';
import FilmsComponent from './components/films-block';
import FilmsListBlockComponent from './components/films-list-block';
import FilmComponent from './components/film';
import TopFilmsComponent from './components/top-films';
import PopupComponent from './components/film-detail';
import NoFilmComponent from './components/no-film';
import FooterStatisticsComponent from './components/footer-statistics-info';
import {rubricsForTop} from './mock/const';
import {renderComponent, getRandomIntegerNumber, getConditionFilms} from './components/utils';
import {generateFilters, generateNoFilmFilters} from './mock/filters';
import {generateFilms} from './mock/film.js';

const TOP_TWO = 2;
const FILM_COUNT = 20;
const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
let showingCardCount = SHOWING_CARD;

const body = document.body;
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmComponent(film);
  const filmPosterElement = filmComponent.getElement().querySelector(`.film-card__poster`);
  const filmTitleElement = filmComponent.getElement().querySelector(`.film-card__title`);
  const filmCommentElement = filmComponent.getElement().querySelector(`.film-card__comments`);
  const filmElements = [filmPosterElement, filmTitleElement, filmCommentElement];

  renderComponent(filmListElement, filmComponent.getElement());

  const createPopupElement = () => {
    const popupComponent = new PopupComponent(film);
    const popupButtonClose = popupComponent.getElement().querySelector(`.film-details__close-btn`);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        popupComponent.getElement().remove();
        popupComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    popupButtonClose.addEventListener(`click`, () => {
      popupComponent.getElement().remove();
      popupComponent.removeElement();
    });

    return popupComponent;
  };

  let lastPopup;

  filmElements.forEach((el) => {
    el.addEventListener(`click`, () => {
      if (lastPopup) {
        lastPopup.getElement().remove();
        lastPopup.removeElement();
      }
      lastPopup = createPopupElement(film);
      renderComponent(body, lastPopup.getElement());
    });
  });
};

const randomRate = getRandomIntegerNumber(0, 20);
renderComponent(header, new HeaderProfileComponent(randomRate).getElement());

const films = generateFilms(FILM_COUNT);

const isFilms = films.length;

if (!isFilms) {
  const filter = generateNoFilmFilters();
  renderComponent(main, new MainNavComponent(filter).getElement());
  renderComponent(main, new SortComponent().getElement());
  renderComponent(main, new NoFilmComponent().getElement());
} else {
  const filters = generateFilters(films);
  renderComponent(main, new MainNavComponent(filters).getElement());
  renderComponent(main, new SortComponent(filters).getElement());

  const filmsContainerElement = new FilmsComponent();
  renderComponent(main, filmsContainerElement.getElement());

  const filmsBlock = main.querySelector(`.films`);
  renderComponent(filmsContainerElement.getElement(), new FilmsListBlockComponent().getElement());

  const filmsList = filmsBlock.querySelector(`.films-list__container`);
  films.slice(0, showingCardCount).forEach((film) => renderFilm(filmsList, film));

  const topComponents = Array.from({length: 2}, (it, i) => {
    const component = new TopFilmsComponent(rubricsForTop[i]);
    renderComponent(filmsContainerElement.getElement(), component.getElement());
    return component;
  });

  topComponents.forEach((component, i) => {
    const container = component.getElement().querySelector(`.films-list__container`);
    switch (rubricsForTop[i]) {
      case `Top rated`:
        getConditionFilms(films, TOP_TWO, `rating`).forEach((film) => renderFilm(container, film));
        break;
      case `Most commented`:
        getConditionFilms(films, TOP_TWO, `comments`).forEach((film) => renderFilm(container, film));
        break;
    }
  });

  const buttonLoadMore = main.querySelector(`.films-list__show-more`);
  buttonLoadMore.addEventListener(`click`, () => {
    const showedCards = showingCardCount;
    showingCardCount += CARD_COUNT_BY_BUTTON;

    films.slice(showedCards, showingCardCount).forEach((film) => {
      return renderFilm(filmsList, film);
    });

    if (showingCardCount >= films.length) {
      buttonLoadMore.remove();
    }
  });

  const footerStatistics = document.querySelector(`.footer__statistics`);
  renderComponent(footerStatistics, new FooterStatisticsComponent().getElement());
  const totalFilms = footerStatistics.querySelector(`p`);
  totalFilms.textContent = `${films.length} movies inside`;
}
