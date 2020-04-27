export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export const renderComponent = (container, component, place = renderPosition.BEFOREEND) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case renderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replaceSort = (container) => {
  const sortElement = container.querySelector(`.sort`);
  const filmsContainerElement = container.querySelector(`.films`);

  container.insertBefore(sortElement, filmsContainerElement);
};
