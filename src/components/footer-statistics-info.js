import {createElement} from '../components/utils';

const createFooterStatisticsInfo = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class FooterStatistics {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsInfo();
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
