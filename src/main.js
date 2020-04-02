import {createHeaderProfile} from './components/header-profile.js';
import {createMainNav} from './components/main-nav.js';
import {createSortBlock} from './components/sort-block.js';
import {createFilmsBlock} from './components/films-block.js';
import {createFilmsListBlock} from './components/films-list-block.js';
import {createFilmTemplate} from './components/film-template.js';
import {createTopRatedFilms} from './components/top-rated-films.js';
import {createMostCommentedFilms} from './components/most-commented-films.js';
import {createFooterStatisticsInfo} from './components/footer-statistics-info.js';

const TOTAL_NUMBER_OF_CARDS = 5;
const TOP_TWO = 2;

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

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
