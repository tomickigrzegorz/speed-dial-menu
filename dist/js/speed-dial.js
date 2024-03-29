var SpeedDial = function() {
    "use strict";
    const svgUse = (classname, symbol) => '<svg class="icon ' + classname + '"><use xlink:href="#' + symbol + '"></use></svg>';
    var defaultOptions = {
        sPos: 60,
        steps: 50,
        stepTrans: 100,
        modal: !1,
        position: null,
        showTopBtn: !0,
        visibility: !1,
        data: {
            position: "bottom-right",
            direction: "top"
        },
        bgColor: "#cacaca",
        topBtn: ".speed-dial__top"
    };
    return class {
        constructor(config) {
            this.initial = (options, speed, active, root) => {
                const {modal: modal, visibility: visibility} = options;
                speed.appendChild(((_ref2, root) => {
                    let {icons: icons, bgColor: bgColor} = _ref2;
                    const button = document.createElement("button");
                    button.className = root, button.style.fill = icons.iconBig.color || bgColor, button.setAttribute("aria-label", icons.iconBig.ariaLabel || "show social buttons");
                    const svgBig = svgUse("icon__plus", icons.iconBig.symbol);
                    return button.insertAdjacentHTML("beforeend", svgBig), button;
                })(options, root)), speed.appendChild((options => {
                    const {data: data, icons: icons, steps: steps} = options, container = document.createElement("div");
                    container.className = "speed-dial__action", container.setAttribute("data-direction", data.direction);
                    const elements = icons.iconsSmall, sortIcon = elements.sort(((a, b) => a.id - b.id));
                    let stepTrans = steps * sortIcon.length + 50;
                    return elements.map((element => {
                        const {symbol: symbol, className: className, ariaLabel: ariaLabel, target: target, url: url} = element, small = document.createElement("button");
                        let link;
                        small.classList.add("speed-dial__item", symbol), ariaLabel && (small.ariaLabel = ariaLabel), 
                        small.style = "transition-delay: " + stepTrans + "ms", link = url ? document.createElement("a") : document.createElement("div"), 
                        link.className = "speed-dial__button--small", className && link.classList.add(className), 
                        url && (link.href = url, link.rel = "noopener"), target && (link.target = target), 
                        container.appendChild(small);
                        const smallIcon = svgUse("icon__small", symbol);
                        if (link.insertAdjacentHTML("beforeend", smallIcon), element.tooltipText) {
                            const span = document.createElement("span");
                            span.textContent = element.tooltipText, span.style = ((position, direction, _ref) => {
                                let {sPos: sPos} = _ref;
                                const type = "left" === position.split("-")[1] ? "left" : "right";
                                let style;
                                return style = "top-left" === position || "top-right" === position ? "bottom" === direction ? type + ": " + sPos + "px" : "top: " + sPos + "px" : "top" === direction ? type + ": " + sPos + "px" : "bottom: " + sPos + "px", 
                                style;
                            })(data.position, data.direction, options), link.insertAdjacentElement("beforeend", span);
                        }
                        small.appendChild(link), stepTrans -= steps;
                    })), container;
                })(options)), options.showTopBtn && speed.insertAdjacentElement("afterend", this.buttonTop(options)), 
                modal && (speedDial => {
                    const modal = document.createElement("div");
                    modal.className = "speed-dial__modal", speedDial.insertAdjacentElement("afterend", modal);
                })(speed), visibility && (speed.classList.add(active), speed.addEventListener("click", (event => {
                    event.target.className === root && speed.classList.toggle(active);
                })));
            }, this.buttonTop = options => {
                const {data: data, icons: icons, bgColor: bgColor} = options, buttonTop = document.createElement("button");
                buttonTop.classList.add("speed-dial__top"), buttonTop.setAttribute("data-position", data.position), 
                buttonTop.ariaLabel = icons.iconTop.ariaLabel || "scroll to top";
                const divEl = document.createElement("div");
                divEl.className = this.top, divEl.style = "background-color:" + (icons.iconTop.color || bgColor) + ";";
                const topIcon = svgUse("icon__top", icons.iconTop.symbol);
                return divEl.insertAdjacentHTML("beforeend", topIcon), buttonTop.appendChild(divEl), 
                buttonTop.addEventListener("click", this.handleEvent), buttonTop;
            }, this.showScrollButton = () => {
                const {data: data, position: position, topBtn: topBtn} = this.options, buttonTop = document.querySelector(topBtn), scrollCheck = window.pageYOffset > position;
                "top-right" != data.position && "top-left" != data.position && (null == buttonTop || buttonTop.classList[scrollCheck ? "add" : "remove"]("speed-dial__show"), 
                this.speedDial.classList[scrollCheck ? "add" : "remove"]("margin-bottom"));
            }, this.handleEvent = event => {
                event.stopPropagation();
                event.target.className === this.top && window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, this.top = "speed-dial__top-container";
            const _options = {
                ...defaultOptions,
                ...config
            }, _speed = document.createElement("div");
            _speed.setAttribute("data-position", _options.data.position), _speed.className = "speed-dial", 
            document.body.insertAdjacentElement("beforeend", _speed), this.options = _options, 
            this.speedDial = _speed, this.initial(_options, _speed, "speed-dial__active", "speed-dial__button-root"), 
            _options.showTopBtn && _options.position && [ "scroll", "load" ].map((type => {
                window.addEventListener(type, this.showScrollButton);
            }));
        }
    };
}();
//# sourceMappingURL=speed-dial.js.map
