function construirTablaAnalisis(gramatica, primero, siguiente) {
  const tablaAnalisis = {}

  Object.keys(gramatica.producciones).forEach(variable => {
    tablaAnalisis[variable] = {}
  })

  function agregarProduccion(variable, terminal, produccion) {
    if (!tablaAnalisis[variable][terminal]) {
      tablaAnalisis[variable][terminal] = []
    }
    tablaAnalisis[variable][terminal].push(produccion)
  }

  Object.keys(gramatica.producciones).forEach(variable => {
    const producciones = gramatica.producciones[variable]

    producciones.forEach(produccion => {
      const primerSimbolo = produccion[0]

      if (primerSimbolo === 'e') {
        siguiente[variable].forEach(terminal => {
          agregarProduccion(variable, terminal, produccion)
        })
      } else if (primero[primerSimbolo]) {
        primero[primerSimbolo].forEach(terminal => {
          if (terminal !== 'e') {
            agregarProduccion(variable, terminal, produccion)
          }
        })

        if (primero[primerSimbolo].includes('e')) {
          siguiente[variable].forEach(terminal => {
            agregarProduccion(variable, terminal, produccion)
          })
        }
      } else {
        agregarProduccion(variable, primerSimbolo, produccion)
      }
    })
  })

  return tablaAnalisis
}

function transformarTablaAnalisis(tabla) {
  const terminalSet = new Set()

  // 1. Recolectar todas las columnas (terminales)
  for (const variable in tabla) {
    const entradas = tabla[variable]
    for (const terminal in entradas) {
      terminalSet.add(terminal)
    }
  }

  const columns = Array.from(terminalSet).sort() // orden alfabético
  const rows = []

  // 2. Construir cada fila con los valores
  for (const variable in tabla) {
    const rowValues = []

    for (const terminal of columns) {
      const entry = tabla[variable]?.[terminal]

      if (entry && Array.isArray(entry) && entry.length > 0) {
        // Tomamos la primera producción y la formateamos como string
        const produccion = entry[0]
        rowValues.push(produccion.join(" "))
      } else {
        rowValues.push(null)
      }
    }

    rows.push({
      variable,
      values: rowValues
    })
  }

  return { columns, rows }
}


module.exports = {
  construirTablaAnalisis,
  transformarTablaAnalisis
}
