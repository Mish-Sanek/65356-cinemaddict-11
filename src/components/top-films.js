import {createElement} from '../components/utils';

const createTopFilmsTemplate = (caption) => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">${caption}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class TopFilms {
  constructor(caption) {
    this._caption = caption;
    this._element = null;
  }

  getTemplate() {
    return createTopFilmsTemplate(this._caption);
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
