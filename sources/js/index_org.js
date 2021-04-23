import defaultOptions from './util/defaults';

class SpeedDial {
  constructor(options) {
    const option = { ...defaultOptions, ...options };

    this.options = option;

    document.body.insertAdjacentElement(
      'beforeend',
      this.element({
        el: `speed-dial`,
        type: 'div',
        data: ['position', option.data.position],
      })
    );

    this.iconBig(option.icons.iconBig);
    this.iconSmall(option.icons.iconsSmall);

    if (
      option.data.position === 'bottom-left' ||
      option.data.position === 'bottom-right'
    ) {
      this.topButtons(option.icons.iconTop);
    }

    if (option.modal) {
      this.modal();
    }
  }

  element = ({ type, data, el, style, url, parent, target, symbol, ariaLabel }) => {
    const element = type ? document.createElement(type) : parent;
    console.log(element);

    if (data) {
      const [_data, _value] = data;
      element.setAttribute(`data-${_data}`, _value);
    }
    if (el) {
      element.setAttribute('class', el);
    }
    if (style) {
      element.style = style;
    }
    if (url) {
      element.href = url;
      element.rel = 'noopener';
    }
    if (target) {
      element.target = target;
    }
    if (ariaLabel) {
      element.setAttribute('aria-label', ariaLabel);
    }

    if (symbol) {
      const elementSymbol = `<svg class="icon ${el}"><use xlink:href="#${symbol}"></use></svg>`;
      element.insertAdjacentHTML('beforeend', elementSymbol);
    }

    return element;
  };

  select = (el) => document.querySelector(`${el}`);

  iconBig = (actionButton) => {
    this.speedDialBox = this.select('.speed-dial');
    this.speedDialBox.appendChild(
      this.element({
        el: 'button-root',
        type: 'button',
        style: `background-color: ${actionButton.color}`,
        ariaLabel: actionButton.ariaLabel,
      })
    );

    this.speedDialBox.insertAdjacentElement(
      'beforeend',
      this.element({
        el: 'action',
        type: 'div',
        data: ['direction', this.options.data.direction],
      })
    );

    // console.log('root', this.select('.button-root'));

    this.speedDialRoot = this.select('.button-root');
    this.speedDialRoot.appendChild(
      'beforeend',
      this.element({
        el: 'icon__plus',
        parent: this.speedDialRoot,
        symbol: actionButton.symbol,
      })
    );
  };

  topButtons = (options) => {
    const speedDialBox = this.select('.speed-dial');
    speedDialBox.insertAdjacentElement(
      'afterend',
      this.element({
        el: this.options.topBtn,
        type: 'button',
        data: ['position', this.options.data.position],
        ariaLabel: options.ariaLabel,
      })
    );

    const buttonTop = this.select(`.${this.options.topBtn}`);
    buttonTop.insertAdjacentElement(
      'beforeend',
      this.element({
        el: 'top-container',
        type: 'div',
        style: `background-color:${options.color};`,
      })
    );

    const buttonTopContainer = this.select('.top-container');
    buttonTopContainer.appendChild(
      this.element({
        el: 'icon__top',
        parent: buttonTopContainer,
        symbol: options.symbol,
      })
    );

    if (this.options.position) {
      window.addEventListener('scroll', this.showScrollButton);
      window.addEventListener('load', this.showScrollButton);

      document.addEventListener('click', this.handleEvent, false);
    }
  };

  iconSmall = (icons) => {
    const speedDialAction = this.select('.action');
    const sortIcon = icons.sort((a, b) => a.id - b.id);
    let stepTrans = this.options.steps * sortIcon.length + 50;

    for (let i = 0; i < sortIcon.length; i++) {
      const { className, symbol, url, target } = sortIcon[i];
      const extendClass = className || '';
      const speedDialItem = this.element({
        el: `item ${extendClass}`,
        type: 'button',
        ariaLabel: icons[i].ariaLabel,
        style: `transition-delay: ${stepTrans}ms;`,
      });

      let options = url ? { type: 'a', url, target } : { type: 'div' };

      const speedDialItemButton = this.element({
        el: 'button--small',
        ...options,
      });

      const speedDialItemByttonDiv = this.element({ type: 'div' });

      speedDialItemButton.appendChild(speedDialItemByttonDiv);

      speedDialItemByttonDiv.insertAdjacentHTML(
        'afterend',
        `<span style='${this.tipPosition(
          this.options.data.position,
          this.options.data.direction
        )}'>${symbol}</span>`
      );

      speedDialItem.appendChild(speedDialItemButton);
      speedDialAction.appendChild(speedDialItem);

      stepTrans -= this.options.steps;
    }
  };

  tipPosition = (position, direction) => {
    const pos = this.options.sPos;
    const type = position.split('-')[1] === 'left' ? 'left' : 'right';

    let style;
    if (position === 'top-left' || position === 'top-right') {
      style = direction === 'bottom' ? `${type}: ${pos}px` : `top: ${pos}px`;
    } else {
      style = direction === 'top' ? `${type}: ${pos}px` : `bottom: ${pos}px`;
    }

    return style;
  };

  modal = () => {
    const speedDialBox = this.select('.speed-dial');
    const modal = document.createElement('div');
    modal.className = 'speed-dial-modal';
    speedDialBox.insertAdjacentElement('afterend', modal);
  };

  showScrollButton = () => {
    const speedDialBox = this.select('.speed-dial');
    const { position, topBtn } = this.options;
    const buttonTop = this.select(`.${topBtn}`);
    const scrollCheck = window.pageYOffset > position ? true : false;

    buttonTop.classList[scrollCheck ? 'add' : 'remove']('show');
    speedDialBox.classList[scrollCheck ? 'add' : 'remove']('margin-bottom');
  };

  handleEvent = (event) => {
    console.log(event.target);
    // console.log(event.target.closest('.button-root'));
    const buttonTop = this.select(`.${this.options.topBtn}`);
    buttonTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    if (!this.options.visibility) return;
    this.speedDialBox.classList.add('speed-dial-active');
    this.speedDialRoot.addEventListener('click', () => {
      this.speedDialBox.classList.toggle('speed-dial-active');
    });
  };
}

export default SpeedDial;
