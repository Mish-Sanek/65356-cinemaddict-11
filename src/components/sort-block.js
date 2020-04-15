const createFilterMarkup = (filter, isActive) => {
  const {title, count} = filter;

  return (
    `<a href="#${title}" class="main-navigation__item
    ${isActive ? `main-navigation__item--active` : ``}">${title}
      ${count === 0 ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`
  )
}

export const createSortBlock = (filters) => {
  const filtersMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

  return (
    `<ul class="sort">
      ${filtersMarkup}
    </ul>`
  );
};
