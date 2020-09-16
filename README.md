# Simple Website Module

Trivial DOM factory written in pure JavaScript.

Since HTML imports are basically dead, and I loathe doing a lot of things by hand, here's a module to help with that.

## Additional files

`server.py` is used for testing.

## Usage

Copy the contents of `module` into whatever path you need.  Minify as needed.

* `swm/a.js` is the generic backend (does not use/require `b.js`);
* `swm/b.js` is the binary support (requires `a.js`).

`b.js` is still a work in progress and is not staged.

### Module Usage

`swm.js` exports a single class: `Builder`.  Creating an instance is simple:

```js
import { Builder } from "./module/swm.js";
let builder = new Builder(document);
```

The `document` argument is required to provide access to the DOM.  This is constructed in this way so as to enable a Proxy to be passed in for WebWorkers.  (Passing in a standard `Document` object is fine.)

Construction is invoked using the `build` method, which takes a destination (by tag name or DOM element), and either a `string`, `Array`, or `Object`.  Where a `string` is passed in, it is treated as a tag name (e.g. "div" will create a `div`).  Where an `Array` is passed in, it is iterated.  Where an `Object` is passed in it is treated as an object (per below).

#### Object

Objects require a `t` field with a string value.  This is the tag name.

Objects may optionally have a `c` field, which is an `Array` of children.  Each entry in the `c` `Array` is passed into the build function with the destination being set to the DOM element just created.

Objects may optionally have an `a` field, which is an `Object` of attributes.  This is just a key/value pairing, both of which must be strings.

## Licence

Apache 2.0
