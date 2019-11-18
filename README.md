## Speed dial menu
Speed dial menu, simple construction. You can set a button in every corner of the page and display smaller buttons in each direction. A working [EXAMPLE](https://tomik23.github.io/speed-dial-menu/)

![Screenshot1](https://github.com/tomik23/speed-dial-menu/blob/master/example.jpg)


### Clone the repo and install dependencies
```bash
git clone 
cd node-sharp-images
yarn
or
npm i

```

### How to run
Dev
```
npm run dev
or
yarn dev
```
Prod
```
npm run prod
or
yarn prod
```

### Configuration json

```js
const speedIcons = [
      {
        plusIcon: {
          name: 'plus',
          viebox: '0 0 24 24',
          path: 'M5 13h6v6c0 0.552 0.448...',
          color: '#1976d2'
        },
        smallIcons: [
          {
            id: 1,
            name: 'lightning',
            viebox: '0 0 32 32',
            url: 'https://url.com',
            path: 'M12 24l2 2-2 6 6-6-2-2 2-4-6 4zM32...'
          },
          {
            id: 2,
            name: 'wind',
            viebox: '0 0 32 32',
            url: 'https://url.com',
            path: 'M26.938 12c-1.656 0-3 1.344-3 3 0...'
          }
        ]
      },
    ]
```

key | value | description
---- | :-------: | -----------
`name` | `String` | The name that is used to show the tooltip on the hover event
`viebox` | `String` | Viewbox svg
`path` | `String` | Path svg
`color` | `String` | Color will be used for the main button
`id` | `Number` | This element is used to show the order of items with icons

### Sample configuration

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