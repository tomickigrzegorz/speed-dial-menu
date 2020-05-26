import './scss/style.scss';

class SpeedDial {
  constructor(options) {
    const {
      icons,
      scroll,
      steps,
      data
    } = options;

    this.position = data.position;
    this.direction = data.direction;
    this.spanPosition = 60;
    this.steps = steps || 50;
    this.scroll = scroll;
    this.stepTransition = 100;
    document.body.insertAdjacentElement(
      'beforeend',
      this.createElement({
        elClass: 'speed-dial',
        elType: 'div',
        elData: ['position', this.position],
      })
    );

    this.bigPlus(icons.plusIcon);
    this.smallIcons(icons.smallIcons);

    if (typeof scroll !== 'undefined') {
      this.buttonTopColor = typeof scroll.color !== 'undefined' ? scroll.color : "#333";
      this.scrollPosition = typeof scroll.position !== 'undefined' ? scroll.position : 100;
      if (this.position === 'bottom-left' || this.position === 'bottom-right') {
        this.topButton();
      }
    }
  }

  createElement({
    elType,
    elData,
    elClass,
    elStyle,
    elVieBox,
    elUrl,
    elTarget,
    elPath,
  }) {
    const element =
      elType === 'svg'
        ? document.createElementNS('http://www.w3.org/2000/svg', elType)
        : document.createElement(elType);

    if (elData) {
      const [data, value] = elData;
      element.setAttribute(`data-${data}`, value);
    }
    if (elClass) {
      element.setAttribute('class', elClass);
    }
    if (elStyle) {
      element.setAttribute('style', elStyle);
    }
    if (elVieBox) {
      element.setAttributeNS(null, 'viebox', elVieBox);
    }
    if (elUrl) {
      element.setAttribute('href', elUrl);
      element.setAttribute('rel', 'noopener');
    }
    if (elTarget) {
      element.setAttribute('target', elTarget);
    }
    if (elPath) {
      elPath.forEach((elpath) => {
        const newpath = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        newpath.setAttributeNS(null, 'd', elpath);
        element.appendChild(newpath);
      });
    }
    return element;
  }

  bigPlus(actionButton) {
    const speedDialBox = document.querySelector('.speed-dial');
    speedDialBox.appendChild(
      this.createElement({
        elClass: 'speed-dial__button--root flex-center',
        elType: 'button',
        elStyle: `background-color: ${actionButton.color}`,
      })
    );

    speedDialBox.insertAdjacentElement(
      'beforeend',
      this.createElement({
        elClass: 'speed-dial__action',
        elType: 'div',
        elData: ['direction', this.direction],
      })
    );

    this.svgElement(actionButton);
  }

  topButton() {
    const speedDialBox = document.querySelector('.speed-dial');
    speedDialBox.insertAdjacentElement(
      'afterend',
      this.createElement({
        elClass: 'speed-dial__top',
        elType: 'div',
        elData: ['position', this.position]
      })
    );

    const buttonTop = document.querySelector('.speed-dial__top');
    buttonTop.insertAdjacentElement(
      'beforeend',
      this.createElement({
        elClass: 'speed-dial__top-container',
        elType: 'div',
        elStyle: `background-color: ${this.buttonTopColor};`,
      })
    );

    const buttonTopContainer = document.querySelector('.speed-dial__top-container');
    buttonTopContainer.appendChild(
      this.createElement({
        elClass: 'icon__top',
        elType: 'svg',
        elVieBox: '0 0 24 24',
        elPath: ['M7.406 15.422L6 14.016l6-6 6 6-1.406 1.406L12 10.828z'],
      })
    );

    this.scrollToTop();

    window.addEventListener("scroll", this.showScrollButton.bind(this.scrollPosition), false);
    window.addEventListener("load", this.showScrollButton.bind(this.scrollPosition), false);
  }

  pathSVG(paths, viebox) {
    const svgElement = `width: 25px; height: 25px; background-repeat: no-repeat; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viebox}'`;
    let test = '';
    paths.forEach((path) => {
      test += `%3E%3Cpath d='${path}'%3E%3C/path`;
    });
    return `${svgElement + test}%3E%3C/svg%3E`;
  }

  smallIcons(icons) {
    const speedDialAction = document.querySelector('.speed-dial__action');
    const sortIcon = icons.sort((a, b) => a.id - b.id);
    this.stepTransition = this.steps * 3 + 50;

    sortIcon.forEach(({ name, viebox, url, path, target }) => {
      const speedDialItem = this.createElement({
        elClass: 'speed-dial__item flex-center',
        elType: 'div',
        elStyle: `transition-delay: ${this.stepTransition}ms;`,
      });

      const speedDialItemButton = this.createElement({
        elClass: 'speed-dial__button--small flex-center',
        elType: 'a',
        elUrl: url,
        elTarget: target,
      });

      const speedDialItemByttonDiv = this.createElement({
        elType: 'div',
        elStyle: this.pathSVG(path, viebox),
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
    });
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
      case 'bottom-left':
        style =
          direction === 'top'
            ? `left: ${this.spanPosition}px`
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
        elClass: 'icon icon__plus',
        elType: 'svg',
        elVieBox: viebox,
        elPath: path,
      })
    );
  }

  showScrollButton() {
    const scrollPosition = this;
    const buttonTop = document.querySelector('.speed-dial__top');
    let scroll = window.pageYOffset;

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
    buttonTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({
        'top': 0,
        'behavior': 'smooth',
      });
    });
  }
}

export default SpeedDial;
