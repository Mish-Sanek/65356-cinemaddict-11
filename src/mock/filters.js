const filters = [`All`, `Watchlist`, `History`, `Favorites`];


export const generateFilters = (films) => {
  let index = 0;

  return filters.map((it) => {
    switch (it) {
      case filters[0]:
        index = films.length;
        break;
      case filters[1]:
        index = films.filter((film) => film.isWatched).length;
        break;
      case filters[2]:
        index = films.filter((film) => film.isLookingThrough).length;
        break;
      case filters[3]:
        index = films.filter((film) => film.isFavorites).length;
        break;
    }

    return {
      title: it,
      count: index
    };
  });
};
