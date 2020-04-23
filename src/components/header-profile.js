import AbstractComponent from './abstract-component';

const ranks = {
  0: ``,
  10: `novice`,
  11: `fan`,
  20: `movie buff`
};

export const getRank = (count) => {
  let rank = ranks[Object.keys(ranks).find((it) => count <= it)];
  return rank;
};

const createHeaderProfile = (amount) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRank(amount)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class HeaderProfile extends AbstractComponent {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createHeaderProfile(this._amount);
  }
}
