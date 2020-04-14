const filmsName = [
  `Made for Each Other`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Sagebrush Trail`,
  `Santa Claus Conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`
];

const filmsPosters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const filmsDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const genres = [`Musical`, `Cartoon`, `Action`, `Horror`, `Drama`, `Comedy`];

const emojies = [`smile`, `sleeping`, `puke`, `angry`];

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
    text: shuffle(filmsDescription).slice(0, getRandomIntegerNumber(1, 5)),
    emoji: emojies[getRandomIntegerNumber(0, 3)],
    author: `Pierre Dunn`,
    date: new Date(getRandomIntegerNumber(new Date(2010, 1, 1).getTime(), new Date(2020, 1, 1).getTime())),
    deleteButton: `<button class="film-details__comment-delete">Delete</button>`
  };
};

const generateFilm = () => {
  return {
    title: getRandomItem(filmsName),
    originalTitle: `Original:`,
    poster: getRandomItem(filmsPosters),
    rating: getRandomIntegerNumber(0, 10).toFixed(1),
    director: `Pupa Lupson`,
    screenwriters: `screenwriters`,
    actors: `actors`,
    year: `1939`,
    releaseDate: `01 April 1939`,
    country: `USA`,
    runtime: `1h 25m`,
    genres: shuffle(genres).slice(0, getRandomIntegerNumber(1, 6))[0],
    description: shuffle(filmsDescription).slice(0, getRandomIntegerNumber(1, 5)),
    commentsCount: `5 comments`,
    comments: Array.from({length: getRandomIntegerNumber(0, 5)}, generateComment)
  };
};

export const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};
