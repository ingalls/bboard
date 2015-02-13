# bboard
HTML5 based Board Plugin

## About

bBoard is an HTML5 plugin that will generate and format a grid of flipping tiles.

## Installation

bBoard is pure ECMA5 & HTML5 and has no dependancies. Installation is as simple
as adding

```html
<script src="<path/to/plugin.js>"></script>
```

## Usage

bBoard works by dynamically inserting content into a given element.
The given element is simply a div with a unique id.

```
<div id="#boardContainer"></div>
```

The bBoard function is then called to generate the bBoard within the empty div.
This can be done using:

```html
<script>
bBoard({
    selector: "{{div id}}",
    bgcolour: "{{colour code}}",
    size: [{{row}},{{col}}],
    font: '{{font}}',
    content: [{
        front: {{settings}},
        back: {{settings}}
    }]
})
</script>
```

## Settings

### `selector` (required)

The div ID/Class or CSS selector of the element
`.container`, `#boardContainer`, '.content #firstBoard' are all valid examples.

### `size` (required)

The number of rows and columns in the grid. `[2,2]`, `[3,5]`, `[1,1]` are all valid examples.

### `bgcolour` (optional)

Background color of board when tiles are flipping. Defaults to white.
`white`, `#fff`, `#80BFFF` are all valid examples.

### `font` (optional)

Default font style for `text` in an element.
This setting can be overridden by setting another `font`
property for the specific element.

`font: 'color: blue;'`

### `content` (required)

An Array `[]` containing one HashMap `{}` for every grid element.
`content: [{ front: {}, back: {}]` would create a single grid element with nothing in it.
The number of grid elements in content __must__ equal the number of total elements `rows * cols`

#### `front` and `back` (required)

There are several possible settings that can be applied to the front and back.
They can be combined ie img & text, text & font, etc.

##### `img` or `icon` (optional)

Image to use as the background instead of a colour

`img: 'path/to/img.jpg'`

Icon to display in the centre of the element

`icon: 'path/to/icon.svg'`

##### `bgcolour` (optional)

Background to use on the specific element

`bgcolour: '#fff'`

##### `text` (optional)

`text: 'Awesome Element'`

##### `font` (optional)

Overrides the global font style. Specific to a single element.
CSS properties to apply to the `text` value of an element.

`font: 'color:white; font-family: 'Georgia, Serif';`
