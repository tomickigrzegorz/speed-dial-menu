import defaultOptions from "./util/defaults";

class SpeedDial {
  constructor(options) {
    this.options = { ...defaultOptions, ...options };

    this.active = "speed-dial__active";
    this.root = "speed-dial__button-root";
    this.top = "speed-dial__top-container";

    this.speedDial = document.createElement("div");
    this.speedDial.setAttribute("data-position", this.options.data.position);
    this.speedDial.className = "speed-dial";

    document.body.insertAdjacentElement("beforeend", this.speedDial);

    if (this.options.position) {
      window.addEventListener("scroll", this.showScrollButton);
      window.addEventListener("load", this.showScrollButton);
      document.addEventListener("click", this.handleEvent, false);
    }

    this.initial();
  }

  initial = () => {
    this.speedDial.appendChild(this.buttonBig());
    this.speedDial.appendChild(this.buttonsSmall());
    this.speedDial.insertAdjacentElement("afterend", this.buttonTop());

    if (this.options.modal) {
      this.modal();
    }

    if (this.options.visibility) {
      this.speedDial.classList.add(this.active);

      this.speedDial.addEventListener("click", (event) => {
        if (event.target.className !== this.root) return;
        this.speedDial.classList.toggle(this.active);
      });
    }
  };

  svgUse = (classname, symbol) => {
    return `<svg class="icon ${classname}"><use xlink:href="#${symbol}"></use></svg>`;
  };

  buttonBig = () => {
    const { icons, bgColor } = this.options;
    const button = document.createElement("button");
    button.className = this.root;
    button.style.fill = icons.iconBig.color || bgColor;
    button.setAttribute(
      "aria-label",
      icons.iconBig.ariaLabel || "show social buttons"
    );

    const svgBig = this.svgUse("icon__plus", icons.iconBig.symbol);
    button.insertAdjacentHTML("beforeend", svgBig);

    return button;
  };

  buttonsSmall = () => {
    const { data, icons, steps } = this.options;

    const container = document.createElement("div");
    container.className = "speed-dial__action";
    container.setAttribute("data-direction", data.direction);

    const elements = icons.iconsSmall;
    const sortIcon = elements.sort((a, b) => a.id - b.id);
    let stepTrans = steps * sortIcon.length + 50;

    elements.map((element) => {
      const { symbol, className, ariaLabel, target, url } = element;
      const small = document.createElement("button");
      small.classList.add("speed-dial__item", symbol);
      if (ariaLabel) {
        small.setAttribute("aria-label", ariaLabel);
      }
      small.setAttribute("style", `transition-delay: ${stepTrans}ms`);

      let link;
      if (url) {
        link = document.createElement("a");
      } else {
        link = document.createElement("div");
      }

      link.className = "speed-dial__button--small";
      if (className) {
        link.classList.add(className);
      }

      if (url) {
        link.href = url;
        link.rel = "noopener";
      }
      if (target) {
        link.target = target;
      }

      container.appendChild(small);

      const smallIcon = this.svgUse("icon__small", symbol);
      link.insertAdjacentHTML("beforeend", smallIcon);

      if (element.tooltipText) {
        const span = document.createElement("span");
        span.textContent = element.tooltipText;
        span.setAttribute(
          "style",
          this.tipPosition(data.position, data.direction)
        );

        link.insertAdjacentElement("beforeend", span);
      }

      small.appendChild(link);

      stepTrans -= this.options.steps;
    });

    return container;
  };

  buttonTop = () => {
    const { data, icons, bgColor } = this.options;
    const buttonTop = document.createElement("button");
    buttonTop.classList.add("speed-dial__top");
    buttonTop.setAttribute("data-position", data.position);
    buttonTop.setAttribute(
      "aria-label",
      icons.iconTop.ariaLabel || "scroll to top"
    );

    const divEl = document.createElement("div");
    divEl.className = this.top;
    divEl.setAttribute(
      "style",
      `background-color:${icons.iconTop.color || bgColor};`
    );

    const topIcon = this.svgUse("icon__top", icons.iconTop.symbol);
    divEl.insertAdjacentHTML("beforeend", topIcon);

    buttonTop.appendChild(divEl);

    return buttonTop;
  };

  modal = () => {
    const modal = document.createElement("div");
    modal.className = "speed-dial__modal";
    this.speedDial.insertAdjacentElement("afterend", modal);
  };

  tipPosition = (position, direction) => {
    const pos = this.options.sPos;
    const type = position.split("-")[1] === "left" ? "left" : "right";

    let style;
    if (position === "top-left" || position === "top-right") {
      style = direction === "bottom" ? `${type}: ${pos}px` : `top: ${pos}px`;
    } else {
      style = direction === "top" ? `${type}: ${pos}px` : `bottom: ${pos}px`;
    }

    return style;
  };

  showScrollButton = () => {
    const { position, topBtn } = this.options;
    const buttonTop = document.querySelector(topBtn);
    const scrollCheck = window.pageYOffset > position ? true : false;

    buttonTop.classList[scrollCheck ? "add" : "remove"]("speed-dial__show");
    this.speedDial.classList[scrollCheck ? "add" : "remove"]("margin-bottom");
  };

  handleEvent = (event) => {
    event.stopPropagation();
    const button = event.target;
    if (button.className !== this.top) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
}

export default SpeedDial;
