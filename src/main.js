import {createFilmDetailTemplate} from './components/film-detail-template';
import {createHeaderProfile} from './components/header-profile';
import {createMainNav} from './components/main-nav';
import {createSortBlock} from './components/sort-block';
import {createFilmsBlock} from './components/films-block';
import {createFilmsListBlock} from './components/films-list-block';
import {createFilmTemplate} from './components/film-template';
import {generateFilms} from './mock/mock-film';
import {generateFilters} from './mock/filters';
import {createTopRatedFilms} from './components/top-rated-films';
import {createMostCommentedFilms} from './components/most-commented-films';
import {createFooterStatisticsInfo} from './components/footer-statistics-info';
import {renderComponent, getTopRatedFilms, getMostCommentedFilms} from './components/utils';

const TOP_TWO = 2;
const FILM_COUNT = 20;
const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);
const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);

renderComponent(header, createHeaderProfile());
renderComponent(main, createMainNav());
renderComponent(main, createSortBlock(filters));
renderComponent(main, createFilmsBlock());

const filmsBlock = document.querySelector(`.films`);

renderComponent(filmsBlock, createFilmsListBlock());

const filmsListContainer = document.querySelector(`.films-list__container`);
let showingCardCount = SHOWING_CARD;

films.slice(0, showingCardCount).forEach((film) => renderComponent(filmsListContainer, createFilmTemplate(film)));

const showMoreBtn = filmsBlock.querySelector(`.films-list__show-more`);

showMoreBtn.addEventListener(`click`, () => {
  const showedCards = showingCardCount;
  showingCardCount += CARD_COUNT_BY_BUTTON;

  films.slice(showedCards, showingCardCount).forEach((film) => {
    return renderComponent(filmsListContainer, createFilmTemplate(film));
  });

  if (showingCardCount >= films.length) {
    showMoreBtn.remove();
  }
});

renderComponent(filmsBlock, createTopRatedFilms());
renderComponent(filmsBlock, createMostCommentedFilms());

const ratedContainerElements = filmsBlock.querySelectorAll(`section.films-list--extra > .films-list__container`);

Array.from(ratedContainerElements).forEach((it) => {
  switch (it.previousElementSibling.firstChild.data) {
    case `Top rated`:
      getTopRatedFilms(films, TOP_TWO).forEach((card) => renderComponent(it, createFilmTemplate(card)));
      break;
    case `Most commented`:
      getMostCommentedFilms(films, TOP_TWO).forEach((card) => renderComponent(it, createFilmTemplate(card)));
      break;
  }
});

renderComponent(footerStatistics, createFooterStatisticsInfo());

const filmPoster = main.querySelectorAll(`.film-card__poster`);
const filmTitle = main.querySelectorAll(`.film-card__title`);
const filmComments = main.querySelectorAll(`.film-card__comments`);

const openFilmDetail = () => {
  renderComponent(document.body, createFilmDetailTemplate());
};

for (let i = 0; i < filmPoster.length; i++) {
  filmPoster[i].addEventListener(`click`, openFilmDetail);
}

for (let i = 0; i < filmTitle.length; i++) {
  filmTitle[i].addEventListener(`click`, openFilmDetail);
}

for (let i = 0; i < filmComments.length; i++) {
  filmComments[i].addEventListener(`click`, openFilmDetail);
}

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${films.length} movies inside`;
