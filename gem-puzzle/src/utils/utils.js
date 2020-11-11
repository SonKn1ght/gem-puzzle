import { RenderPosition } from './const';
import AbstractView from '../view/absctract-view';

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, child, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

// по размеру ребра поля получаем ключ последнего элемента в массиве
export const getVoidPosition = (size) => {
  return parseInt(size, 10) ** 2 - 1;
};

export const formatTimeByHuman = (date) => {
  return date.toLocaleString(`en-US`, { minute: `2-digit`, second: `2-digit` });
};
