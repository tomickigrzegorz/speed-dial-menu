class SpeedDial {
  constructor({ icons, scroll, steps, data }) {
    this.position = data.position;
    this.direction = data.direction;
    this.spanPosition = 60;
    this.steps = steps || 50;
    this.scroll = scroll;
    this.stepTransition = 100;

    document.body.insertAdjacentElement(
      'beforeend',
      this.createElement({
        eClass: `speed-dial`,
        eType: 'div',
        eData: ['position', this.position],
      })
    );

    this.bigPlus(icons.plusIcon);
    this.smallIcons(icons.smallIcons);

    if (typeof scroll !== 'undefined') {
      this.buttonTopColor =
        typeof scroll.color !== 'undefined' ? scroll.color : '#333';
      this.scrollPosition =
        typeof scroll.position !== 'undefined' ? scroll.position : 100;
      if (this.position === 'bottom-left' || this.position === 'bottom-right') {
        this.topButtons();
      }
    }
  }

  createElement({
    eType,
    eData,
    eClass,
    eStyle,
    eViewBox,
    eUrl,
    eTarget,
    ePath,
  }) {
    const element =
      eType === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', eType)
        : document.createElement(eType);

    if (eData) {
      const [data, value] = eData;
      element.setAttribute(`data-${data}`, value);
    }
    if (eClass) {
      element.setAttribute('class', eClass);
    }
    if (eStyle) {
      element.setAttribute('style', eStyle);
    }
    if (eViewBox) {
      element.setAttributeNS(null, 'viewBox', eViewBox);
    }
    if (eUrl) {
      element.setAttribute('href', eUrl);
      element.setAttribute('rel', 'noopener');
    }
    if (eTarget) {
      element.setAttribute('target', eTarget);
    }
    if (ePath) {
      for (let i = 0; i < ePath.length; i++) {
        const newpath = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        newpath.setAttributeNS(null, 'd', ePath[i]);
        element.appendChild(newpath);
      }
    }
    return element;
  }

  bigPlus(actionButton) {
    const speedDialBox = document.querySelector('.speed-dial');
    speedDialBox.appendChild(
      this.createElement({
        eClass: 'speed-dial__button--root flex-center',
        eType: 'button',
        eStyle: `background-color: ${actionButton.color}`,
      })
    );

    speedDialBox.insertAdjacentElement(
      'beforeend',
      this.createElement({
        eClass: 'speed-dial__action',
        eType: 'div',
        eData: ['direction', this.direction],
      })
    );

    this.svgElement(actionButton);
  }

  topButtons() {
    const speedDialBox = document.querySelector('.speed-dial');
    speedDialBox.insertAdjacentElement(
      'afterend',
      this.createElement({
        eClass: 'speed-dial__top',
        eType: 'div',
        eData: ['position', this.position],
      })
    );

    const buttonTop = document.querySelector('.speed-dial__top');
    buttonTop.insertAdjacentElement(
      'beforeend',
      this.createElement({
        eClass: 'speed-dial__top-container',
        eType: 'div',
        eStyle: `background-color: ${this.buttonTopColor};`,
      })
    );

    const buttonTopContainer = document.querySelector(
      '.speed-dial__top-container'
    );
    buttonTopContainer.appendChild(
      this.createElement({
        eClass: 'icon__top',
        eType: 'svg',
        eViewBox: '0 0 24 24',
        ePath: ['M7.406 15.422L6 14.016l6-6 6 6-1.406 1.406L12 10.828z'],
      })
    );

    this.scrollToTop();

    window.addEventListener(
      'scroll',
      this.showScrollButton.bind(this),
      false
    );
    window.addEventListener(
      'load',
      this.showScrollButton.bind(this),
      false
    );
  }

  pathSVG(paths, viebox) {
    const svgElement = `width: 25px; height: 25px; background-repeat: no-repeat; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viebox}'`;
    let test = '';
    for (let i = 0; i < paths.length; i++) {
      test += `%3E%3Cpath d='${paths[i]}'%3E%3C/path`;
    }
    return `${svgElement + test}%3E%3C/svg%3E`;
  }

  smallIcons(icons) {
    const speedDialAction = document.querySelector('.speed-dial__action');
    const sortIcon = icons.sort((a, b) => a.id - b.id);
    this.stepTransition = this.steps * 3 + 50;

    for (let i = 0; i < sortIcon.length; i++) {
      const { name, viebox, url, path, target } = sortIcon[i];
      const speedDialItem = this.createElement({
        eClass: 'speed-dial__item flex-center',
        eType: 'div',
        eStyle: `transition-delay: ${this.stepTransition}ms;`,
      });

      const speedDialItemButton = this.createElement({
        eClass: 'speed-dial__button--small flex-center',
        eType: 'a',
        eUrl: url,
        eTarget: target,
      });

      const speedDialItemByttonDiv = this.createElement({
        eType: 'div',
        eStyle: this.pathSVG(path, viebox),
      });
      speedDialItemButton.appendChild(speedDialItemByttonDiv);
      speedDialItemByttonDiv.insertAdjacentHTML(
        'afterend',
        `<span style='${this.tooltipPosition(
          this.position,
          this.direction
        )}'>${name}</span>`
      );
      speedDialItem.appendChild(speedDialItemButton);
      speedDialAction.appendChild(speedDialItem);
      this.stepTransition -= this.steps;
    }
  }

  tooltipPosition(position, direction) {
    let style;
    switch (position) {
      case 'top-left':
        style =
          direction === 'bottom'
            ? `left: ${this.spanPosition}px`
            : `top: ${this.spanPosition}px`;
        break;
      case 'bottom-left':
        style =
          direction === 'top'
            ? `left: ${this.spanPosition}px`
            : `bottom: ${this.spanPosition}px`;
        break;
      case 'top-right':
        style =
          direction === 'bottom'
            ? `right: ${this.spanPosition}px`
            : `top: ${this.spanPosition}px`;
        break;
      case 'bottom-right':
        style =
          direction === 'top'
            ? `right: ${this.spanPosition}px`
            : `bottom: ${this.spanPosition}px`;
        break;
      default:
        break;
    }

    return style;
  }

  svgElement({ viebox, path }) {
    const speedDialRoot = document.querySelector('.speed-dial__button--root');
    speedDialRoot.appendChild(
      this.createElement({
        eClass: 'icon icon__plus',
        eType: 'svg',
        eViewBox: viebox,
        ePath: path,
      })
    );
  }

  showScrollButton() {
    const { scrollPosition } = this;
    const buttonTop = document.querySelector('.speed-dial__top');
    const scroll = window.pageYOffset;

    if (scroll > scrollPosition) {
      buttonTop.classList.add('show');
      buttonTop.previousSibling.setAttribute('style', 'bottom: 76px');
    } else {
      buttonTop.classList.remove('show');
      buttonTop.previousSibling.removeAttribute('style', 'bottom: 76px');
    }
  }

  scrollToTop() {
    const buttonTop = document.querySelector('.speed-dial__top');
    buttonTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

export default SpeedDial;
