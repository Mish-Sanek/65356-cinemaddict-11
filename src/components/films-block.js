import {createElement} from '../components/utils';

const createFilmsBlock = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class Container {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsBlock();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
