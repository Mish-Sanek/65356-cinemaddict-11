export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  return array[randomIndex];
};

export const shuffle = (array) => {
  array = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getHours = () => 1 + Math.floor(Math.random() * 3);
const getMinutes = () => Math.floor(Math.random() * 60);

export const getTime = () => {
  return `${getHours()}h ${getMinutes()}m`;
};

export const getConditionFilms = (films, amount, category) => {
  const values = films.map((film) => film[category]).sort((a, b) => a - b).slice(-amount);
  const newFilms = films.filter((film) => values.find((it) => it === film[category])).slice(-amount);
  return newFilms;
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
