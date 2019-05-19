# Bang *!*

*!* (or Bang) is a baby preprocessor for JavaScript. Bang makes writing JS less tiring

`index.!`
```JavaScript
Min Max Abs (./Math)

x = false
y = true
x = true

if x {
  if y = true {
    xStr = 'x {x}'
    yStr = "y {y}"
    xAndY = `x&y {x && y}`

    log('Howdy!')
    warn('Partner.')
    error('{xStr}, {yStr}, {xAndY}')
  }
}

addNums(fst snd) {
  =fst + snd
}

fst snd = ['one' 'two']
counts = {one:1 two:2 three:3 'num four':4}

two three = counts
uno = counts[fst]
quad = counts.'num four'

addNums(uno quad)
```

(Which outputs `index.js`)
```JavaScript
import { Min, Max, Abs } from './Math';

let x = false;
let y = true;
x = true;

if (x) {
  if (y === true) {
    let xStr = `x ${x}`;
    let yStr = `y ${y}`;
    let xAndY = `x&y ${x && y}`;

    console.log(`Howdy!`);
    console.warn(`Partner.`);
    console.error(`${xStr}, ${yStr}, ${xAndY}`);
  }
}

function addNums(fst, snd) {
  return fst + snd;
}

let [fst, snd] = [`one`, `two`];
let counts = {one: 1, two: 2, three: 3, `num four`: 4};

let {two, three} = counts;
let uno = counts[fst];
let quad = counts[`num four`];

addNums(uno, quad);
```