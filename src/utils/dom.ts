const BODY = 'body';

export const getElements = (selector: string): NodeListOf<Element> =>
  document.querySelectorAll(selector);

export const getElement = (selector: string): Element | null =>
  document.querySelector(selector);

export const addClass = (element: Element, className: string): void =>
  element.classList.add(className);

export const removeClass = (element: Element, className: string): void =>
  element.classList.remove(className);

export const hasClass = (element: Element, className: string): boolean =>
  element.classList.contains(className);

export const getBody = (): Element | null => getElement(BODY);

export const addClassToBody = (className: string): void => {
  const body = getBody();
  if (body) addClass(body, className);
};

export const removeClassToBody = (className: string): void => {
  const body = getBody();
  if (body) removeClass(body, className);
};

export const hasClassOfBody = (className: string): boolean => {
  const body = getBody();
  return body ? hasClass(body, className) : false;
};

export const getRect = (className: string): DOMRect | null => {
  const element = getElement(className);
  return element ? element.getBoundingClientRect() : null;
};

export const getPosY = (className: string): number => {
  const rect = getRect(className);
  return rect ? rect.y : 0;
};

export const getDocumentHeight = (): number =>
  document.documentElement.offsetHeight;
