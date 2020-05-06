# Speed dial menu
Speed dial menu, simple construction. You can set a button in every corner of the page and display smaller buttons in each direction - [see section](https://github.com/tomik23/speed-dial-menu#sample-configuration). A working [EXAMPLE](https://tomik23.github.io/speed-dial-menu/)

![Screenshot1](https://github.com/tomik23/speed-dial-menu/blob/master/example.jpg)

> A clean css version with no dependencies is also available -> [speed-dial-css](https://github.com/tomik23/speed-dial-menu/tree/speed-dial-css)


## Clone the repo and install dependencies
```bash
git clone 
cd node-sharp-images
```
```
yarn
or
npm i
```

## How to run
Dev
```
yarn dev
or
npm run dev
```
Prod
```
yarn prod
or
npm run prod
```

## Configuration json

```js
const speedIcons = [
      {
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
              'M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32...'
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
      },
    ]
```

key | value | description
---- | :-------: | -----------
`id` | `Number` | This element is used to show the order of items with icons
`name` | `String` | The name that is used to show the tooltip on the hover event
`viebox` | `String` | Viewbox svg
`url` | `String` | The Url specifies the link's destination
`target` | `String` | _blank/_self/_parent/_top
`path` | `Array` | Path svg
`color` | `String` | Color will be used for the main button

## Sample configuration

```js
const config = {
  icons: speedIcons,
  steps: 50,
   data: {
     position: 'bottom-right',
    direction: 'top',
  }
}

new SpeedDial(config);
```

props | value | description
---- | :-------: | -----------
`icons` | `String` | Show the tooltip on the hover event
`steps` | `Number` | Show icons with a delay
`data/position` | `String` | Sets the main button for us in one of the four corners [bottom-right, bottom-left, top-right, top-left]
`data/direction` | `String` | In which direction are the small icons to be displayed [top, bottom, left, right]

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/vivaldi/vivaldi_48x48.png" alt="Vivaldi" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Vivaldi |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions