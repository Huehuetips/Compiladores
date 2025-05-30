const { construirTablaAnalisis, transformarTablaAnalisis } = require("../utils/tableUtil")

module.exports = async function tableController(req, reply) {
  try {
    const { producciones, primero, siguiente } = req.body

    if (!producciones || !primero || !siguiente) {
      return reply.code(400).send({
        error: "Faltan datos requeridos: 'producciones', 'primero', 'siguiente'."
      })
    }

    const gramatica = { producciones: {} }

    for (const { variable, production } of producciones) {
      if (!gramatica.producciones[variable]) {
        gramatica.producciones[variable] = []
      }
      gramatica.producciones[variable].push(production)
    }

    const tabla = construirTablaAnalisis(gramatica, primero, siguiente)
    const resultado = transformarTablaAnalisis(tabla)


    reply.type("application/json").send( resultado )
  } catch (err) {
    reply.code(500).send({ error: err.message })
  }
}
