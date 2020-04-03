import {createHeaderProfile} from './components/header-profile';
import {createMainNav} from './components/main-nav';
import {createSortBlock} from './components/sort-block';
import {createFilmsBlock} from './components/films-block';
import {createFilmsListBlock} from './components/films-list-block';
import {createFilmTemplate} from './components/film-template';
import {createTopRatedFilms} from './components/top-rated-films';
import {createMostCommentedFilms} from './components/most-commented-films';
import {createFooterStatisticsInfo} from './components/footer-statistics-info';
import {renderComponent} from './components/utils';

const TOTAL_NUMBER_OF_CARDS = 5;
const TOP_TWO = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

renderComponent(header, createHeaderProfile());
renderComponent(main, createMainNav());
renderComponent(main, createSortBlock());
renderComponent(main, createFilmsBlock());

const filmsBlock = document.querySelector(`.films`);

renderComponent(filmsBlock, createFilmsListBlock());

const filmsListContainer = document.querySelector(`.films-list__container`);

for (let i = 0; i < TOTAL_NUMBER_OF_CARDS; i++) {
  renderComponent(filmsListContainer, createFilmTemplate());
}
renderComponent(filmsBlock, createTopRatedFilms());
renderComponent(filmsBlock, createMostCommentedFilms());

const filmsExtraContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const topRatedFilms = filmsExtraContainer[0];
const mostCommentedFilms = filmsExtraContainer[1];

for (let i = 0; i < TOP_TWO; i++) {
  renderComponent(topRatedFilms, createFilmTemplate());
}

for (let i = 0; i < TOP_TWO; i++) {
  renderComponent(mostCommentedFilms, createFilmTemplate());
}

renderComponent(footerStatistics, createFooterStatisticsInfo());
