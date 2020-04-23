import AbstractComponent from "./abstract-component";

const createTopFilmsTemplate = (caption) => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">${caption}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class TopFilms extends AbstractComponent {
  constructor(caption) {
    super();
    this._caption = caption;
  }

  getTemplate() {
    return createTopFilmsTemplate(this._caption);
  }
}
