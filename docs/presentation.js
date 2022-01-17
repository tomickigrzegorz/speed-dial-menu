const githubConrner = `
<style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
<a href="https://github.com/tomik23/speed-dial-menu" class="github-corner" aria-label="View source on GitHub"><svg
  width="80" height="80" viewBox="0 0 250 250"
  style="fill:#FD6C6C; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
  <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
  <path
    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
    fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
  <path
    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
    fill="currentColor" class="octo-body"></path>
</svg></a>
`;

const config = [
  {
    id: 1,
    type: "label",
    input: "checkbox",
    title: "top left",
    position: "top-left",
    "data-tippy-content": "show top left",
    svg: "arrow-top-left",
    default: false,
    set: [1, 6, 8],
  },
  {
    id: 2,
    type: "label",
    input: "radio",
    title: "top",
    direction: "top",
    "data-tippy-content": "show top",
    svg: "arrow-top",
    default: true,
    set: [2, 7, 9],
  },
  {
    id: 3,
    type: "label",
    input: "checkbox",
    title: "top right",
    position: "top-right",
    "data-tippy-content": "show top right",
    svg: "arrow-top-right",
    default: false,
    set: [3, 4, 8],
  },
  {
    id: 4,
    type: "label",
    input: "radio",
    title: "left",
    direction: "left",
    "data-tippy-content": "show left",
    svg: "arrow-left",
    default: false,
    set: [4, 3, 9],
  },
  {
    id: 5,
    type: "div",
    title: "reset",
    position: "bottom-right",
    direction: "top",
    "data-tippy-content": "reset",
    set: [5, 4, 9],
  },
  {
    id: 6,
    type: "label",
    input: "radio",
    title: "right",
    direction: "right",
    "data-tippy-content": "show right",
    svg: "arrow-right",
    default: false,
    set: [6, 1, 7],
  },
  {
    id: 7,
    type: "label",
    input: "checkbox",
    title: "bottom left",
    position: "bottom-left",
    "data-tippy-content": "show bottom left",
    svg: "arrow-bottom-left",
    default: false,
    set: [7, 2, 6],
  },
  {
    id: 8,
    type: "label",
    title: "bottom",
    input: "radio",
    direction: "bottom",
    "data-tippy-content": "show bottom",
    svg: "arrow-bottom",
    default: false,
    set: [8, 1, 3],
  },
  {
    id: 9,
    type: "label",
    input: "checkbox",
    title: "bottom right",
    position: "bottom-right",
    "data-tippy-content": "show bottom right",
    svg: "arrow-bottom-right",
    default: true,
    set: [9, 2, 4],
  },
];

window.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("beforeend", githubConrner);

  const h1 = document.createElement("h1");
  h1.textContent = "change display position and direction";

  const centerPlace = document.createElement("div");
  centerPlace.classList.add("center-place");

  const control = document.getElementById("control");
  control.insertAdjacentElement("beforeend", centerPlace);

  control.insertAdjacentElement("beforebegin", h1);

  function createElement(item) {
    const type = item.type === "label" ? true : false;

    const el = document.createElement(type ? "label" : "div");
    el.setAttribute("data-id", item.id);

    if (item.position) {
      el.setAttribute("data-position", item.position);
    } else {
      el.setAttribute("data-direction", item.direction);
    }

    el.classList.add(type ? "form-control" : "reset");
    el.title = item.title;
    el.setAttribute("data-tippy-content", item["data-tippy-content"]);

    if (type) {
      let checkedCheck;
      if (item.id === 2 || item.id === 4 || item.id === 9) {
        el.classList.add("active");
      } else if (item.input === "radio") {
        el.classList.add("disabled");
      }

      const typeCheckOrRadio = item.input === "radio" ? "radio" : "checkbox";

      el.innerHTML = `<input type="${typeCheckOrRadio}" name="type" value="${item.id}"><svg><use xlink:href="#${item.svg}"></use></svg>`;

      if (item.id === 2 || item.id === 9) {
        el.firstElementChild.checked = true;
      }
    } else {
      el.textContent = "reset";
    }
    centerPlace.insertAdjacentElement("beforeend", el);
  }

  config.forEach((item, index) => {
    createElement(item);
  });

  document.addEventListener("click", (e) => {
    let newPosition;
    let newDairection;

    const target = e.target;

    if (target.classList.contains("reset")) {
      window.location.reload(true);
    }

    if (
      !target.closest("label") ||
      target.closest("label").classList.contains("disabled")
    )
      return;

    e.preventDefault();

    if (target.firstElementChild.type === "checkbox") {
      target.firstElementChild.checked = true;
      if (target.classList.contains("active")) return;
    }

    const radios = Array.from(
      document.querySelectorAll("input[type=checkbox]")
    );
    radios.forEach((item) => {
      if (item.checked) {
        newDairection = target.dataset.direction;
      }
    });

    if (target.firstElementChild.type === "radio") {
      const radios = Array.from(
        document.querySelectorAll("input[type=checkbox]")
      );
      radios.map((item) => {
        if (item.checked) {
          newPosition = item.parentElement.dataset.position;
        }
      });
      target.firstElementChild.checked = true;

      runSpeedDial(newPosition, newDairection);
      return;
    }

    Array.from(document.querySelectorAll(".active")).forEach((el) => {
      el.classList.remove("active");
      el.classList.remove("disabled");
      el.firstElementChild.checked = false;
    });

    newPosition = target.dataset.position;
    newDairection = target.dataset.direction;

    config.forEach((item) => {
      if (item.id === Number(target.dataset.id)) {
        item.set.forEach((label, index) => {
          const el = document.querySelector(`[data-id="${label}"]`);
          el.classList.add("active");
          el.classList.remove("disabled");

          // console.log(index, label);
          if (newPosition === "bottom-right" || newPosition === "bottom-left") {
            if (index === 1) {
              newPosition = target.dataset.position;
              newDairection = el.dataset.direction;
              el.firstElementChild.checked = true;
            }
          } else {
            if (index === 2) {
              newPosition = target.dataset.position;
              newDairection = el.dataset.direction;
              el.firstElementChild.checked = true;
            }
          }
        });
      }
    });

    Array.from(document.querySelectorAll("input[type=radio]")).forEach((el) => {
      if (!el.parentNode.classList.contains("active")) {
        el.parentNode.classList.add("disabled");
      }
    });

    runSpeedDial(newPosition, newDairection);

    function runSpeedDial(position, direction) {
      const speedDialTop = document.querySelector(".speed-dial__top");
      speedDialTop?.parentElement.removeChild(speedDialTop);

      const btn =
        position === "bottom-right" || position === "bottom-left"
          ? true
          : false;

      const speedDial = document.querySelector(".speed-dial");
      speedDial.parentElement.removeChild(speedDial);

      new SpeedDial({
        icons: speedIcons,
        steps: 50,
        position: 100,
        modal: true,
        visibility: true,
        showTopBtn: btn,
        data: {
          position,
          direction,
        },
      });
    }
  });

  tippy("[data-tippy-content]");
});
