import AbstractComponent from './abstract-component';

const createMainNavMarkup = (filter, isActive) => {
  const {title, count} = filter;

  return (
    `<a href="#${title}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">
      ${title}
      <span class="main-navigation__item-count">${count}</span>
    </a>`
  );
};

const createMainNav = (filters) => {
  const mainNavMarkup = filters.map((it, i) => createMainNavMarkup(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${mainNavMarkup}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MainNav extends AbstractComponent {
  constructor(filters) {
    super(filters);
    this._filters = filters;
  }

  getTemplate() {
    return createMainNav(this._filters);
  }
}
