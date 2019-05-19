# *!*

*!* (or Bang) is a baby preprocessor for JavaScript. Bang makes writing JS less tiring

`index.!`
```JavaScript
// Banglang!

// Wraps in '{..}' and appends 'from' before the string.
import Min Max Abs './Math'

// Interprets all global assignments as 'let' under the hood.
x = false
y = true
x = true

// Assumes anything between an 'if' and its nearest '{' should be (wrapped).
if x {

  if y = true {

    // All 3-types of string literals are string templates.
    xStr = 'x {x}'
    yStr = "y {y}"
    xAndY = `x&y {x && y}`
    
    // Injects our variables into the template.
    console.log('{xStr}, {yStr}, {xAndY}')
    
  }

}

// A private function.
add(a b) {
  =a + b
}
```

(Which outputs `index.js`)
```JavaScript
import { Min, Max, Abs } from './Math'
let x = false
let y = true
x = true
if (x) { 
  if (y === true) { 
    let xStr = `x ${x}`
    let yStr = `y ${y}`
    let xAndY = `x&y ${x && y}`
    console.log(`${xStr}, ${yStr}, ${xAndY}`)
  } 
} 
function add(a,b) { 
  return a + b 
}
```