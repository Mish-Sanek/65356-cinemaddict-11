import {getRandomIntegerNumber, getRandomItem, shuffle, getTime} from '../components/utils';
import {filmsName, filmsPosters, filmsDescription, genres, emojies} from '../mock/const';

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
    year: getRandomIntegerNumber(1900, 2020),
    country: `USA`,
    runtime: getTime(),
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
