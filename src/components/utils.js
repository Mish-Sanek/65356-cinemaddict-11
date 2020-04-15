export const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const getTopRatedFilms = (films, amount) => {
  const values = films.map((film) => film.rating).sort((a, b) => a - b).slice(-amount);
  const newFilms = films.filter((film) => {
    return values.find((it) => it === film.rating);
  });
  return newFilms;
};

export const getMostCommentedFilms = (films, amount) => {
  const values = films.map((film) => film.comments).sort((a, b) => a - b).slice(-amount);
  const newFilms = films.filter((film) => {
    return values.find((it) => it === film.comments);
  });
  return newFilms;
};
