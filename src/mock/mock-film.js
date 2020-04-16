import {filmsName, filmsPosters, filmsDescription, genres, emojies} from '../mock/const';

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const getRandomItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);
  return array[randomIndex];
};

const shuffle = (array) => {
  array = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateComment = () => {
  return {
    text: shuffle(filmsDescription).slice(0, getRandomIntegerNumber(1, 5)).join(``),
    emoji: getRandomItem(emojies),
    author: `Pierre Dunn`,
    date: new Date(getRandomIntegerNumber(new Date(2010, 1, 1).getTime(), new Date(2020, 1, 1).getTime()))
  };
};

const generateFilm = () => {
  return {
    title: getRandomItem(filmsName),
    poster: getRandomItem(filmsPosters),
    rating: getRandomIntegerNumber(0, 10).toFixed(1),
    director: `Pupa Lupson`,
    writers: `writers`,
    actors: `actors`,
    releaseDate: new Date(getRandomIntegerNumber(new Date(2010, 1, 1).getDate(), new Date(2020, 1, 1).getDate())),
    country: `USA`,
    runtime: new Date(),
    genres: shuffle(genres).slice(0, getRandomIntegerNumber(1, 6))[0],
    description: shuffle(filmsDescription).slice(0, getRandomIntegerNumber(1, 5)).join(`s`),
    comments: Array.from({length: getRandomIntegerNumber(0, 5)}, generateComment),
    isFavorites: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isLookingThrough: Math.random() > 0.5
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
