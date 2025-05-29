function removeLeftRecursion(variables, producciones) {
  const grouped = {}

  for (const { variable, production } of producciones) {
    if (!grouped[variable]) grouped[variable] = []
    grouped[variable].push(production)
  }

  const result = []

  for (const variable of variables) {
    const all = grouped[variable] || []
    const recursive = []
    const nonRecursive = []

    all.forEach(prod => {
      const symbols = prod.trim().split(/(?=\s)|(?='[^']*')|(?=[A-Za-z])/).filter(Boolean)
      if (symbols[0] === variable) {
        recursive.push(symbols.slice(1))
      } else {
        nonRecursive.push(symbols)
      }
    })

    if (recursive.length > 0) {
      const newVar = variable + "1"
      nonRecursive.forEach(prod => {
        result.push({ variable, production: prod.concat(newVar).join(" ") })
      })
      recursive.forEach(prod => {
        result.push({ variable: newVar, production: prod.concat(newVar).join(" ") })
      })
      result.push({ variable: newVar, production: "ε" })
    } else {
      all.forEach(prod => result.push({ variable, production: prod }))
    }
  }

  return result
}

function formatProductionsAsText(productions) {
  const grouped = {}

  productions.forEach(({ variable, production }) => {
    if (!grouped[variable]) grouped[variable] = []
    grouped[variable].push(production)
  })

  return Object.entries(grouped)
    .map(([v, prods]) => `${v} = ${prods.join("|")}`)
    .join("\n")
}

module.exports = { removeLeftRecursion, formatProductionsAsText }
