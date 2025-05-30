function parseGrammarFromText(grammarText) {
  const lines = grammarText.split("\n").map(l => l.trim()).filter(Boolean)

  const variables = new Set()
  const terminales = new Set()
  const producciones = []

  for (const line of lines) {
    const [left, right] = splitLine(line)
    const variable = left.trim()
    variables.add(variable)
    
    const rightSides = right.split("|").map(p => p.trim())

    for (const prod of rightSides) {
      const tokens = []
      let i = 0
      while (i < prod.length) {
        const char = prod[i]
        if (char === "'") {
          let terminal = ""
          i++
          while (i < prod.length && prod[i] !== "'") {
            terminal += prod[i]
            i++
          }
          i++ // skip closing '
          terminales.add(terminal)
          tokens.push(terminal)
        } else if (/[A-Z]/.test(char)) {
          let varName = char
          i++
          while (i < prod.length && /[0-9]/.test(prod[i])) {
            varName += prod[i]
            i++
          }
          variables.add(varName)
          tokens.push(varName)
        } else if (/[a-z()]/.test(char)) {
          terminales.add(char)
          tokens.push(char)
          i++
        } else {
          i++
        }
      }

      producciones.push({ variable, production: tokens })
    }
  }

  return {
    variables: Array.from(variables),
    terminales: Array.from(terminales),
    producciones
  }
}

function splitLine(line) {
  if (line.includes("=")) return line.split("=")
  if (line.includes("->")) return line.split("->")
  throw new Error(`Producción inválida. Se esperaba '=' o '->' en: "${line}"`)
}

module.exports = {
  parseGrammarFromText
}
