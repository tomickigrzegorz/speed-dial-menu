import { createModal, svgUse, buttonBig, buttonsSmall } from "./util/functoins";
import defaultOptions from "./util/defaults";

export default class SpeedDial {
  /**
   * constructor
   * @param {Object} config
   */
  constructor(config) {
    this.top = "speed-dial__top-container";

    const options = { ...defaultOptions, ...config };
    const root = "speed-dial__button-root";
    const active = "speed-dial__active";

    const speed = document.createElement("div");
    speed.setAttribute("data-position", options.data.position);
    speed.className = "speed-dial";

    document.body.insertAdjacentElement("beforeend", speed);

    this.options = options;
    this.speedDial = speed;

    this.initial(options, speed, active, root);

    if (!options.showTopBtn) return;
    if (options.position) {
      ["scroll", "load"].map((type) => {
        window.addEventListener(type, this.showScrollButton);
      });
    }
  }

  /**
   * Initialize speed dial
   * @param {Object} options
   * @param {HTMLElement} speed
   * @param {String} active
   * @param {String} root
   */
  initial = (options, speed, active, root) => {
    const { modal, visibility } = options;
    speed.appendChild(buttonBig(options, root));
    speed.appendChild(buttonsSmall(options));

    if (options.showTopBtn) {
      speed.insertAdjacentElement("afterend", this.buttonTop(options));
    }

    if (modal) {
      createModal(speed);
    }

    if (visibility) {
      speed.classList.add(active);

      speed.addEventListener("click", (event) => {
        if (event.target.className !== root) return;
        speed.classList.toggle(active);
      });
    }
  };

  /**
   * Create button to scroll to top
   *
   * @param {Object} options
   * @returns HTMLElement
   */
  buttonTop = (options) => {
    const { data, icons, bgColor } = options;
    const buttonTop = document.createElement("button");
    buttonTop.classList.add("speed-dial__top");
    buttonTop.setAttribute("data-position", data.position);
    buttonTop.ariaLabel = icons.iconTop.ariaLabel || "scroll to top";

    const divEl = document.createElement("div");
    divEl.className = this.top;
    divEl.style = `background-color:${icons.iconTop.color || bgColor};`;

    const topIcon = svgUse("icon__top", icons.iconTop.symbol);
    divEl.insertAdjacentHTML("beforeend", topIcon);

    buttonTop.appendChild(divEl);

    buttonTop.addEventListener("click", this.handleEvent);

    return buttonTop;
  };

  /**
   * Show button to scroll to top
   */
  showScrollButton = () => {
    const { data, position, topBtn } = this.options;
    const buttonTop = document.querySelector(topBtn);
    const scrollCheck = window.pageYOffset > position ? true : false;

    if (data.position == "top-right" || data.position == "top-left") return;
    buttonTop?.classList[scrollCheck ? "add" : "remove"]("speed-dial__show");
    this.speedDial.classList[scrollCheck ? "add" : "remove"]("margin-bottom");
  };

  /**
   * Event handler
   * @param {Event} event
   */
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
