class SpeedDial {
  constructor(options) {
    const defaultOption = {
      sPos: 60,
      steps: 50,
      stepTrans: 100,
      modal: false,
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

  element = ({ type, data, el, style, viebox, url, target, path, ariaLabel }) => {
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
    if (viebox) {
      element.setAttributeNS(null, 'viewBox', viebox);
    }
    if (path) {
      for (let i = 0; i < path.length; i++) {
        const newpath = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        const pathType = Array.isArray(path[i]) ? path[i][i] : path[i];
        Object.keys(pathType).map((key) => {
          newpath.setAttributeNS(null, key, pathType[key]);
        });
        element.appendChild(newpath);
      }
    }
    return element;
  };

  select = (el) => document.querySelector(`.${el}`);

  iconBig = (actionButton) => {
    const speedDialBox = this.select('speed-dial');
    speedDialBox.appendChild(
      this.element({
        el: 'button-root',
        type: 'button',
        style: `background-color: ${actionButton.color}`,
        ariaLabel: actionButton.ariaLabel,
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
        type: 'button',
        data: ['position', this.options.data.position],
        ariaLabel: options.ariaLabel,
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
        path: [...options.path],
      })
    );

    if (this.options.position) {
      this.handleEvent();
    }
  };

  path = (paths, viebox) => {
    let svgElement = '';
    let path = '';
    for (let i = 0; i < paths.length; i++) {
      svgElement = `background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viebox}'`;

      let element = '';
      Object.keys(paths[i]).map((key) => {
        let val =
          key === 'fill' ? paths[i][key].replace('#', '%23') : paths[i][key];
        element += ` ${key}='${val}'`;
      });
      path += `%3E%3Cpath ${element}%3E%3C/path`;
    }
    return `${svgElement}${path}%3E%3C/svg%3E`;
  };

  iconSmall = (icons) => {
    const speedDialAction = this.select('action');
    const sortIcon = icons.sort((a, b) => a.id - b.id);
    let stepTrans = this.options.steps * sortIcon.length + 50;

    for (let i = 0; i < sortIcon.length; i++) {
      const { className, name, viebox, url, path, target } = sortIcon[i];
      const extendClass = className || '';
      const speedDialItem = this.element({
        el: `item ${extendClass}`,
        type: 'button',
        ariaLabel: icons[i].ariaLabel,
        style: `transition-delay: ${stepTrans}ms;`,
      });

      let options = {};
      if (url) {
        options = {
          type: 'a',
          url,
          target,
        };
      } else {
        options = {
          type: 'div',
        };
      }

      const speedDialItemButton = this.element({
        el: 'button--small',
        ...options,
      });

      const speedDialItemByttonDiv = this.element({
        type: 'div',
        style: this.path([...path], viebox),
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

  modal = () => {
    const speedDialBox = this.select('speed-dial');
    const modal = document.createElement('div');
    modal.className = 'speed-dial-modal';
    speedDialBox.insertAdjacentElement('afterend', modal);
  };

  showScrollButton = () => {
    const speedDialBox = this.select('speed-dial');
    const { position, topBtn } = this.options;
    const buttonTop = this.select(topBtn);
    const scrollCheck = window.pageYOffset > position ? true : false;

    buttonTop.classList[scrollCheck ? 'add' : 'remove']('show');
    speedDialBox.classList[scrollCheck ? 'add' : 'remove']('margin-bottom');
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
