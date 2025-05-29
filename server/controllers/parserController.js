const { extractVariables, extractTerminals, extractProductions } = require("../utils/grammarUtils")

async function analyze(request, reply) {
  const { grammar } = request.body

  if (!grammar) {
    return reply.code(400).send({ error: "El campo 'grammar' es requerido." })
  }

  try {
    const variables = extractVariables(grammar)
    const terminales = extractTerminals(grammar)
    const producciones = extractProductions(grammar)

    return {
      variables,
      terminales,
      producciones,
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    return reply.code(400).send({ error: err.message })
  }
}

module.exports = {
  analyze
}
