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
    iconPlus: {
      name: 'plus',
      viebox: '0 0 20 20',
      path: [
        { 
          fill: 'red', // not required
          d: 'M0 3h20v2h-20v-2zM0 ...' 
        }
      ],
      color: '#1976d2', // not required
      ariaLabel: 'show social buttons' // not required
    },
    iconTop: {
      name: 'top',
      viebox: '0 0 24 24',
      path: [
        {
          fill: 'red', // not required
          d: 'M7.406 15.422L6 ...'
        }
      ],
      color: 'red', // not required
      ariaLabel: 'scroll to top' // not required
    },
    iconsSmall: [
      {
        id: 1,
        name: 'lightning',
        viebox: '0 0 32 32',
        url: 'https://url.com',
        target: '_blank',
        className: 'lightning', // not required
        ariaLabel: 'open lightning', // not required
        path: [
          { 
            fill: 'black', // not required
            d: 'M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32...' 
          },
          { 
            d: 'M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32...'
          },
        ]
      },
      {
        id: 2,
        name: 'wind',
        viebox: '0 0 32 32',
        className: 'wind', // not required
        ariaLabel: 'open wind ;)', // not required
        path: [
          { 
            d : 'M26.938 12c-1.656 0-3 1.344-3 3 0...'
          }
        ]
      }
    ]
  }
```

key | value | description
---- | ------- | -----------
id | number | This element is used to show the order of items with icons
name | string | The name that is used to show the tooltip on the hover event
viebox | string | Viewbox for svg
url | string | The Url specifies the link's destination, not required
target | string | _blank/_self/_parent/_top, not required
className | string | An additional class after which we can make events, not required
ariaLabel | string | An aria-label is added to button elements
path | array object | Path svg, can be an array of several paths, each track can also have a different color, just add fill: '#fff'
color | string | Color will be used for the main button or top button

## Sample configuration

```js
new SpeedDial({
  icons: speedIcons,
  // delay animation time for small buttons in ms 
  steps: 50,
  // show button 'scroll-top' at 100px - not required
  position: 100,
  // the option to enable the layer that covers the
  // page but is located under the speed-dial buttons
  modal: true,
  // small icons visible after clicking on the main
  // button it doesn't hide on mouse out
  visibility: true,
  // select the page corner you want is not required
  data: {
    // bottom-right, bottom-left, top-right, top-left
    position: 'bottom-right',
    // top, bottom, left, right
    direction: 'top'
  }
});
```

props | type | require | default | description
---- | ------- | :-----------: | ----------- | ---------------
icons | object | ✔ |  | Icons object. Show the tooltip on the hover event
steps | number |  | `50` | Show icons with a delay animation
position | number |  | `null`  | Show button 'scroll-top-top' at 100px
modal | boolean |   | `false`  | This option allows you to turn on the layer that is generated and inserted after the div with the speed-dial class. It appears when you hover over the large button. Color control and fade in and fade out possible in css
visibility | boolean |  | `false`  | Smaller icons visible by default
data/position | string |  | `bottom-right` | Sets the main button for us in one of the four corners [bottom-right, bottom-left, top-right, top-left]
data/direction | string | | `top` | In which direction are the small icons to be displayed [top, bottom, left, right]

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Vivaldi |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions