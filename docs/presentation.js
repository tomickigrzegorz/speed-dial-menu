window.addEventListener('DOMContentLoaded', () => {
  // better presentation
  const template = `
  <h3>CHANGE DISPLAY POSITION</h3>
  <label class="radio">
    <input type="radio" name="type" value="1" checked>
    <span>bottom-right</span>
  </label>
  <label class="radio">
    <input type="radio" name="type" value="2">
    <span>bottom-left</span>
  </label>
  <label class="radio">
    <input type="radio" name="type" value="3">
    <span>top-right</span>
  </label>
  <label class="radio">
    <input type="radio" name="type" value="4">
    <span>top-left</span>
  </label>
`;

  const place = document.createElement('div');
  place.insertAdjacentHTML('beforeend', template);

  const control = document.getElementById('control');
  control.insertAdjacentElement('beforeend', place);

  const radioElements = document.querySelectorAll('[name="type"]');
  for (let i = 0; i < radioElements.length; i++) {
    radioElements[i].addEventListener('click', function () {
      const speedDial = document.querySelector('.speed-dial');
      const speedDialTop = document.querySelector('.speed-dial__top');

      speedDial.parentNode.removeChild(speedDial);
      speedDialTop ? speedDialTop.parentNode.removeChild(speedDialTop) : '';

      let newPosition;
      let newDairection;
      switch (this.value) {
        case '1':
          newPosition = 'bottom-right';
          newDairection = 'top';
          break;
        case '2':
          newPosition = 'bottom-left';
          newDairection = 'top';
          break;
        case '3':
          newPosition = 'top-right';
          newDairection = 'bottom';
          break;
        case '4':
          newPosition = 'top-left';
          newDairection = 'bottom';
        default:
          break;
      }

      new SpeedDial({
        icons: speedIcons,
        steps: 50,
        scroll: {
          position: 100,
          color: 'red',
        },
        data: {
          position: newPosition,
          direction: newDairection,
        },
      });
    });
  }
});