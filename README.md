# JustMakeItBig.js

A quick and dirty layer for HTML5 Fullscreen API, with fallback for browsers that don't support it

## Authorship

Written by [Geoffrey Roberts](mailto:g.roberts@blackicemedia.com)

Faux fullscreen fallback inspired by, but not a direct implementation of, the fullscreen handling in [OpenSeadragon](https://openseadragon.github.io/).

## License

MIT

## Requirements

* jQuery

## Installation

In the `<head>` of your page, after you set up your jQuery `<script>` item, add the following:

```html
<script type="text/javascript" src="justmakeitbig.js"></script>
```

## Usage

### JustMakeItBig.canFullscreen

Takes no parameters.

Returns `TRUE` if it supports either HTML5 fullscreen API or fallback, `FALSE` otherwise.

### JustMakeItBig.isFullscreen

Takes no parameters.

Returns `TRUE` if it is in either native or fallback fullscreen, `FALSE` otherwise.

### JustMakeItBig.toggle

Takes two parameters:

* `elem` - the element to display fullscreen
* `toggleElem` - the element we clicked to toggle fullscreen display

Returns nothing.

## Changelog

### v0.1.4

Fix some API inconsistencies

### v0.1.3

Expose JustMakeItBig.isFullscreen

### v0.1.2

Wrap in jQuery initialiser

### v0.1.1

Fixed fallback bug

### v0.1

Initial release