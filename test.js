// compile converts Bang code (e.g. main.!) into JavaScript.
function compile(bang) {

  let declared = {}

  // removes comments
  bang = bang.replace(/\/\/.*?\n/g, '')

  // fixed undeclared variables to have local scope
  bang = bang.replace(/[^\s]+?\s=/g, capture => {
    if (declared[capture]) return capture
    declared[capture] = true
    return `let ${capture}`
  })

  // wraps needed expressions with parens
  bang = bang.replace(/(if|while|for).+?{/g, capture => {
    // capture
    return capture
      .replace('if', 'if(')
      .replace('=', '===')
      .replace('while', 'while(')
      .replace('for', 'for(')
      .replace('{', '){')
  })

  // fixes all string template literals
  bang = bang.replace(/'.*?'|".*?"|`.*?`/g, capture => {
    // capture
    return capture.replace(/{(.+?)}/g, `\${\$1}`)
      .replace(/'/g, "`")
      .replace(/"/g, "`")
  })

  // fixes imports (not the best, but does the job)
  bang = bang.replace(/import(.+?)['"`](.*?)['"`]\n/g, `import {\$1} from '\$2'\n`)
  bang = bang.replace(/import\s*{.*?}/g, capture => {
    // capture
    return capture.replace(/[A-Za-z\$]+( [A-Za-z\$]+)*\s*}/g, capture => {
      return capture.replace(/ /g, ',').replace(/\s*,\s*}/g, '}')/*?*/
    })
  })

  // fixes function signatures
  bang = bang.replace(/[A-Za-z\$]+\s?\([A-Za-z\$]+( [A-Za-z\$]+)*\)\s?{/g, capture => {
    capture
    
    return `function ${capture.replace(/\([A-Za-z\$]+( [A-Za-z\$]+)*\)/g, capture => {
      return capture.replace(' ', ',')
    })}`
  })

  // replaces '=' statements without left sides with 'return'
  bang = bang.replace(/\n\s*=/g, '\nreturn ')
  
  // removes all empty lines
  bang = bang.replace(/\n\s*\n/g, '\n')

  // trims all indentation
  // bang = bang.replace(/\n\s*/g, '\n')
  
  bang
}

const bangSource = `
// Banglang!
// A simple spin-off of JavaScript inspired by other languages (Go, Prolog).

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
    xAndY = \`x&y {x && y}\`
    
    // Injects our variables into the template.
    console.log('{xStr}, {yStr}, {xAndY}')

  }

}

// A private function.
add(a b) {
  =a + b
}
`

compile(bangSource)
