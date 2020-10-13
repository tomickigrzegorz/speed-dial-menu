class SpeedDial {
  constructor(options) {
    const defaultOption = {
      sPos: 60,
      steps: 50,
      stepTrans: 100,
      position: null,
      topBtn: 'speed-dial__top',
    };

    const option = { ...defaultOption, ...options };

    this.options = option;

    document.body.insertAdjacentElement(
      'beforeend',
      this.element({
        el: `speed-dial`,
        type: 'div',
        data: ['position', option.data.position],
      })
    );

    this.iconPlus(option.icons.iconPlus);
    this.iconSmall(option.icons.iconsSmall);

    if (
      option.data.position === 'bottom-left' ||
      option.data.position === 'bottom-right'
    ) {
      this.topButtons(option.icons.iconTop);
    }
  }

  element = ({ type, data, el, style, viebox, url, target, path }) => {
    const element =
      type === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', type)
        : document.createElement(type);

    if (data) {
      const [_data, _value] = data;
      element.setAttribute(`data-${_data}`, _value);
    }
    if (el) {
      element.setAttribute('class', el);
    }
    if (style) {
      element.setAttribute('style', style);
    }
    if (url) {
      element.setAttribute('href', url);
      element.setAttribute('rel', 'noopener');
    }
    if (target) {
      element.setAttribute('target', target);
    }
    if (viebox) {
      element.setAttributeNS(null, 'viewBox', viebox);
    }
    if (path) {
      for (let i = 0; i < path.length; i++) {
        const newpath = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        newpath.setAttributeNS(null, 'd', path[i]);
        element.appendChild(newpath);
      }
    }
    return element;
  };

  select = (el) => {
    return document.querySelector(`.${el}`);
  };

  iconPlus = (actionButton) => {
    const speedDialBox = this.select('speed-dial');
    speedDialBox.appendChild(
      this.element({
        el: 'button-root',
        type: 'button',
        style: `background-color: ${actionButton.color}`,
      })
    );

    speedDialBox.insertAdjacentElement(
      'beforeend',
      this.element({
        el: 'action',
        type: 'div',
        data: ['direction', this.options.data.direction],
      })
    );

    const speedDialRoot = this.select('button-root');
    speedDialRoot.appendChild(
      this.element({
        el: 'icon icon__plus',
        type: 'svg',
        viebox: actionButton.viebox,
        path: actionButton.path,
      })
    );
  };

  topButtons = (options) => {
    const speedDialBox = this.select('speed-dial');
    speedDialBox.insertAdjacentElement(
      'afterend',
      this.element({
        el: this.options.topBtn,
        type: 'div',
        data: ['position', this.options.data.position],
      })
    );

    const buttonTop = this.select(this.options.topBtn);
    buttonTop.insertAdjacentElement(
      'beforeend',
      this.element({
        el: 'top-container',
        type: 'div',
        style: `background-color:${options.color};`,
      })
    );

    const buttonTopContainer = this.select('top-container');
    buttonTopContainer.appendChild(
      this.element({
        el: 'icon__top',
        type: 'svg',
        viebox: options.viebox,
        path: [options.path],
      })
    );

    if (this.options.position) {
      this.handleEvent();
    }
  };

  path = (paths, viebox) => {
    const svgElement = `background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viebox}'`;
    let path = '';
    for (let i = 0; i < paths.length; i++) {
      path += `%3E%3Cpath d='${paths[i]}'%3E%3C/path`;
    }
    return `${svgElement + path}%3E%3C/svg%3E`;
  };

  iconSmall = (icons) => {
    const speedDialAction = this.select('action');
    const sortIcon = icons.sort((a, b) => a.id - b.id);
    let stepTrans = this.options.steps * sortIcon.length + 50;

    for (let i = 0; i < sortIcon.length; i++) {
      const { name, viebox, url, path, target } = sortIcon[i];
      const speedDialItem = this.element({
        el: 'item',
        type: 'div',
        style: `transition-delay: ${stepTrans}ms;`,
      });

      const speedDialItemButton = this.element({
        el: 'button--small',
        type: 'a',
        url,
        target,
      });

      const speedDialItemByttonDiv = this.element({
        type: 'div',
        style: this.path(path, viebox),
      });

      speedDialItemButton.appendChild(speedDialItemByttonDiv);

      speedDialItemByttonDiv.insertAdjacentHTML(
        'afterend',
        `<span style='${this.tipPosition(
          this.options.data.position,
          this.options.data.direction
        )}'>${name}</span>`
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

  showScrollButton = () => {
    const { position, topBtn } = this.options;
    const buttonTop = this.select(topBtn);
    const scrollCheck = window.pageYOffset > position ? true : false;

    buttonTop.classList[scrollCheck ? 'add' : 'remove']('show');
    buttonTop.previousSibling.classList[scrollCheck ? 'add' : 'remove'](
      'margin-bottom'
    );
  };

  handleEvent = () => {
    window.addEventListener('scroll', this.showScrollButton);
    window.addEventListener('load', this.showScrollButton);

    const buttonTop = this.select(this.options.topBtn);
    buttonTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  };
}

export default SpeedDial;
