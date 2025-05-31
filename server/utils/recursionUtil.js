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
      // prod ahora es un array de símbolos
      if (Array.isArray(prod) && prod[0] === variable) {
        recursive.push(prod.slice(1))
      } else {
        nonRecursive.push(prod)
      }
    })

    if (recursive.length > 0) {
      const newVar = variable + "1"
      nonRecursive.forEach(prod => {
        result.push({ variable, production: [...prod, newVar] })
      })
      recursive.forEach(prod => {
        result.push({ variable: newVar, production: [...prod, newVar] })
      })
      result.push({ variable: newVar, production: ["e"] })
    } else {
      all.forEach(prod => result.push({ variable, production: prod }))
    }
  }

  return result
}

function formatProductionsAsText(productions, terminales = []) {
  const grouped = {}

  productions.forEach(({ variable, production }) => {
    if (!grouped[variable]) grouped[variable] = []
    // Convierte producción a string si es array
    let prodStr = Array.isArray(production)
      ? production
          .map(sym =>
            terminales.includes(sym) && sym !== "e"
              ? `'${sym}'`
              : sym
          )
          .join(" ")
      : production
    grouped[variable].push(prodStr)
  })

  return Object.entries(grouped)
    .map(([v, prods]) => `${v} = ${prods.join(" | ")}`)
    .join("\n")
}

module.exports = { removeLeftRecursion, formatProductionsAsText }
