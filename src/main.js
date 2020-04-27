import HeaderProfileComponent from './components/header-profile';
import MainNavComponent from './components/main-nav';
import FilmsComponent from './components/films-block';
import PageController from './controllers/page';
import FooterStatisticsComponent from './components/footer-statistics-info';
import {generateFilms} from './mock/film';
import {generateFilters} from './mock/filters';
import {getRandomIntegerNumber} from './utils/common';
import {renderComponent, replaceSort} from './utils/render';

const FILM_COUNT = 20;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

const randomRate = getRandomIntegerNumber(0, 20);
renderComponent(header, new HeaderProfileComponent(randomRate));

const films = generateFilms(FILM_COUNT);
const filters = generateFilters(films);

renderComponent(main, new MainNavComponent(filters));

const filmsContainerElement = new FilmsComponent();
renderComponent(main, filmsContainerElement);

const pageController = new PageController(filmsContainerElement);

pageController.render(films);

replaceSort(main);

const footerStatistics = document.querySelector(`.footer__statistics`);
renderComponent(footerStatistics, new FooterStatisticsComponent());
const totalFilms = footerStatistics.querySelector(`p`);
totalFilms.textContent = `${films.length} movies inside`;
