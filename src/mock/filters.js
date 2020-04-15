const filters = [`All`, `Watchlist`, `History`, `Favorites`];


export const generateFilters = (films) => {
  let index = 0;

  return filters.map((it) => {
    switch (it) {
      case `All`:
        index = films.length;
        break;
      case `Watchlist`:
        index = films.filter((card) => card.isWatched).length;
        break;
      case `History`:
        index = films.filter((card) => card.isLookingThrough).length;
        break;
      case `Favorites`:
        index = films.filter((card) => card.isFavorites).length;
        break;
    }

    return {
      title: it,
      count: index
    };
  });
};
