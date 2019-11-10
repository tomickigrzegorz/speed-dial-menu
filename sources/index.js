import './scss/style.scss';

class SpeedDial {
  constructor(options) {
    const { icons, steps, data } = options;
    this.position = data.position;
    this.direction = data.direction;
    this.spanPosition = 60;
    this.steps = steps;
    this.stepTransition = 100;

    document.body.insertAdjacentElement(
      'beforeend',
      this.createElement({
        elClass: 'speed-dial',
        elType: 'div',
        elData: ['position', this.position],
      })
    );

    icons.forEach(element => {
      const { plusIcon, smallIcons } = element;
      this.bigPlus(plusIcon);
      this.smallIcons(smallIcons);
    });
  }

  createElement({ elClass, elType, elStyle, elData, elVieBox, elPath, elUrl }) {
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
      element.setAttribute('target', '_blank');
    }
    if (elPath) {
      const newpath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      newpath.setAttributeNS(null, 'd', elPath);
      element.appendChild(newpath);
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

  smallIcons(icons) {
    const speedDialAction = document.querySelector('.speed-dial__action');
    const sortIcon = icons.sort((a, b) => a.id - b.id);
    this.stepTransition = this.steps * 3 + 50;

    sortIcon.forEach(icon => {
      const { name, viebox, url, path } = icon;

      const speedDialItem = this.createElement({
        elClass: 'speed-dial__item flex-center',
        elType: 'div',
        elStyle: `transition-delay: ${this.stepTransition}ms;`,
      });

      const speedDialItemButton = this.createElement({
        elClass: 'speed-dial__button--small flex-center',
        elType: 'a',
        elUrl: url,
      });

      const speedDialItemByttonDiv = this.createElement({
        elType: 'div',
        elStyle: `width: 25px; height: 25px; background-repeat: no-repeat; background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viebox}'%3E%3Cpath d='${path}'/%3E%3C/svg%3E\");`,
      });
      speedDialItemButton.append(speedDialItemByttonDiv);
      speedDialItemByttonDiv.insertAdjacentHTML(
        'afterend',
        `<span style='${this.altPosition(
          this.position,
          this.direction
        )}'>${name}</span>`
      );
      speedDialItem.append(speedDialItemButton);
      speedDialAction.append(speedDialItem);
      this.stepTransition -= this.steps;
    });
  }

  altPosition(position, direction) {
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
}

export default SpeedDial;
