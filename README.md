## Speed dial menu css/js version
Speed dial menu in pure css or js. Simple construction.  
A working [EXAMPLE](https://tomik23.github.io/speed-dial-menu/index.html)

### Initialization
Before the first use, clone this repository and install node dependencies:

```yarn``` or ```npm install```

The dev code:

```yarn dev```

The final code:

```yarn build```

### Configuration menu css
The menu direction display setting can be changed by the corresponding "data-direction" setting.

Possible settings:
- data-direction="top"
- data-direction="bottom"
- data-direction="left"
- data-direction="right"

> Each icon has ```style="transition-delay: XXXms;"``` check in index.html.
This style sets the delay at which the icon should appear/hide.


![Screenshot1](https://github.com/tomik23/speed-dial-menu/blob/master/example.jpg)

## Javacript version [branch](https://github.com/tomik23/speed-dial-menu/tree/javascript-version)

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

key | valye | description
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

key | valye | description
---- | :-------: | -----------
`icons` | `String` | Used to show the tooltip on the hover event
`steps` | `Number` | Used to show individual icons with a delay
`data -> position` | `String` | Sets the main button for us in one of the four corners [bottom-right, bottom-left, top-right, top-left]
`data -> direction` | `String` | In which direction are the small icons to be displayed [top, bottom, left, right]