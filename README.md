<h1 align=center>Speed dial menu</h1>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/tomik23/speed-dial-menu">
  <img src="https://img.shields.io/github/size/tomik23/speed-dial-menu/docs/speedDial.min.js">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green.svg">
  </a>
</p>

<p align=center>Speed dial menu, simple construction. You can set a button in every corner of the page and display smaller buttons in each direction. It is also possible to activate the 'scroll up' button</p>

<p align=center>
  <img src="./example.png">
</p>

## Demo

See the demo - [example](https://tomik23.github.io/speed-dial-menu/)


> A clean css version with no dependencies is also available -> [speed-dial-css](https://github.com/tomik23/speed-dial-menu/tree/speed-dial-css)



## Clone the repo and install dependencies
```bash
git clone 
cd speed-dial-menu
```
```js
yarn
// or
npm i
```

## How to run
Dev
```js
yarn dev
// or
npm run dev
```
Prod
```js
yarn prod
// or
npm run prod
```

## Configuration json

```js
const speedIcons = {
    plusIcon: {
      name: 'plus',
      viebox: '0 0 24 24',
      path: [
        'M5 13h6v6c0 0.552 0.448...'
      ],
      color: '#1976d2'
    },
    smallIcons: [
      {
        id: 1,
        name: 'lightning',
        viebox: '0 0 32 32',
        url: 'https://url.com',
        target: '_blank',
        path: [
          'M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32...',
          'M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32...',
        ]
      },
      {
        id: 2,
        name: 'wind',
        viebox: '0 0 32 32',
        url: 'https://url.com',
        target: '_blank',
        path: [
          'M26.938 12c-1.656 0-3 1.344-3 3 0...'
        ]
      }
    ]
  }
```

key | value | description
---- | ------- | -----------
id | number | This element is used to show the order of items with icons
name | string | The name that is used to show the tooltip on the hover event
viebox | string | Viewbox svg
url | string | The Url specifies the link's destination
target | string | _blank/_self/_parent/_top
path | array | Path svg
color | string | Color will be used for the main button

## Sample configuration

```js
new SpeedDial({
  icons: speedIcons,
  steps: 50,
  scroll: { // object not required, button scroll to top
    position: 100, // show the button after how many pixels after scrolling
    color: '#333' // button color
  },
  data: {
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    direction: 'top' // top, bottom, left, right
  }
});
```

props | type | require | default | description
---- | ------- | :-----------: | ----------- | ---------------
icons | object | ✔ |  | Icons object. Show the tooltip on the hover event
data/position | string | ✔ |  | Sets the main button for us in one of the four corners [bottom-right, bottom-left, top-right, top-left]
data/direction | string | ✔ |  | In which direction are the small icons to be displayed [top, bottom, left, right]
steps | number |  | `50` | Show icons with a delay
scroll/position | number |  | `100`  | Scroll object is responsible for adding an additional button, clicking it scrolls the page to the top.<br />`position` - responsible for the appearance of the button after moving by a given number of pixels.
scroll/color | string |  | `#333` | `color` - responsible for the background color of this button.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Vivaldi |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions