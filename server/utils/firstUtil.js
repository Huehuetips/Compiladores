function calcularPrimero(producciones) {
  const primero = {}

  for (const variable in producciones) {
    primero[variable] = new Set()
  }

  let cambio = true
  while (cambio) {
    cambio = false

    for (const variable in producciones) {
      for (const produccion of producciones[variable]) {
        let index = 0
        let epsilonEncontrado = true

        while (epsilonEncontrado && index < produccion.length) {
          const simbolo = produccion[index]
          epsilonEncontrado = false

          if (producciones[simbolo]) {
            for (const s of primero[simbolo]) {
              if (s !== 'ε') primero[variable].add(s)
            }

            if (primero[simbolo].has('ε')) {
              epsilonEncontrado = true
            }
          } else {
            if (!primero[variable].has(simbolo)) {
              primero[variable].add(simbolo)
              cambio = true
            }
            break
          }

          index++
        }

        if (epsilonEncontrado) {
          primero[variable].add('ε')
        }
      }
    }
  }

  const resultado = {}
  for (const v in primero) {
    resultado[v] = [...primero[v]]
  }

  return resultado
}

function convertirProduccionesPlano(prods) {
  const resultado = {}
  for (const { variable, production } of prods) {
    let partes
    if (Array.isArray(production)) {
      partes = production
    } else if (production === "ε" || production === "e") {
      partes = [production]
    } else {
      partes = production
        .replace(/'/g, '') // quitar comillas
        .trim()
        .split(/\s+/)      // split por espacio
    }
    if (!resultado[variable]) resultado[variable] = []
    resultado[variable].push(partes)
  }
  return resultado
}

module.exports = { calcularPrimero, convertirProduccionesPlano }
