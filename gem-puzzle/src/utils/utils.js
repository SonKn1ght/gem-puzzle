import {RenderPosition, UserAction} from './const';
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

const addZero = (number) => {
  let numberCurrent = String(number);
  const twoDigit = 2;
  if (numberCurrent.length === twoDigit) {
    return number;
  }
  numberCurrent = `0${number}`;
  return numberCurrent;
};

export const formatGameDuration = (duration) => {
  const hour = Math.floor((duration / (1000 * 60 * 60)) % 60);
  const minute = Math.floor((duration / (1000 * 60)) % 60);
  const seconds = Math.floor((duration / (1000)) % 60);
  if (hour !== 0) {
    return `${addZero(hour)}:${addZero(minute)}:${addZero(seconds)}`;
  }

  return `${addZero(minute)}:${addZero(seconds)}`;
};


