import {createHeaderProfile} from './components/header-profile';
import {createMainNav} from './components/main-nav';
import {createSortBlock} from './components/sort-block';
import {createFilmsBlock} from './components/films-block';
import {createFilmsListBlock} from './components/films-list-block';
import {createFilmTemplate} from './components/film-template';
import {generateFilms} from './mock/mock-film';
import {createTopRatedFilms} from './components/top-rated-films';
import {createMostCommentedFilms} from './components/most-commented-films';
import {createFooterStatisticsInfo} from './components/footer-statistics-info';
import {renderComponent} from './components/utils';

const TOP_TWO = 2;
const FILM_COUNT = 20;
const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

renderComponent(header, createHeaderProfile());
renderComponent(main, createMainNav());
renderComponent(main, createSortBlock());
renderComponent(main, createFilmsBlock());

const filmsBlock = document.querySelector(`.films`);
const films = generateFilms(FILM_COUNT);

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

const filmsExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const topRatedFilms = filmsExtraContainer[0];
const mostCommentedFilms = filmsExtraContainer[1];

films.slice(0, TOP_TWO).forEach((film) => renderComponent(topRatedFilms, createFilmTemplate(film)));
films.slice(0, TOP_TWO).forEach((film) => renderComponent(mostCommentedFilms, createFilmTemplate(film)));

renderComponent(footerStatistics, createFooterStatisticsInfo());
