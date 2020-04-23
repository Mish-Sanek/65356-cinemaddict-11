import AbstractComponent from './abstract-component';

const createFilmsBlock = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class Container extends AbstractComponent {
  getTemplate() {
    return createFilmsBlock();
  }
}
