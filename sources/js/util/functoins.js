/**
 * Creates a modal div
 *
 * @param {HTMLElement} speedDial
 */
const createModal = (speedDial) => {
  const modal = document.createElement('div');
  modal.className = 'speed-dial__modal';
  speedDial.insertAdjacentElement('afterend', modal);
};

/**
 * svg element width class and symbol
 *
 * @param {String} classname
 * @param {String} symbol
 * @returns SVGElement
 */
const svgUse = (classname, symbol) =>
  `<svg class="icon ${classname}"><use xlink:href="#${symbol}"></use></svg>`;

/**
 * Create style depending on position and direction
 *
 * @param {String} position
 * @param {String} direction
 * @param {Object} options
 * @returns String
 */
const tipPosition = (position, direction, { sPos }) => {
  const type = position.split('-')[1] === 'left' ? 'left' : 'right';

  let style;
  if (position === 'top-left' || position === 'top-right') {
    style = direction === 'bottom' ? `${type}: ${sPos}px` : `top: ${sPos}px`;
  } else {
    style = direction === 'top' ? `${type}: ${sPos}px` : `bottom: ${sPos}px`;
  }

  return style;
};

/**
 * Create big button
 *
 * @param {Object} object
 * @param {String} root
 * @returns HTMLElement
 */
const buttonBig = ({ icons, bgColor }, root) => {
  const button = document.createElement('button');
  button.className = root;
  button.style.fill = icons.iconBig.color || bgColor;
  button.setAttribute(
    'aria-label',
    icons.iconBig.ariaLabel || 'show social buttons'
  );

  const svgBig = svgUse('icon__plus', icons.iconBig.symbol);
  button.insertAdjacentHTML('beforeend', svgBig);

  return button;
};

/**
 * Create small button
 *
 * @param {Object} options
 * @returns HTMLElement
 */
const buttonsSmall = (options) => {
  const { data, icons, steps } = options;

  const container = document.createElement('div');
  container.className = 'speed-dial__action';
  container.setAttribute('data-direction', data.direction);

  const elements = icons.iconsSmall;
  const sortIcon = elements.sort((a, b) => a.id - b.id);
  let stepTrans = steps * sortIcon.length + 50;

  elements.map((element) => {
    const { symbol, className, ariaLabel, target, url } = element;
    const small = document.createElement('button');
    small.classList.add('speed-dial__item', symbol);
    if (ariaLabel) {
      small.setAttribute('aria-label', ariaLabel);
    }
    small.setAttribute('style', `transition-delay: ${stepTrans}ms`);

    let link;
    if (url) {
      link = document.createElement('a');
    } else {
      link = document.createElement('div');
    }

    link.className = 'speed-dial__button--small';
    if (className) {
      link.classList.add(className);
    }

    if (url) {
      link.href = url;
      link.rel = 'noopener';
    }
    if (target) {
      link.target = target;
    }

    container.appendChild(small);

    const smallIcon = svgUse('icon__small', symbol);
    link.insertAdjacentHTML('beforeend', smallIcon);

    if (element.tooltipText) {
      const span = document.createElement('span');
      span.textContent = element.tooltipText;
      span.setAttribute(
        'style',
        tipPosition(data.position, data.direction, options)
      );

      link.insertAdjacentElement('beforeend', span);
    }

    small.appendChild(link);

    stepTrans -= steps;
  });

  return container;
};
export { createModal, svgUse, buttonBig, buttonsSmall };
