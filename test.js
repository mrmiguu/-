// compile converts Bang code (e.g. main.!) into JavaScript.
function compile(bang) {

  // removes comments
  bang = bang.replace(/\/\/.*?\n/g, '')

  // wraps needed expressions with parens
  bang = bang.replace(/(if|while|for).+?{/g, capture => {
    return capture
      .replace('if', 'if(')
      .replace('=', '===')
      .replace('while', 'while(')
      .replace('for', 'for(')
      .replace('{', '){')
  })

  // fixes function signatures
  bang = bang.replace(/[A-Za-z\$]+\s?\([A-Za-z\$]+( [A-Za-z\$]+)*\)\s?{/g, capture => {
    capture
    capture = capture.replace(/\([A-Za-z\$]+( [A-Za-z\$]+)*\)/g, capture => {
      return capture.replace(' ', ',')
    })
    capture
    capture = `function ${capture}`
    capture
    
    return capture
  })

  // replaces ':=' statements without left sides with 'return'
  bang = bang.replace(/\n\s*:=/g, '\nreturn ')

  // fixed variables
  bang = bang.replace(/(^|\n)\s*[\[{]?\s*[A-Za-z\$]+?(\s*[A-Za-z\$]+?)*\s*[\]}]?\s*:?=/g, capture => {

    capture = capture
      .replace(/([^:]+):/g, 'let \$1')
      .replace(/\n/g, '')

    return `\n${capture}`
  })

  bang = bang.replace(/\([A-Za-z\$]+?(\s[A-Za-z\$]+?)+\)/g, capture => {
    return capture.replace(/\s/g, ',')
  })

  // fix all array literals
  // REFACTOR: prone to error; redesign.
  // REFACTOR: prone to error; redesign.
  // REFACTOR: prone to error; redesign.
  bang = bang.replace(/\[\s*(`.*?`|".*?"|'.*?'|[A-Za-z\$]+)(\s+(`.*?`|".*?"|'.*?'|[A-Za-z\$]+))*\s*\]/g, capture => {

    capture
    capture = capture.replace(/(\[|\s+)(`.*?`|".*?"|'.*?'|[A-Za-z\$]+)(\s+|\])/g, ',$2,')
    capture
    capture = capture.replace(']', '').replace('[', '')
    capture
    capture = capture.replace(/^,(.*?),?$/g, '[$1]')
    capture

    return capture
  })

  bang = bang.replace(/{\s*[A-Za-z\$]+(\s+[A-Za-z\$]+)*\s*}/g, capture => {
    capture
    capture = capture.replace(/([A-Za-z\$]+)\s+/g, '$1,')
    capture
    capture = capture.replace(',}', '}')
    capture
    return capture
  })

  bang = bang.replace(/{\s*([A-Za-z\$]+|'[^']*'|"[^"]*"|`[^`]*`):.+?\s*}/g, capture => {
    // capture
    capture = capture.replace(/:(.*?)\s+/g, ':$1,')
    // capture
    return capture
  })
  
  // fixes all string template literals
  bang = bang.replace(/'.*?{.*?}.*?'|".*?{.*?}.*?"|`.*?{.*?}.*?`/g, capture => {
    // capture
    return capture.replace(/{(.+?)}/g, `\${\$1}`)
      .replace(/'/g, "`")
      .replace(/"/g, "`")
  })

  // fixes imports
  bang = bang.replace(/(^|\n)\s*[A-Za-z\$]+?(\s[A-Za-z\$]+)*?\s+\(.+?\)\n/g, capture => {
    capture = capture
      .replace(/[A-Za-z\$]+?(\s[A-Za-z\$]+)*?\s+\(/g, capture => {
        return capture.replace(/\s/g, ',')
      })
      .replace(/,\(/g, `} from '`)
      .replace(/\)/g, `'`)
      .replace(/\n/g, '')
    return `import {${capture}\n`
  })

  bang = bang
    .replace(/(^|\n)\s*log\s*\(/g, '\nconsole.log(')
    .replace(/(^|\n)\s*warn\s*\(/g, '\nconsole.warn(')
    .replace(/(^|\n)\s*error\s*\(/g, '\nconsole.error(')

  // removes all empty lines
  bang = bang.replace(/\n\s*\n/g, '\n')

  // trims all indentation
  // bang = bang.replace(/\n\s*/g, '\n')

  return bang
}

const bangSource = `
// Banglang!
// A simple spin-off of JavaScript inspired by other languages (Go, Prolog).

Min Max Abs (./Math)

// Interprets all global assignments as 'let' under the hood.
x := false
y := true
x = true

// Assumes anything between an 'if' and its nearest '{' should be (wrapped).
if x {

  if y = true {

    // All 3-types of string literals are string templates.
    xStr := 'x {x}'
    yStr := "y {y}"
    xAndY := \`x&y {x && y}\`
    
    // Injects our variables into the template.
    log('Howdy!')
    warn('Partner.')
    error('{xStr}, {yStr}, {xAndY}')

  }

}

// A private function.
addNums(fst snd) {
  := fst + snd
}

dos := "two"
[fst snd] := ['one' dos \`number three\`]
counts := {one:1 two:2 three:3 'num four':4 "egg":x}

{two three } := counts
uno := counts[fst]
quad := counts['num four']

addNums(uno quad)
`

console.log(compile(bangSource))
