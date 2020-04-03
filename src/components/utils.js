export const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};
