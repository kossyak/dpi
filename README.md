<img src="https://github.com/kossyak/dpi/assets/68551616/15202178-6e76-41a9-9963-68c270c126ad" width="100"/>

# Dynamic Pixel Icons
[dpi.lesta.dev](https://dpi.lesta.dev)

## Getting Started
```js
import dpi from './bundler/dpi.js'
/**
 * @param {(string)} icon code.
 * @param {(number)} [size=20]  icon size in pixels (optional param).
 * @return {string} svg code
 */
const svgCode = dpi('0010000100111110010000100', 16)
```

## Contribution
Please follow the instructions:

1. Open data.js file 
2. Make sure there is no entry with this code yet
3. Click "Edit this File"
4. Add a new entry at the end of the array
5. Click "Commit changes" → Commit directly to the main branch → "Commit changes"

```js
  // data.js
  ...
  {
      code: '0010000100111110010000100',
      keywords: 'plus, add, new'
  }
]
```
