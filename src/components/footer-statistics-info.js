import AbstractComponent from './abstract-component';

const createFooterStatisticsInfo = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  getTemplate() {
    return createFooterStatisticsInfo();
  }
}
